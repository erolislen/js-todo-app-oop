class UI {

    static addTodoToUI(newTodo){
    
        const todoList = document.querySelector("#todos");
        const todos = document.createElement("li");
        todos.className = "list-group-item d-flex justify-content-between align-items-center";
        todos.innerHTML = `
    
        <span class="badge badge-${newTodo.color} badge-pill ">${newTodo.date}</span>
    
        <span>${newTodo.task}</span>
         <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
           <button type="button"  class="btn btn-danger"><i class="fa fa-remove"></i></button>
         </div>
        
        
        `
        todoList.appendChild(todos);
    
    }
    
    static clearInputs(element1,element2,element3,element4){
        element1.value = "";
        element2.value = "";
        element3.value = selectColor.firstElementChild.innerHTML;
        element4.className = "form-control bg-light"
      
    }
    
    static displayMessages(message,title,type){
        iziToast[type]({
            title: title,
            message: message,
            timeout: 3000,
        });
    }
    
    static loadAllTodos(todos){
    
        const todoList = document.querySelector("#todos");
    
        todos.forEach(function(todo){
    
            const todos  = document.createElement("li");
            todos.className = "list-group-item d-flex justify-content-between align-items-center";
            
            todos.innerHTML += `
            
            <span class="badge badge-${todo.color} badge-pill ">${todo.date}</span>
    
            <span>${todo.task}</span>
             <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
               <button type="button"  class="btn btn-danger"><i class="fa fa-remove"></i></button>
             </div>    
            
            `
    
            todoList.appendChild(todos);
        });
        
    }
    
    static deleteTodoFromUI(element){
    
        element.parentElement.parentElement.parentElement.remove();
    
    }

}

