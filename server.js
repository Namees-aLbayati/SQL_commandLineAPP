import mysql from 'mysql2';
import inquirer from 'inquirer';
import * as dotenv from 'dotenv'
dotenv.config()
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
break;

case "Display Departments sections?":
  break;


  case "Display Role Information?":
    break


  



      }

    })
  }
  startApp()