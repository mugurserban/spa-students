import Student from "./student.js";
import StudentWidget from "./studentWidget.js";
import PersonView from "./personView.js";
export default class StudentView extends PersonView {
    constructor() {
        super();
    }

    order(asc = false) {
        let ord = asc ? -1 : 1;
        let widgets = this.widgets;
        for (let i = 1; i < widgets.length; i++) {
            if ((widgets[i - 1].person.getAverageGrade() - widgets[i].person.getAverageGrade()) * ord < 0) {
                this.switchPlaces(i - 1, i);
                setTimeout(() => this.order(asc), 1000);
                return;
            }
        }

    }

    switchPlaces(i, j) {
        var aux = this.widgets[i];
        this.widgets[i] = this.widgets[j];
        this.widgets[j] = aux;
        this.widgets[i].position(i);
        this.widgets[j].position(j);
    }

    load(includingGrades = false) {
        if (this.widgets) {
            this.widgets.length = 0;
        }
        $.ajax('http://localhost:8080/students/', //https://randomuser.me/api/?results=5
            {
                method: "GET",
                dataType: "json",
                content: "application/json",
                context: this,
                success: function (data) {
                    let id = 0;
                    let results = data.data;
                    for (let result of results) {
                        let { id, firstName, lastName, picture } = result;
                        let student = new Student(id, firstName, lastName, picture);
                        let widget = new StudentWidget(student, this.widgets.length);
                        this.widgets.push(widget);
                        if (includingGrades) {
                            widget.loadStudentGrades();
                        }
                    }
                    this.render();
                }
            }
        );
    }

}