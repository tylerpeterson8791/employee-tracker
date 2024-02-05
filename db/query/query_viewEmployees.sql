USE company_db;
SELECT
    employee.id AS 'EMPLOYEE ID',
    employee.first_name AS 'FIRST NAME',
    employee.last_name AS 'LAST NAME',
    -- CASE is kinda like if/then of sql
    CASE 
        WHEN role.title IS NULL THEN '**NEEDS UPDATING**'
        ELSE role.title 
    END AS TITLE,
    CASE 
        WHEN role.salary IS NULL THEN '**NEEDS UPDATING**'
        ELSE role.salary 
    END AS SALARY,
    CASE 
        WHEN department.name IS NULL THEN '**NO DEPARTMENT**'
        ELSE department.name 
    END AS DEPARTMENT,
    CASE
        -- if null then display **MANAGER**
        WHEN employee.manager_id IS NULL THEN '<IS A MANAGER>'
        -- adding this in to indicate when record needs updating
        WHEN manager.id IS NULL THEN '**NEEDS UPDATING**'
        -- or concat together manager's first name and last name as Supervisor END finishes statement
        ELSE CONCAT(manager.first_name, ' ', manager.last_name)
    END AS SUPERVISOR
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