USE company_db;

SELECT 
    employee.id AS employee_id,
    employee.first_name,
    employee.last_name,
    role.title AS role_title,
    role.salary,
    department.name AS department_name
FROM 
    employee
JOIN 
    role ON employee.role_id = role.id
JOIN 
    department ON role.department_id = department.id;

-- Not sure if this is necessary or not???
-- I'm just saving this here for testing