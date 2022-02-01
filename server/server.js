const inquirer =  require("inquirer")
const fs = require("fs")
const db = require('mysql2-promise')();
const cTable = require("console.table");



const databaseConfig = JSON.parse(fs.readFileSync("./database.json").toString());
db.configure({
    "host": "localhost",
    "user": "root",
    "password": databaseConfig.password,
    "database": "twelveassignment"
});
showmainmenu()
async function viewalldepartments(){
    let response = await db.query("select * from department");
    let rows = response[0];
    console.table(rows);
showmainmenu()

}

async function viewallemployees(){
    let response = await db.query("select * from employee");
    let rows = response[0];
    console.table(rows);
showmainmenu()
    
}

async function viewallroles(){
    let response = await db.query("select * from role");
    let rows = response[0];
    console.table(rows);
showmainmenu()
    
}

async function addanemployee(){n
    let name = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "enter name of new department"
    })
   await db.execute("insert into department (name) values ('?');", [name.name])

   console.log("added new department " + name.name)

showmainmenu()
}

async function addanrole(){
    let title = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "What is the title of the role?: "
    })
    let salary = await inquirer.prompt({
        type: "input",
        name: "salary",
        validate: (i) =>{
            return parseFloat(i) != Number.NaN; 
        },
        message: "What is the salary?: "
    })
    let department = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "What is the name of the department? :"
    })
    console.log(salary.salary)
    try {
        await db.execute("insert into role (title, salary, department_id) values ('?', ?, (select id from department where name='?'));", [title.name, parseFloat(salary.salary), department.name ])
        console.log("added new role " + title.name)
    } catch (error) {
console.log (error.message)
    }
   
   

showmainmenu()

    
}

async function addandepartment(){ 
    let name = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "enter name of new department"
    })
   await db.execute("insert into department (name) values ('?');", [name.name])

   console.log("added new department " + name.name)

showmainmenu()
    
    
}
async function updateanemployeerole(){

    
    
}

async function showmainmenu(){
    let choice = await inquirer.prompt({
    type: "list",
    name: "choice",
    message:"What would you like to do?",
    choices: [
        "view all departments",
        "view all employees",
        "view all roles",
        "add an employee",
        "add an deparment",
        "add an role",
        "update an employee role",
    ]
})
switch (choice.choice){
    case "view all departments":
        viewalldepartments()
        break;
    case "view all employees":
        viewallemployees()
        break
    case "view all roles":
        viewallroles()
        break
    case "add an employee":
        addanemployee()
        break
    case "add an deparment":
        addandepartment()
        break
    case "add an role":
        addanrole()
        break
    case "update an employee role":
        updateanemployeerole()
        break
        default:
            console.log("invalid selection")
            showmainmenu()
}


    
    
}