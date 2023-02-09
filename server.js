import mysql from 'mysql2';
import inquirer from 'inquirer';
import * as dotenv from 'dotenv'
dotenv.config()


var roleArr=[]
var managerArr=[]
var departmentArr=[]

import cTable from 'console.table'
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log("Connected to DB successfully")
);






const startApp=function(){
inquirer
    .prompt(
      {
        type: 'rawlist',
        message: 'which information you want to display?',
        name: 'UserInput1',
        choices: [
          'Display all the Employee information?',
          'Display Departments sections?',
          'Display Role Information?',
          'Add Employee',
          'Add Role',
          'Add Department',

          'update Employee Role Information',
          'EXIT'


        ]
      },

    ).then((result)=>{
      console.log(result)
      switch(result.UserInput1){
        case 'Display all the Employee information?':

          db.query("select * from employee",(err,result)=>{
            console.table('display employee ',result)
            startApp()

          })
break;

case "Display Departments sections?":

db.query('select * from department',(err,result)=>{
  console.table(result)
  startApp()
})

break;


  case "Display Role Information?":
    db.query(`select role_id,title from roleee`,(err,result)=>{
      console.table(result)
      startApp()
    })
    break


    case "Add Employee":
      


      db.query(`select title from roleee`,(err,result)=>{
        for(var i=0;i<result.length;i++){
          roleArr.push(result[i].title);

        }
        db.query('select concat(firstname," ",lastname) AS fullname from employee',(err,result1)=>{
          for(var i=0;i<result1.length;i++){
            managerArr.push(result1[i].fullname);

  
          }    
          addemployeeInqu()

        })

      })






break

case('Add Role'):
db.query('select * from department',(error,depres)=>{
  for(var i=0;i<depres.length;i++){
    departmentArr.push(depres[i].name)
  }

})
inquirer.prompt(
  [{
    // INSERT INTO roleee (title,salary,department_id) VALUES
    message:'enter the title that you want to add it?',
    type:'input',
    name:'title',

},
{
  message:'enter the salary?',
  type:'input',
  name:'salary'

},
{
  message:'which department belongs to?',
  type:'rawlist',
  name:'departmentname',
  choices:departmentArr
}]).then((res)=>{
  console.log('adding role data',res.title,res.salary)
  db.query('select id from department where name=?',`${res.departmentname}`,(error,results)=>{
    console.log('department id res',results[0].id)
    var departmentID=results[0].id;
    var tit=res.title;
    var sal=res.salary;
   
    db.query('INSERT INTO roleee (title,salary,department_id) VALUES(?,?,?)',[tit,sal,departmentID],(error,here)=>{

      if(here.affectedRows=1){
        console.log('role added successfuly')
        startApp()
      }else{
        console.log('error while adding new role')
      }
    })
  })
})

break
case('Add Department'):
addDep()
break
case('update Employee Role Information'):
updatefun()
break
  



      }

    })
  }

const updatefun=()=>{
console.log('update f')
// INSERT INTO employee (firstname,lastname,r_id,manager_id) VALUES

inquirer.prompt({
name:'updateemp',
message:'what employee info you would like to update',
type:'rawlist',
choices:['firstname','lastname','manager name','role']
}).then((result)=>{
  console.log(result)

  switch(result.updateemp){
    case('firstname'):
    inquirer.prompt({
      name:'lastname',
      message:'enter last name?',
      type:'input'

    }).then((data)=>{

      inquirer.prompt({
        name:'firstname',
        message:'enter first name after UPDATE?',
        type:'input'
  
      }).then((firstnamequestion)=>{
        db.query(`UPDATE employee SET firstname = (?) WHERE lastname='${data.lastname}'`,firstnamequestion.firstname,(error,lastres)=>{
          console.log('after update',lastres)
          startApp()
        })


      })

    })

    break
    case('lastname'):

    console.log('update lastname')
    startApp()

    break
    case('manager name'):
    console.log('update manager name')
    startApp()


    break
    case('role'):
    console.log('update role')
    startApp()

    break
    default:
      console.log('sorry we re unable to confirm ur request')
      startApp()
  }
})
}




  const addDep=()=>{
    inquirer.prompt({
      name:'departmentname',
      message:'enter department name?',
      type:'input'
    }).then((data)=>{
      db.query('INSERT INTO department(name) VALUES (?)',data.departmentname,(err,result)=>{
        console.log(result)
        if(result.affectedRows=1){
          console.log('new department added')
          startApp()
        }else{
          console.log('something went wrong while adding new department')
        }
      })

    })
  }


  startApp()


  function addemployeeInqu(){
    
    inquirer.prompt([
      {
        message:'employee first name?',
        type:'input',
        name:'fname',
        
      },
      {
        message:'employee last name?',
        type:'input',
        name:'lname',
      
      },{
        message:'role?',
        type:"rawlist",
        name:'r_id',
        choices:roleArr
      
      
      },{
        message:'manager name?',
        type:'rawlist',
        name:'m_id',
        choices:managerArr
      }
      
      ]).then((data)=>{
        let image;
        const managerFirst=data.m_id.split(' ')
        var mf=managerFirst[0];
        var ml=managerFirst[1];
        db.query('select emp_id from employee where firstname=?',`${managerFirst[0]}`,(err,managerdata)=>{
          console.log('manager,id',managerdata[0].emp_id)

          db.query('select role_id from `roleee` where title=?',`${data.r_id}`,(err,result2)=>{
            console.log('role id',result2[0].role_id)
            db.query('INSERT INTO employee (firstname,lastname,r_id,manager_id) VALUES (?,?,?,?) ',[data.fname,data.lname,result2[0].role_id,managerdata[0].emp_id],(error,empinserdata)=>{
              console.log('after ins',empinserdata)
              if (empinserdata.affectedRows= 1){
                console.log('new employee added successfuly ')
                startApp()
              }else{
                console.log('something went error')
              }
            })
          
          })

                
       
        })

      

       



      })
  }
  

