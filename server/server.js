const inquirer =  require("inquirer")
const fs = require("fs")
const mysql = require('mysql2');
const fs = require("fs");
const databaseConfig = JSON.parse(fs.readFileSync("./../database.json").toString());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: databaseConfig.password
});

async function viewalldepartments(){

}

async function viewallemployees(){
    
}

async function viewallroles(){
    
}

async function addanemployee(){n
    
}

async function addanrole(){


    
}

async function addandepartment(){

    
    
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