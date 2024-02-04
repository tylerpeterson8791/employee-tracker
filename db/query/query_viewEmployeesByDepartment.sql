SELECT
    employee.id AS 'Employee ID',
    employee.first_name AS 'First Name',
    employee.last_name AS 'Last Name',
    role.title AS 'Title',
    role.salary AS 'Salary',
    department.name AS 'Department'
FROM
    company_db.employee
-- need to double join to get to department
JOIN
    company_db.role ON employee.role_id = role.id
JOIN
    company_db.department ON role.department_id = department.id
WHERE
    department.id = ?;
-- populate wildcard with user input