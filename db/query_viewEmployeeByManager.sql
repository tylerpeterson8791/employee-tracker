SELECT
    employee.id AS 'Employee ID',
    employee.first_name AS 'First Name',
    employee.last_name AS 'Last Name',
    role.title AS 'Title',
    role.salary AS 'Salary'
    FROM
        company_db.employee
    JOIN
        company_db.role ON employee.role_id = role.id
        WHERE
        employee.manager_id = ?;

-- Plug in user selection as wildcard for paramater