(function(){
        window.addEventListener("DOMContentLoaded", init);

        window.addEventListener("storage", onStorageEvent);


        function onStorageEvent(){
            console.log("storage event triggered");
            window.location.reload();
        }

        function init(){
            var btnAddTask = document.getElementById("btnAddTask");
            btnAddTask.addEventListener("click", onBtnAddTaskClick);

            var btnRemoveCompleted = document.getElementById("btnRemoveCompleted");
            btnRemoveCompleted.addEventListener('click', onBtnRemoveCompletedClick);

            loadTasksFromStorage();
        }

        function loadTasksFromStorage(){
            for(var i=0; i<localStorage.length; i++){
                var taskId = localStorage.key(i);
                var taskName = localStorage.getItem(taskId);
                addToList(taskId, taskName);
            }
        }

        function onBtnAddTaskClick(){
            window.newTaskName = document.getElementById("txtTask").value;

            var taskId = Date.now().toString();
            localStorage.setItem(taskId, newTaskName);
            addToList(taskId, newTaskName);
        }

        function addToList(taskId, taskName){
            var newTask = document.createElement("li");
            newTask.setAttribute("task-id", taskId);
            newTask.innerHTML = taskName;
            newTask.addEventListener("click", onTaskItemClick);
            document.getElementById("olTaskList").appendChild(newTask);
        }

        function onTaskItemClick(){
            this.classList.toggle("completed");
        }

        function onBtnRemoveCompletedClick(){
            var taskItems = document.getElementById("olTaskList").children;
            for(var i=taskItems.length-1; i>=0; i--){
                if (taskItems[i].classList.contains("completed")){

                    var taskId = taskItems[i].getAttribute("task-id");
                    localStorage.removeItem(taskId);

                    taskItems[i].removeEventListener("click", onTaskItemClick);
                    taskItems[i].remove();
                }
            }
        }

    })();
