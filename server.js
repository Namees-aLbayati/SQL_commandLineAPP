import mysql from 'mysql2';
import inquirer from 'inquirer';
import * as dotenv from 'dotenv'
dotenv.config()


var roleArr=[]
var managerArr=[]


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
        db.query('select * from employee',(err,result1)=>{
          for(var i=0;i<result1.length;i++){
            managerArr.push(result1[i].f_name+""+result1[i].L_name);
  
          }    
          addemployeeInqu()

        })

      })






break
  



      }

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
        console.log(data)
        db.query(`select * from roleee where title=?`,r_id,(err,result2)=>{
          console.log(result2)
        })
      })
  }
  

