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
    
}

async function addanrole(){


    
}

async function addandepartment(){ 
   await db.execute("insert into department (name) values ('HR');")


    
    
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