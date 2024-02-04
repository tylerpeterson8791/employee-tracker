USE company_db;
SELECT
    employee.id AS 'Employee ID',
    employee.first_name AS 'First Name',
    employee.last_name AS 'Last Name',
    role.title AS Title,
    role.salary AS Salary,
    department.name AS Department,
    -- CASE is kinda like if/then of sql
    CASE
        -- if null then display **MANAGER**
        WHEN employee.manager_id IS NULL THEN '**MANAGER**'
        -- adding this in to indicate when record needs updating
        WHEN manager.id IS NULL THEN '**NEEDS UPDATING**'
        -- or concat together manager's first name and last name as Supervisor END finishes statement
        ELSE CONCAT(manager.first_name, ' ', manager.last_name)
    END AS Supervisor
FROM
    employee
LEFT JOIN
    role ON employee.role_id = role.id
LEFT JOIN
    department ON role.department_id = department.id
-- have to use LEFT JOIN because it's merging with NULL values
LEFT JOIN
    --the manager of the employee is where the employees manager_id matches the id of the manager
    employee manager ON employee.manager_id = manager.id;

    -- this is getting a little unruly in the one line.
    -- I still want to replace null with something else
    -- Looked into it and it's displaying null when the id doesn't match anything.  I could maybe write logic to display "NEEDS UPDATE" when it doesn't match anything.  It'd be on Line 13ish.