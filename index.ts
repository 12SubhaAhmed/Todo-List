#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let todoList: string [] = [];
let condition = true;

console.log(chalk.blueBright.bold("\n\tWelcome to my Todo-List App\n"));

let main = async () => {
  while (condition){
    let option = await inquirer.prompt([
       {
         name:"choice",
         type:"list",
         message:"Select an option",
         choices:["Add task", "Delete task","Update task","View Todo-list","Exit"],
       }
    ]);
    if (option.choice === "Add task"){
      await addTask()
    }
    else if (option.choice === "Delete task"){
      await deleteTask()
    }
    else if (option.choice === "Update task"){
      await updateTask()
    }
    else if (option.choice === "View Todo-list"){
      await viewTask()
    }


    // function to exit
    else if (option.choice === "Exit")
      {condition = false} 
    }
}


// function to add new task
let addTask = async () =>{
  let newTask = await inquirer.prompt([
    { 
      name:"task",
      type:"input",
      message:chalk.blue("\nEnter your new task:")
    }
  ]);
  todoList.push(newTask.task)
  console.log(`\n ${newTask.task} task added in Todo-list`);
}


// function to view all Todo-list tasks
let viewTask = () => {
  console.log (chalk.green("\nYour Todo-list: \n"));
todoList.forEach((task , index) => {
  console.log(`${index + 1}: ${task}`)
  })
}


//function to delete a task
let deleteTask = async () => {
  await viewTask()
  let taskIndex = await inquirer.prompt([
    {
      name:"index",
      type:"number",
      message:chalk.blue("Enter the 'index no.' of the task you want to delete :"),
    }
  ]);
  let deleteTask = todoList.splice(taskIndex.index - 1, 1);
  console.log(chalk.green(`\n ${deleteTask} This task has been deleted from Todo-list`))
}

// Function to update task
let updateTask = async () => {
   await viewTask()
   let update_task_index  = await inquirer.prompt([
      {
        name:"index",
        type:"number",
        message:"\nEnter the 'index no' of the task you want to update"
      },
      {
        name:"new_task",
        type:"input",
        message:"Now enter the new task:"
      }
  ]);
  todoList[update_task_index.index - 1] = update_task_index.new_task
  console.log(chalk.green(`\n Task at index no. ${update_task_index.index - 1} updated successfully [For updated list check option:"View Todo-list"]\n`)) 
}
main();