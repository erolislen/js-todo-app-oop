class Storage {

    static addTodoToStorage(newTodo){
        let todos = this.getTodosFromStorage();
        todos.push(newTodo);
    
        localStorage.setItem("todos",JSON.stringify(todos));
    
        countActiveTask();
    
    }
    
    
    static getTodosFromStorage(){
        let todos;
    
        if (localStorage.getItem("todos") === null){
            todos = [];
        }else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }   
    
        return todos;
    }
    
    
    static deleteTodoFromStorage(taskTitle){
    
        let todos = this.getTodosFromStorage();
    
        todos.forEach(function(todo,index){
            if(todo.task === taskTitle){
                todos.splice(index,1);
            }
        });
    
        localStorage.setItem("todos",JSON.stringify(todos));
    
      
    
        countActiveTask();
    
    }
    
    

}

