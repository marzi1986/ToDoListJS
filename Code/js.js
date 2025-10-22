const addButton=document.getElementById("add-btn");
const newTask=document.getElementById("input-new-task");
const newDate= document.getElementById("input-date");
const alertMessage=document.getElementById("alert-message");
let todos= JSON.parse(localStorage.getItem("ToDos")) || [];
const editButton=document.getElementById("edit-btn");



const tBody=document.querySelector("tbody");
const btnDeleteall= document.getElementById("btn-deleteAll");

const showAlert=(message, type)=>{
    const alert= document.createElement("p");
    alert.innerHTML="";
    alert.innerText=message;
    alert.classList.add("alert");
    alert.classList.add(`alert-${type}`);
    alertMessage.append(alert);

    setTimeout(()=>{alert.style.display="none"}, 2000);
}
 const saveToLocal=()=>{
   

            localStorage.setItem("ToDos", JSON.stringify(todos));
        }
const generateId=()=>{
         const id=Math.round( Math.random() * Math.random() * Math.pow(10,8).toString());
         return id;
    }

    const displayToDos=()=>{
     
        if(todos.length ===0){
            tBody.innerHTML="<tr><td colspan='4'>NO Task Found!</td></tr>";
            return;
        }
        else{
            
            tBody.innerHTML="";
            todos.forEach((todo)=>{
              
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
const deleteTaskHandler=(id)=>{

    const newTodos=todos.filter(todo => todo.rtnID !==id);
 
    todos=newTodos;
    console.log(todos);
    saveToLocal();
    displayToDos();
    showAlert("Task was deleted successfullt", "error");
}

const toggleHandler=(id)=>{
    console.log(id);

    const todo= todos.find((todo)=>
        todo.rtnID===id )
    todo.completed=!todo.completed;
    console.log(todo);

 saveToLocal();
    displayToDos();
    showAlert("status was changed successfullt", "error");

    

}
const applyEdit=(event)=>{

    const id=parseInt(event.target.dataset.id);
 
    const applyTodo= todos.find((todo)=>
        todo.rtnID === id )
    console.log(typeof(id) , typeof(applyTodo.rtnID));

   applyTodo.task=newTask.value;
   applyTodo.date=newDate.value;
   console.log(applyTodo);

    saveToLocal();
    displayToDos();
    showAlert("Task was updated successfully", "success");
    newTask.value="";
    newDate.value="";
    addButton.style.display="inline-block";
    editButton.style.display="none";
}
const editHandler= (id)=>{

    addButton.style.display="none";
    editButton.style.display="inline-block";

    const editTask= todos.find(
        (todo)=> todo.rtnID === id);
        console.log(editTask);

     newTask.value=editTask.task;
     newDate.value=editTask.date;
     editButton.dataset.id=id;
    
   
    
}
window.addEventListener("load", displayToDos )
addButton.addEventListener("click", saveTasksHandler);
editButton.addEventListener("click", applyEdit);
btnDeleteall.addEventListener("click", deleteAllHandler);
