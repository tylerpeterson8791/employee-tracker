SELECT
    SUM(role.salary) AS total_payroll
    FROM
        company_db.employee
    -- join them together
    JOIN
        company_db.role ON employee.role_id = role.id
    -- only do this for the specified dept_id
    WHERE
        role.department_id = ?;

    -- wildcard is populated with user input