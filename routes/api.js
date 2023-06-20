const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");
const multer = require('multer');
const uuidv4 = require('uuid/v1');

const router = express.Router();

const DIR = "public/uploads/products/";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({storage:storage
    // storage: storage
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //         cb(null, true);
    //     } else {
    //         cb(null, false);
    //         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //     }
    // }
});




const Partners =require("../controllers/authController");
const Expenses =require("../controllers/expensesController");
const Suppliers =require("../controllers/suppliersController");
const Reports =require("../controllers/reportsController");
const Products =require("../controllers/productsController");

// --------------- partners router -------------------

router.route("/partners/list").get(catchErrors(Partners.list));
router.route("/partners/delete/:id").get(catchErrors(Partners.delete));
router.route("/partners/edit/:id").get(catchErrors(Partners.edit));
router.route("/partners/update").post(catchErrors(Partners.update));

// --------------- expenses router -------------------

router.route("/expenses/list").get(catchErrors(Expenses.list));
router.route("/expenses/add").post(catchErrors(Expenses.add));
router.route("/expenses/delete/:id").get(catchErrors(Expenses.delete));
router.route("/expenses/update").post(catchErrors(Expenses.update));

// --------------- suppliers router -------------------

router.route("/suppliers/list").get(catchErrors(Suppliers.list));
router.route("/suppliers/create").post(catchErrors(Suppliers.create));
router.route("/suppliers/delete/:id").get(catchErrors(Suppliers.delete));
router.route("/suppliers/edit").post(catchErrors(Suppliers.edit));
router.route("/suppliers/update").post(catchErrors(Suppliers.update));

// --------------- reports router -------------------

router.route("/reports/list").get(catchErrors(Reports.list));
router.route("/reports/partnerlist").get(catchErrors(Reports.partnerlist));
router.route("/reports/unpaidList").get(catchErrors(Reports.unpaidList));

// --------------- products router -------------------
router.route("/products/list").get(catchErrors(Products.list));
router.route("/product/create").post(upload.single('image'), catchErrors(Products.create));
router.route("/products/delete/:id").get(catchErrors(Products.delete));
router.route("/product/edit").post(catchErrors(Products.edit));
router.route("/product/update").post(upload.single('image'), catchErrors(Products.update));
router.route("/product/update/noimage").post(catchErrors(Products.updatenoimage));


module.exports = router;
