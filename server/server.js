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
    console.log (response)
    console.table(rows);
showmainmenu()

}

async function viewallemployees(){
    let response = await db.query("select e.id, e.first_name, e.last_name, r.title, d.name, r.salary, (select concat(ee.first_name,' ', ee.last_name) as manager from employee ee where ee.id = e.manager_id) as manager from employee e left join role r on r.id = e.role_id left join department d on d.id = r.department_id;");
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

async function addanemployee(){
    let firstname = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "What is the first name of the new employee?"
    })

    let lastname = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "What is the last name of the new employee?"
    })

    let role = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "What role does this employee have?"
    })

    let hasmanager = await inquirer.prompt({
        type: "confirm",
        name: "name",
        message: "Does the employee have a manager?"
    })

    if (hasmanager.name){
        let managersfirstname = await inquirer.prompt({
            type: "input",
            name: "name",
            message: "What is the first name of the manager?"
        })
    
        let managerslastname = await inquirer.prompt({
            type: "input",
            name: "name",
            message: "What is the last name of the manager?"
        })
        let manager_id = (await db.query("select id from employee where first_name=? and last_name=?",[managersfirstname.name,managerslastname.name]))
       
       if (manager_id[0].length===1){
        console.log(manager_id)
        await db.execute("insert into employee (first_name, last_name, role_id, manager_id) values (?,?,(select id from role where title=?),?);", [firstname.name,lastname.name,role.name,parseInt (manager_id[0][0]["id"])]);
        console.log("added new employee " + firstname.name)  
       } else {
           console.log ("error did not find manager")
       }
    
           
    } else{
        await db.execute("insert into employee (first_name, last_name, role_id, manager_id) values (?,?,(select id from role where title=?),null);", [firstname.name,lastname.name,role.name]);
        console.log("added new employee " + firstname.name)
     
    }

    
showmainmenu()
}

async function addarole(){
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
        await db.execute("insert into role (title, salary, department_id) values (?, ?, (select id from department where name=?));", [title.name, parseFloat(salary.salary), department.name ])
        console.log("added new role " + title.name)
    } catch (error) {
console.log (error.message)
    }
   
   

showmainmenu()

    
}

async function addadepartment(){ 
    let name = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "enter name of new department"
    })
   await db.execute("insert into department (name) values (?);", [name.name])

   console.log("added new department " + name.name)

showmainmenu()
    
    
}
async function updateanemployeerole(){
    let firstname = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "What is the first name of the employee?"
    })

    let lastname = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "What is the last name of the employee?"
    })

    let role = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "What is the new role that the employee has?"
})

    await db.execute("update employee set role_id=(select id from role where title=?) where first_name=? and last_name=?",[role.name,firstname.name,lastname.name]);
    console.log("update the role of employee")
    showmainmenu()
    
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
        "add a department",
        "add a role",
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
    case "add a department":
        addadepartment()
        break
    case "add a role":
        addarole()
        break
    case "update an employee role":
        updateanemployeerole()
        break
        default:
            console.log("invalid selection")
            showmainmenu()
}


    
    
}