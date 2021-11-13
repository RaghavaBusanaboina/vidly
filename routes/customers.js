const express = require("express");
const { Customers, validateCustomer } = require("../models/customer");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customers.find().sort("name");
  return res.send(customers);
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = new Customers({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    });
    customer = await customer.save();
    res.send(customer);
  } catch (error) {
    res.send(`${error}`);
  }
});
router.get("/:id", async (req, res) => {
  const customer = await Customers.findById(req.params.id);
  if (!customer)
    return res.status(404).send("For the given id there is no data available");
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customers.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );
  if (!customer)
    return res.status(404).send("For the given id there is no data available");
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customers.findByIdAndDelete(req.params.id);
  if (!customer)
    return res.status(404).send("For the given id there is no data available");
  res.send(customer);
});

module.exports = router;
