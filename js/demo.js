function todo() {
    //If local storage is empty, fill it with already existing activities.
    if (localStorage.getItem("activities") == null) {
        var list = ["Handla", "Rasta byrackan", "Städa", "Diska", "A", "B"];
        localStorage.setItem("activities", JSON.stringify(list));
    }
    renderActivityList();
    renderCompletedActivityList();
}

function sort() {
    //Get the local storage array and sort it
    var fromLocalStorage = JSON.parse(localStorage.getItem("activities"));
    fromLocalStorage.sort();
    localStorage.setItem("activities", JSON.stringify(fromLocalStorage));
    renderActivityList();
}

function addNew() {
    var list = JSON.parse(localStorage.getItem("activities"));
    var newItem = document.getElementById('add').value;
    //Error handling.
    if (newItem == '') {
        alert("Du måste fylla i fältet!")
        return false;
    }
    //Unshift instead of push to make items appear at the first place in the array.
    list.unshift(newItem);
    localStorage.setItem("activities", JSON.stringify(list));

    //Make input field empty after each add
    document.getElementById("add").value = '';
    renderActivityList();
}

function removeItem(x) {
    var list = JSON.parse(localStorage.getItem("activities"));
    //Removes from the array and pass index through function, x = index of todo.
    list.splice(x, 1);
    localStorage.setItem("activities", JSON.stringify(list));
    renderActivityList();
}


function taskComplete(x, y) {
    //If completed activities is null, set a default array.
    if (localStorage.getItem("completedActivities") == null) {
        var completedTodoList = [];
    } else {
        var completedTodoList = JSON.parse(localStorage.getItem("completedActivities"));
    }
    // Pass x which is name of activity to the completed list.
    completedTodoList.unshift(x);
    localStorage.setItem("completedActivities", JSON.stringify(completedTodoList));

    // Remove the activity from todo-array. y is index.
    var regularTodoList = JSON.parse(localStorage.getItem("activities"));
    regularTodoList.splice(y, 1);
    localStorage.setItem("activities", JSON.stringify(regularTodoList));
    renderActivityList();
    renderCompletedActivityList();
}

function regretItem(x, y) {
    //Define pre-existing local storage in a new variable
    var regularTodoList = JSON.parse(localStorage.getItem("activities"));
    // Pass x which is name of activity back to todo-list.
    regularTodoList.unshift(x);
    localStorage.setItem("activities", JSON.stringify(regularTodoList));

    var completedTodoList = JSON.parse(localStorage.getItem("completedActivities"));
    // Remove the activity from completed-array. y is index.
    completedTodoList.splice(y, 1);
    localStorage.setItem("completedActivities", JSON.stringify(completedTodoList));
    renderActivityList();
    renderCompletedActivityList();
}

function clearDoneActivities() {
    //Clears the completed activites array.
    localStorage.removeItem("completedActivities");
    location.reload();
}

//Renders the todo-array
function renderActivityList() {
    document.getElementById("todoList").innerHTML = '';
    var fromLocalStorage = JSON.parse(localStorage.getItem("activities"));
    for (let i = 0; i < fromLocalStorage.length; i++) {
        document.getElementById('todoList').innerHTML +=
            '<li> <input type="checkbox" onClick="taskComplete(\'' + fromLocalStorage[i] + '\',\'' + [i] + '\')"> ' + fromLocalStorage[i] + '<button onClick="removeItem(\'' + [i] + '\')"> <i class="fas fa-times"></i> </button> </li>';
    }
}
//Renders the completed-array
function renderCompletedActivityList() {
    document.getElementById("todoListDone").innerHTML = '';
    var doneList = JSON.parse(localStorage.getItem("completedActivities"));
    for (let i = 0; i < doneList.length; i++) {
        document.getElementById('todoListDone').innerHTML +=
            '<li>' + doneList[i] + '<button onClick="regretItem(\'' + doneList[i] + '\',\'' + [i] + '\')"> <i class="fas fa-undo-alt"></i></button> </li>';
    }
}
