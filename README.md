# Employee Tracker

  
  ## Description
  
  My motivation for this project was to create an application that can track employees using command line prompts and manipulating a database on the back end.

  This project was a great lesson in using mySQL to alter a database.  It also was very helpful in mastering how to create smaller functions that work in harmony to create a non-linear application that flows through the user's input.
  
  
  ## Installation
  
  This was a from scratch project so the first thing I did was plan.  I spent a good amount of time conceptualizing how to put the app together before I ever touched a keyboard.

  Once I decided the structure I began by building out the mainMenu() function.  This acts as a hub and is the first thing the user is prompted with.  I set up all the 7 other branching functions with basic console.logs to test that it was routing in the correct way.  I had to pass in the mainMenuFunction for each of these to allow the functions to call back to the mainMenu once the logic was excecuted.  Keeping functions organized and in folders helped a lot in making sure this stayed organized.

  After that was set I started writing the "View" functions.  The first hurdle was prepping the data to be used in Inquirer.  I had already done things with data out of Inquirer (see mainMenu) but this was my first time building out lists for user prompts with database data.  The .map() method helped to do this.  I chose console.table() to display the data on the console side.  It looks really clean but I wish there was a way to have it not show the index of the array.

  Then I moved on to the "Add" functions.  For this the biggest initial hurdle was figuring out the proper syntax to use ? in queries.  I started with departmentView since it only had one ? and moved on to the others from there.  This project was great at building as you go so I was able to apply a lot of the same logic (just more layers) for the subsiquent function.

  Next I worked on updating the employee role.  This kind of bled into the bonus parts with the other two updates.  At this point I had enough experience with SQL Queries that I was able to piece those together and get them working properly.

  I moved on to DELETE and this posed a few chalenges.  If one thing is deleted other aspects are effected (except for deleteEmployee which was straight forward).  I thought about it and came to the conclusion that the best way to handle it is to show the user what is missing so they can update.  I ended up altering a ton of the query logic in the viewEmployees.  First I changed the JOINs to LEFT JOIN.  This will display null data and avoid hidden records (for example, when you delete a Department, the next time you want to view all employees they won't show up.) and display incomplete records.  I took those selects and wrapped them in CASEs where the null data displays as "**NEEDS UPDATING** so that it's very apparent to the user what employees need to be reassigned.

  Last I wrote what I called viewDepartmentPayroll.  This gives the user a list of all the departments.  When selected it gives them a list of employees in the department including title and salary AND uses SUM to tally the payroll total of the whole department.  When writing queries I've found it best to look at them backwards (starting with thinking of WHERE and working back to SELECT).  For all of the queries I did a ton of testing and tweaking in WorkBench before adding it to the js.

 HERE IS A VIDEO OF THE FUNCTIONALITY OF THE APP:  https://drive.google.com/file/d/12yzTCUrdUazh_TnYwhQMewzwkZnPOv_r/view?usp=sharing

  ## Usage
  
  The user begins they start with a welcome message in ASCII art and the Main Menu options:
  
![Employee Tracker Welcome](https://github.com/tylerpeterson8791/employee-tracker/assets/75902133/b9403eb0-3887-49ed-bd48-90bd14bd729a)

 When the option is selected the task excecutes.  For Add, Update and Delete the user is prompted with options specific to the task they are excecuting.  The user input is collected and database is altered accordingly.  Once complete they are prompeted with the Main Menu once again automatically.
 
![Add Employee](https://github.com/tylerpeterson8791/employee-tracker/assets/75902133/a6a77868-97f0-45e9-816a-6e1eca136282)


  After changing the data the user can select "View All Employees" to check on the new list of employees.  If their actions (deletes) created other fields that need to be subsiquently updated,  "**NEEDS UPDATING**" is displayed in the places of the null data.

  ![Employees Need Updating](https://github.com/tylerpeterson8791/employee-tracker/assets/75902133/6d27de7f-ab34-49bb-80be-f25492a30a3e)

  Finally, to break out of the loop, if the user wants to EXIT the program, I included an option in the Main Menu for them to select to exit the application.

  ![Exit Application](https://github.com/tylerpeterson8791/employee-tracker/assets/75902133/c37c68a5-23d3-46f7-8a8f-7dacada61a3c)


  ## Credits

  There’s a few resources I referenced during the course of creating this project.  

  I needed to figure out a way to pull the data out of the returned array to put into Inquirer format.  Often I used .map() method for this.  [.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

  For displaying the data to the user I went with console.table().  As previously stated, I wish there was a way to hide the index column but haven't found a way to do it.  Regardless, it looks very clean and I like that. https://developer.mozilla.org/en-US/docs/Web/API/console/table_static

 There were multiple times where I needed to combine data to display to the user as a list option (mostly First Name and Last Name) so I used CONCAT in the SQL queries.  https://www.w3schools.com/sql/func_sqlserver_concat.asp

 Using LEFT JOIN allowed me to stop the select from scrubbing out incomplete data at the JOIN.  This resource does a great job explaining how that works and the visual it provides really clicked for me.  https://www.w3schools.com/sql/sql_join_left.asp

 For displaying the data I had a bunch of either/or scenarios.  CASE in sql works kind of like a if/then statement in javascript.  Using these allowed me to assign an AS to the null values making the process easier for the user to desipher which employees need updating.  https://mode.com/sql-tutorial/sql-case

 For the welcome page I used this website to generate the ASCII text.  Tons of options, easy to use.  https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20

To exit the application I needed to look up how to do that.  I found this info on process.exit() to be very helpful!  https://www.geeksforgeeks.org/node-js-process-exit-method/#

  Finally a big thanks for my instructor Gary for explaining things so well in class and for extending the deadline of this project!
