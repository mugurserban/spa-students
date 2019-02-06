class Student {

    constructor(picture, firstName, lastName, biology, math) {
        this.id = 0;
        this.picture = picture;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gradeBiology = biology;
        this.gradeMath = math;
    }

    getAddStudentSQL() {
        let sql = `INSERT INTO STUDENTS (picture, first_name, last_name, grade_biology, grade_math) 
                       VALUES('${this.picture}','${this.firstName}','${this.lastName}','${this.gradeBiology}','${this.gradeMath}')`;
        return sql;
    }

    static getStudentByIdSQL(id) {
        let sql = `SELECT picture, first_name as firstName, last_name as lastName, grade_biology as gradeBiology, grade_math as gradeMath FROM STUDENTS WHERE ID = ${id}`;
        return sql;
    }

    static deleteStudentByIdSQL(id) {
        let sql = `DELETE FROM STUDENTS WHERE ID = ${id}`;
        console.log('query', sql);
        return sql;
    }

    static updateStudentByDataSQL(data) {
        let { id, picture, firstName, lastName, gradeBiology, gradeMath } = data;
        let sql = `update STUDENTS set picture='${picture}', first_name='${firstName}', last_name='${lastName}', grade_biology='${gradeBiology}', grade_math='${gradeMath}' WHERE ID = ${id}`;
        return sql;
    }

    static getAllStudentSQL() {
        let sql = `SELECT id, picture, first_name as firstName, last_name as lastName FROM STUDENTS`;
        return sql;
    }
}

export default Student;
