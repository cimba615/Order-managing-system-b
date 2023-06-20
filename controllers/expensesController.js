
const mongoose = require("mongoose");
const Expenses = mongoose.model("Expenses");

require("dotenv").config({ path: ".variables.env" });

exports.add = async (req, res) => {
  try {
    let {name, total, payment} = req.body;

      const allExpenses = await Expenses.find();
      const number = allExpenses.length+1;
      const altnum = number;

    const newExpense = new Expenses({
      name,
      number,
      altnum,
      total,
      payment
    });

    const savedExpense = await newExpense.save();

    return res.status(200).json({
      success: true,
      message:"successfully added! Please check your expenses list!"
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

    const expenses = await Expenses.find();

    if (!expenses)
      return res.status(400).json({
        message: "Expenses doesn't exist."
      });

      return res.status(200).json({
        expenses:expenses
       });

  } catch (err) {
     res.status(500).json({message: err.message });
  }
};


exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const number = await Expenses.findOne({ _id: id });
    const expenses = await Expenses.find();

    const i = number.number;

    const result = await Expenses.findOneAndDelete({ _id: id });

    if (!result)
      return res.status(400).json({
        message: "It doesn't exist."
      });

    for(j=i+1 ; j<=expenses.length ; j++)
    {
      const changenumber = await Expenses.findOneAndUpdate(
        { altnum: j },
        { number: j-1 },
        {
          new: true
        }
      );
    }
    for(j=i ; j<expenses.length ; j++)
    {
      const changealtnum = await Expenses.findOneAndUpdate(
        { number: j },
        { altnum: j },
        {
          new: true
        }
      );
    }

      const newexpenses = await Expenses.find();

      return res.status(200).json({
        expenses:newexpenses
       });
  } catch (err) {
     res.status(500).json({message: err.message });
  }
};

exports.update = async (req, res) => {

  try {
    let { id, name, total, payment } = req.body;
    if (!id || !name || !total)
      return res.status(400).json({ message: "Not all fields have been entered." });

  const updateData = await Expenses.findOneAndUpdate(
      { _id: id },
      {
        name,
        total,
        payment
       },
      {
        new: true
      }
    ).exec();
    const expenses = await Expenses.find();

    return res.status(200).json({
      expenses:expenses
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};