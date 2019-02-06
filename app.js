window.router = new kendo.Router();
import StudentView from './js/studentView.js';
import TeacherView from './js/teacherView.js';
import StudentWidget from './js/studentWidget.js';


//export default router;


router.route("/", function () {
    $("#students-list").empty();
});



$(document).ready(function () {
    var studentView = new StudentView();
    var teacherView = new TeacherView();

    router.route("/", () => {
        $("#students-list").empty();
        $("#order-students").attr('disabled', true);
    });
    router.route("/students/add", () => {
        $("#students-list").empty();
        StudentWidget.showUpdateStudentForm();
    });
    router.route("/students", () => {
        studentView.load($("#includingGrades").prop("checked"));
        $("#order-students").attr('disabled', false);
    });
    router.route("/teachers", () => {
        $("#order-students").attr('disabled', true);
        teacherView.load();
    });
    router.start();

    $("#home").on('click', function () {
        router.navigate("/");
    })

    $("#add-students").on('click', () => {
        router.navigate("/students/add");
    })
    $("#load-students").on('click', () => {
        router.navigate("/students");
    })

    $("#load-teachers").on('click', () => {
        router.navigate("/teachers");
    })

    $("#order-students").on("click", () => {
        studentView.order($("#order_asc").prop("checked"));
    })
})