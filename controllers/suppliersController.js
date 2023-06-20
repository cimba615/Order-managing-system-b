
const mongoose = require("mongoose");
const Suppliers = mongoose.model("Suppliers");

require("dotenv").config({ path: ".variables.env" });

exports.create = async (req, res) => {
  try {

    let { number, name, mobile, email, phone, country, state, city, postcode, address } = req.body;

    const allSuppliers = await Suppliers.find();
    // const number = allSuppliers.length+1;
    const altnum = number;

    const newSuppliers = new Suppliers({
      number,
      altnum: number,
      name,
      mobile,
      email,
      phone,
      country,
      state,
      city,
      postcode,
      address
    });

    const saveSuppliers = await newSuppliers.save();

    return res.status(200).json({
      success: true,
      message: "successfully created! Please check your suppliers list!"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.list = async (req, res) => {
  try {

    const suppliers = await Suppliers.find();

    if (!suppliers)
      return res.status(400).json({
        message: "Suppliers doesn't exist."
      });

    return res.status(200).json({
      suppliers: suppliers
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const number = await Suppliers.findOne({ _id: id });
    const Suppliers = await Suppliers.find();

    const i = number.number;

    const result = await Suppliers.findOneAndDelete({ _id: id });

    if (!result)
      return res.status(400).json({
        message: "It doesn't exist."
      });

    const newSuppliers = await Suppliers.find();

    return res.status(200).json({
      suppliers: newSuppliers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.edit = async (req, res) => {
  try {

    const supplier = await Suppliers.findOne({ _id: req.body.id });

    if (!supplier)
      return res.status(400).json({
        message: "Suppliers doesn't exist."
      });

    return res.status(200).json({
      supplier: supplier
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {

  try {

    let { id, number, name, mobile, email, phone, country, state, city, postcode, address } = req.body;

    if (!id || !number || !name || !mobile || !email || !phone || !country || !state || !city || !postcode || !address)
      return res.status(200).json({ success: false, message: "Not all fields have been entered." });

    const before = await Suppliers.findOne({ _id: id });
    const updateData = await Suppliers.findOneAndUpdate(
      { _id: id },
      {
        number,
        altnum: number,
        name,
        mobile,
        email,
        phone,
        country,
        state,
        city,
        postcode,
        address
      },
      {
        new: true
      }
    ).exec();
    return res.status(200).json({
      success: true,
      message: "successfully updated!"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};