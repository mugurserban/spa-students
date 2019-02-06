import express from "express";
import db from "../database";
import Student from "../domain/student";

const router = express.Router();

//handles url http://localhost:6001/products
router.get("/", (req, res, next) => {

    db.query(Student.getAllProductSQL(), (err, data) => {
        if (!err) {
            res.json({
                success: true,
                data
            });
        }
    });
});
/*
//handles url http://localhost:6001/products/add
router.post("/add", (req, res, next) => {

    //read product information from request
    let student = new Student(req.body.firstName, req.body.lastName, req.body.gradeBiology, req.body.gradeMath);

    db.query(student.getAddProductSQL(), (err, data) => {
        res.status(200).json({
            message: "Student added.",
            productId: data.insertId
        });
    });
});

//handles url http://localhost:6001/products/1001
router.get("/:studentId", (req, res, next) => {
    let pid = req.params.studentId;

    db.query(Student.getStudentByIdSQL(pid), (err, data) => {
        if (!err) {
            if (data && data.length > 0) {

                res.status(200).json({
                    message: "Product found.",
                    product: data
                });
            } else {
                res.status(200).json({
                    message: "Product Not found."
                });
            }
        }
    });
});

//handles url http://localhost:6001/products/delete
router.post("/delete", (req, res, next) => {

    var pid = req.body.productId;

    db.query(Product.deleteProductByIdSQL(pid), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: `Product deleted with id = ${pid}.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    message: "Product Not found."
                });
            }
        }
    });
});
*/
module.exports = router;