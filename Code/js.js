const addButton=document.getElementById("add-btn");
const newTask=document.getElementById("input-new-task");
const newDate= document.getElementById("input-date");
const alertMessage=document.getElementById("alert-message");
let todos= JSON.parse(localStorage.getItem("ToDos")) || [];
const editButton=document.getElementById("edit-btn");
const catButtons=document.querySelectorAll(".category");
const tBody=document.querySelector("tbody");
const btnDeleteall= document.getElementById("btn-deleteAll");

/////////////////////// Show Alert////////////////////
const showAlert=(message, type)=>{
    const alert= document.createElement("p");
    alert.innerHTML="";
    alert.innerText=message;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertMessage.append(alert);

    setTimeout(()=>{alert.style.display="none"}, 2000);
}
///////////////////// Save to local//////////////////
 const saveToLocal=()=>{
   

            localStorage.setItem("ToDos", JSON.stringify(todos));
        }
const generateId=()=>{
         const id=Math.round( Math.random() * Math.random() * Math.pow(10,8).toString());
         return id;
    }
/////////////////// Display in table ////////////////
    const displayToDos=(data)=>{

        const listTodo= data || todos;
     
        if(listTodo.length ===0){
            tBody.innerHTML="<tr><td colspan='4'>NO Task Found!</td></tr>";
            return;
        }
        else{
            
            tBody.innerHTML="";
            listTodo.forEach((todo)=>{
              
                tBody.innerHTML= tBody.innerHTML+ `
               <tr>
                        <td>
                            ${todo.task}
                        </td>
                        <td>
                            ${todo.date || "No date"} 
                        </td>
                        <td>
                            ${todo.completed ? "Completed" : "Pending"}
                        </td>
                        <td>
                            <button onclick="editHandler(${todo.rtnID})" >Edit</button>
                            <button onclick="toggleHandler(${todo.rtnID})"> ${todo.completed ? "Undo" : "Do"}</button>
                            <button onclick="deleteTaskHandler(${todo.rtnID})">Delete</button>
                        </td>
                    </tr>
                `
            });
        }

    }
////////////////////////////// Create Task ////////////////////
const saveTasksHandler = (event)=>{

    const task=newTask.value;
    const date=newDate.value;
    const rtnID=generateId();
    const todo={rtnID , task , date , completed:false};
   
    if(task){

        todos.push(todo);
        saveToLocal();
    
    showAlert("Todo Added Successfully", "success");
    }
    else
        showAlert("You Don't Enter Your Task", "error");
    
    displayToDos();
}
/////////////////////////////////////// Delete All /////////
const deleteAllHandler=(event)=>{

    if (todos.length){
        todos=[];
        saveToLocal();
        displayToDos();
        showAlert("All Todos got deleted", "error");
    }
    else
        showAlert("There is no task to delete");

}
/////////////////////////////////////// Delete A task /////////
const deleteTaskHandler=(id)=>{

    const newTodos=todos.filter(todo => todo.rtnID !==id);
    todos=newTodos;
    saveToLocal();
    displayToDos();
    showAlert("Task was deleted successfullt", "error");
}
/////////////////////////////////////// Toggle Do/undo ////////
const toggleHandler=(id)=>{
    const todo= todos.find((todo)=> todo.rtnID===id );
    todo.completed=!todo.completed;
    saveToLocal();
    displayToDos();
    showAlert("status was changed successfully", "error");
}

/////////////////////////////////////// Submit Edit ////////////
const applyEdit=(event)=>{

    const id=parseInt(event.target.dataset.id);
    const applyTodo= todos.find((todo)=>todo.rtnID === id )
    
   applyTodo.task=newTask.value;
   applyTodo.date=newDate.value;
    saveToLocal();
    displayToDos();
    showAlert("Task was updated successfully", "success");
    newTask.value="";
    newDate.value="";
    addButton.style.display="inline-block";
    editButton.style.display="none";
}

/////////////////////////////////////// Edit Button of a task //////
const editHandler= (id)=>{

    addButton.style.display="none";
    editButton.style.display="inline-block";
    const editTask= todos.find((todo)=> todo.rtnID === id);
     newTask.value=editTask.task;
     newDate.value=editTask.date;
     editButton.dataset.id=id;  
   
 }
/////////////////////////////////////// Filtering ////////////////
const filterTodos=(event)=>{

    const filterType= event.target.dataset.filter;
    let ftodos=null;
 
    switch(filterType){
    
        case "pending":
              ftodos = todos.filter(todo => todo.completed === false);
              break;
        
        case "completed":
              ftodos = todos.filter(todo => todo.completed);
              break;
    
        default:
             ftodos=todos;
    }

    displayToDos(ftodos);
}
///////////////////  Event listener ///////////
catButtons.forEach((button)=>{
    button.addEventListener("click", filterTodos);
});

window.addEventListener("load",()=> displayToDos() )
addButton.addEventListener("click", saveTasksHandler);
editButton.addEventListener("click", applyEdit);
btnDeleteall.addEventListener("click", deleteAllHandler);
