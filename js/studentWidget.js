import PersonWidget from './personWidget.js';
//import router from '../app.js';

export default class StudentWidget extends PersonWidget {
    constructor(person) {
        super(person);
    }

    render(container, index) {
        let div = super.render(container, index);
        let title = $(`<span class='title'>student</span>`);
        div.append(title);
        let button1 = $(`<button class='studentButton' >Edit student</button>`);
        button1.on('click', () => {
            container.empty();
            router.navigate("/students/edit");
            StudentWidget.showUpdateStudentForm(this.person);
        });
        div.append(button1);
        let button = $(`<button class='studentButton' >(Re)load grades</button>`);
        button.on('click', () => {
            this.loadStudentGrades();
        });
        div.append(button);
        this.renderGrades();
    }

    renderGrades() {
        var grades = this.person.studentGrades;
        if (!grades) return;
        var text = "";

        var text = text + "<table width='100%'><tr><th align='left'>Discipline</th><th align='right'>Grade</th></tr>";
        for (let grade in grades) {
            text += `<tr> <td>${grade}</td> <td align='right'>${grades[grade]}</td></tr> `;
        }

        text += ` <tr><td><b>Average</b></td><td align='right'><b>${this.person.getAverageGrade()}</b></td></tr></table > `;
        text = $("<div class='grades'>").append(text);
        let myGrades = this.refGrades;
        if (myGrades) {
            myGrades.replaceWith(text);
        } else {
            this.refDiv.append(text);
        }
        text.slideDown();
        this.refGrades = text;
    }

    loadStudentGrades(render = true, message = '') {
        //var filename = `./data/grades-${this.person.id}.json`;
        var filename = `http://localhost:8080/students/${this.person.id}`
        $.getJSON(filename, (data) => {
            let result = data.student;
            const { gradeBiology, gradeMath } = result;
            this.person.studentGrades = { gradeBiology, gradeMath };
            this.person.evaluateStudent();
            if (render) {
                this.renderGrades(message);
            }
        })
    }

    static updateStudent(formular) {
        let inputs = formular.serializeArray();
        let newGrades = {};
        for (let input of inputs) {
            let { name, value } = input;
            newGrades[name] = value;
        }
        console.log(newGrades);
        $.ajax('http://localhost:8080/students/', //https://randomuser.me/api/?results=5
            {
                method: "PUT",
                dataType: "json",
                data: newGrades,
                content: "application/json",
                context: this,
                success: function (data) {
                    console.log(data);
                    router.navigate("/students");

                },
                error: function (err) {
                    console.log(err);

                }
            }
        );
    }

    static deleteStudent(id) {
        console.log("try to delete student" + id);
        $.ajax('http://localhost:8080/students/' + id, //https://randomuser.me/api/?results=5
            {
                method: "DELETE",
                dataType: "json",
                data: { id },
                content: "application/json",
                context: this,
                success: function (data) {
                    console.log(data);
                    router.navigate("/students");

                },
                error: function (err) {
                    console.log(err);

                }
            }
        );
    }
    static showUpdateStudentForm({ id = '', picture = '', firstName = '', lastName = '', studentGrades = {} } = {}) {
        let { gradeBiology = '', gradeMath = '' } = studentGrades;
        let deleteButton = '';
        if (id) {
            deleteButton = $("<button>delete student from database</button>");
            deleteButton.on('click', () => { this.deleteStudent(id); })
        }

        let form = $(`
        <form>
          <input type="hidden" name="id" value="${id}">
        <table>
          <tr><td>Picture:</td><td> <input type='text' name='picture' value='${picture}'></td></tr>
          <tr><td>First Name:</td><td> <input type='text' name='firstName' value='${firstName}'></td></tr>
          <tr><td>Last Name:</td><td> <input type='text' name='lastName' value='${lastName}'></td></tr>
          <tr><td>Grade Biology:</td><td> <input type='text' name='gradeBiology' value='${gradeBiology}'></td></tr>
          <tr><td>Grade Math:</td><td> <input type='text' name='gradeMath' value='${gradeMath}'></td></tr>
          <tr><td colspan=2 align='center'><button class='button'>add/edit student</button></td></tr>
        </form>
        `);
        $("#students-list").append(form);
        $("#students-list").append(deleteButton);
        if (!id) {
            form.on('submit', (e) => { e.preventDefault(); this.addStudent(form); })
        } else {
            form.on('submit', (e) => { e.preventDefault(); this.updateStudent(form); })
        }
    }
    static addStudent(formular) {
        let inputs = formular.serializeArray();
        let newStudent = {}
        for (let input of inputs) {
            let { name, value } = input;
            newStudent[name] = value;
        }
        $.ajax('http://localhost:8080/students/', //https://randomuser.me/api/?results=5
            {
                method: "POST",
                dataType: "json",
                data: newStudent,
                content: "application/json",
                context: this,
                success: function (data) {
                    console.log(data);
                    router.navigate("/students");
                },
                error: function (err) {
                    console.log(err);

                }
            }
        );
    }
}