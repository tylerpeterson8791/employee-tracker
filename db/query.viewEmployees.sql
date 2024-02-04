SELECT
    employee.id AS 'Employee ID',
    employee.first_name AS 'First Name',
    employee.last_name AS 'Last Name',
    role.title AS Title,
    role.salary AS Salary,
    department.name AS Department,
    CONCAT(manager.first_name, ' ', manager.last_name) AS Supervisor
FROM
    employee
JOIN
    role ON employee.role_id = role.id
JOIN
    department ON role.department_id = department.id
LEFT JOIN
    employee manager ON employee.manager_id = manager.id;

    -- this is getting a little unruly in the one line.
    -- I still want to replace null with something else
    -- otherwise this is working correctly