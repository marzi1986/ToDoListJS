const addButton=document.getElementById("add-btn");
const newTask=document.getElementById("input-new-task");
const newDate= document.getElementById("input-date");
const alertMessage=document.getElementById("alert-message");
const todos=[] || JSON.parse(localStorage.getItem("ToDos"));

const tBody=document.querySelector("tbody");

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
        if(todos.length === 0){
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
                            <button>Edit</button>
                            <button>Do</button>
                            <button>Delete</button>
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




addButton.addEventListener("click", saveTasksHandler);