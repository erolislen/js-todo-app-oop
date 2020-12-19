const form = document.querySelector(".form");
const taskElement = document.querySelector("#task");
const dateElement = document.querySelector("#date");
const selectColor = document.querySelector("#colorOptions");
const colorElemet = document.querySelector("#color");
const activeTodos = document.querySelector("#active-todos");


eventListeners();

function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", colorOption);
    document.addEventListener("DOMContentLoaded", countActiveTask);
    document.addEventListener("DOMContentLoaded", function(){
        let todos = Storage.getTodosFromStorage();
        UI.loadAllTodos(todos);
    });

    selectColor.addEventListener("change", colorChange);
    activeTodos.addEventListener("click", deleteTodo);

}


function addTodo(e){

    const task = taskElement.value;
    const date = dateElement.value;
    const color = selectColor.value;
    const now = new Date().getTime();


    if(task==="" || date==="" || color===""){
        UI.displayMessages("All Fields are Required!","Caution","warning");
    }else if ((Date.parse(date)-now)<0) {
        UI.displayMessages("Please Select a Future Date!","Caution","warning");
    } else {
        const newTodo = new Todo(task,date,color);
        UI.addTodoToUI(newTodo);  // UI add Todo
        Storage.addTodoToStorage(newTodo); // Storage add Todo
        UI.displayMessages("Successfully inserted record!","OK","success");
        UI.clearInputs(taskElement,dateElement,selectColor,colorElemet);

    }

    e.preventDefault();

}

function colorOption(){

    const color = ["primary","info","success","warning","danger","dark","secondary","light"];

    for (let index = 0; index < color.length; index++) {
        const option = document.createElement("option"); 
        option.value = color[index];
        option.textContent = color[index];
        selectColor.appendChild(option);

    }
    
}

function colorChange(){
    switch(selectColor.value) {

        case "primary":
            colorElemet.className = "form-control bg-primary";
            break;
        
        case "info":
            colorElemet.className = "form-control bg-info";
            break;
        case "success":
            colorElemet.className = "form-control bg-success";
            break;
        case "warning":
            colorElemet.className = "form-control bg-warning";
            break;
        case "danger":
            colorElemet.className = "form-control bg-danger";
            break;
        case "dark":
            colorElemet.className = "form-control bg-dark";
            break;
        case "secondary":
            colorElemet.className = "form-control bg-secondary";
            break;
        case "light":
            colorElemet.className = "form-control bg-light";
            break;

    }
 
}


function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        UI.deleteTodoFromUI(e.target);
        Storage.deleteTodoFromStorage(e.target.parentElement.parentElement.previousElementSibling.textContent);
        UI.displayMessages("Successfully Deleted!","OK","success")
    }
}


function countActiveTask(){
    const active = document.querySelector("#active-task");
    active.textContent = Storage.getTodosFromStorage().length;
}

function playSound(url) {
    const audio = new Audio(url);
    audio.play();
  }

function showNotification(){
    coomingTask = Storage.getTodosFromStorage();
    const date = new Date().getTime();
    
    coomingTask.forEach(function(task){
        if(Date.parse(task.date)-date<0){
            iziToast.error({
                title: 'Reminder',
                message: " Don't Forget",
                position: "bottomRight",
                timeout: 5000,
                titleSize:'20',
                messageSize:'20',
            });
            
            playSound("assets/sound/reminder_sound.mp3");         
        }
    
        
    });

}

setInterval(() => {
    showNotification();
}, 5000);

