DROP DATABASE IF EXISTS hw_db;
CREATE DATABASE hw_db;
USE hw_db;
  SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) 
);


CREATE TABLE roleee(
   role_id INT AUTO_INCREMENT   PRIMARY KEY,
title VARCHAR(100),
salary INT,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE SET NULL

);

CREATE TABLE employee(
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    f_name VARCHAR(30),
    L_name VARCHAR(30),
        manager_id INT,

    r_id INT,
    FOREIGN KEY(r_id)
    REFERENCES roleee(role_id)
    ON DELETE SET NULL,
    FOREIGN KEY(manager_id)
    REFERENCES employee(emp_id)
);


INSERT INTO department(name) VALUES 
('services'),
('managment'),
('contingent worker'),
('engineering');



INSERT INTO roleee (title,salary,department_id) VALUES
('IT ENGINEER',5000,4),
('infra ENGINEER',6000,4),
('electric ENGINEER',7000,4),
('manager',10000,2),
('officer',1000,3),
('cleaner',2000,1);














INSERT INTO employee (f_name,L_name,r_id,manager_id) VALUES
('namees',"mohammed",1,5),
('umme sad',"sadyea",1,1),
(' layth ',"najm",2,2),
('mery',"lami",2,44),
('fati',"ali",3,NULL);


-- SELECT f_name,title,salary,manager_id from employee JOIN roleee where employee.r_id=role_id;
-- SELECT f_name from employeeexit
