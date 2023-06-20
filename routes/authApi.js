const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const Users = mongoose.model("Users");
const Casheirs = mongoose.model("Casheirs");

const { catchErrors } = require("../handlers/errorHandlers");
const {
  isValidToken,
  login,
  register
} = require("../controllers/authController");

const admin = {
    avatar: process.env.BASEURL + process.env.PORT + '/uploads/admin/admin.png',
    number:1,
    altnum:1,
    email: 'admin@demo.com',
    username: 'Raju Vama',
    password: 'admin',
    amount:10000,
    payment:0,
    percentage: 100,
    role: 'admin',
    location: 'Israel',
};




////////////////////////////   initialing first by admin ///////////
const init = async (initialAdmin) => {
  

  const existingCasheir = await Casheirs.find();
  if(existingCasheir.length == 0)
{
  const newCasheir = new Casheirs({total:10000});
  const savedCasheir = await newCasheir.save();}

    let { email, avatar, password, username, role, location, amount, payment, percentage, number, altnum  } = initialAdmin;

    const existingAdmin = await Users.findOne({ role: role });
    if (existingAdmin)
      return ;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Users({
      number,
      altnum,
      email,
      avatar,
      password: passwordHash,
      username,
      role,
      location,
      amount,
      payment,
      percentage    });

  

    const savedAdmin = await newAdmin.save();


    return ;
};

init(admin);
/////////////////////////////

 router.route("/login").post(catchErrors(login));

 router.route("/me").get(catchErrors(isValidToken));

 router.route("/signup").post(catchErrors(register));

module.exports = router;
