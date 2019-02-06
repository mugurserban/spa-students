import express from "express";
import db from "../database";
import Student from "../domain/student";

const router = express.Router();

//handles url http://localhost:6001/students (get)
router.get("/", (req, res, next) => {

    db.executeQuery(Student.getAllStudentSQL(), (err, data) => {
        if (!err) {
            res.json({
                success: true,
                data
            });
        } else {
            res.send('<h1>no mysql</h1>');
        }
    });


});

//handles url http://localhost:6001/students/ (post)
router.post("/", (req, res, next) => {

    let student = new Student(req.body.picture, req.body.firstName, req.body.lastName, req.body.gradeBiology, req.body.gradeMath);

    db.query(student.getAddStudentSQL(), (err, data) => {
        console.log(err);
        res.status(200).json({
            message: "Student added.",
            studentId: data.insertId
        });
    });
});

//handles url http://localhost:6001/students/1001 (get)
router.get("/:studentId", (req, res, next) => {
    let sid = req.params.studentId;

    db.query(Student.getStudentByIdSQL(sid), (err, data) => {
        if (!err) {
            if (data && data.length > 0) {
                res.status(200).json({
                    message: "Student found.",
                    student: data[0]
                });
            } else {
                res.status(200).json({
                    message: "Student Not found."
                });
            }
        }
    });
});

//handles url http://localhost:6001/students/ (delete)
router.delete("/:id", (req, res, next) => {

    var sid = req.params.id;
    console.log('delete request');
    db.query(Student.deleteStudentByIdSQL(sid), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: `Student deleted with id = ${sid}.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    message: "Student Not found."
                });
            }
        }
    });
});

//handles url http://localhost:6001/students/ (put) - update
router.put("/", (req, res, next) => {

    var sid = req.body.id;
    console.log('body:', req.body);
    let q = Student.updateStudentByDataSQL(req.body);
    console.log("q:", q);
    db.query(Student.updateStudentByDataSQL(req.body), (err, data) => {
        if (!err) {
            if (data && data.affectedRows > 0) {
                res.status(200).json({
                    message: `Student ${sid} updated.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    message: "Student Not found."
                });
            }
        }
    });
});
module.exports = router;