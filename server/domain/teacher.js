class Teacher {

    constructor(firstName, lastName, title) {
        this.id = 0;
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
    }

    getAddTeacherSQL() {
        let sql = `INSERT INTO TEACHERS (first_name, last_name, title) 
                   VALUES('${this.firstName}','${this.lastName}','$(this.title)')`;
        return sql;
    }

    static getTeacherrByIdSQL(id) {
        let sql = `SELECT * FROM TEACHERS WHERE ID = ${id}`;
        return sql;
    }

    static deleteTeachersByIdSQL(id) {
        let sql = `DELETE FROM TEACHERS WHERE ID = ${id}`;
        return sql;
    }

    static getAllTeacherrSQL() {
        let sql = `SELECT * FROM STUDENTS`;
        return sql;
    }
}

export default Teacher;