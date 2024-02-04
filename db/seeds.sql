

INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 2),
       ("Accountant", 125000, 2),
       ("Legal Team Lead", 250000, 3),
       ("Lawyer", 190000, 3),
       ("Sales Lead", 100000, 4), 
       ("Salesperson", 80000, 4);
       
       
       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Kai", "Peters", 1, null),
        ("Tyler", "Peterson", 2, 1),
        ("Oscar", "Martinez", 3, null),
        ("Kevin", "Malone", 4, 3),
        ("Chuck", "Lawson", 5, null),
        ("Bobby", "Brown", 6, 5),
        ("Julie", "Raymond", 7, null),
        ("Jim", "Halpern", 8, 7);