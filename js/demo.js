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
    var fromLocalStorage = JSON.parse(localStorage.getItem("activities"));
    fromLocalStorage.sort();
    localStorage.setItem("activities", JSON.stringify(fromLocalStorage));
    renderActivityList();
}

function addNew() {
    var list = JSON.parse(localStorage.getItem("activities"));
    var newItem = document.getElementById('add').value;
    if (newItem == '') {
        alert("Du måste fylla i fältet!")
        return false;
    }
    list.unshift(newItem);
    localStorage.setItem("activities", JSON.stringify(list));

    //Make input field empty after each add
    document.getElementById("add").value = '';
    renderActivityList();
}

//x = index of item
function removeItem(x) {
    var list = JSON.parse(localStorage.getItem("activities"));
    list.splice(x, 1);
    localStorage.setItem("activities", JSON.stringify(list));
    renderActivityList();
}

// x is name of task, y is array-index.
function taskComplete(x, y) {
    if (localStorage.getItem("completedActivities") == null) {
        var completedTodoList = [];
    } else {
        var completedTodoList = JSON.parse(localStorage.getItem("completedActivities"));
    }

    completedTodoList.unshift(x);
    localStorage.setItem("completedActivities", JSON.stringify(completedTodoList));

    var regularTodoList = JSON.parse(localStorage.getItem("activities"));
    regularTodoList.splice(y, 1);
    localStorage.setItem("activities", JSON.stringify(regularTodoList));
    renderActivityList();
    renderCompletedActivityList();
}

function regretItem(x, y) {
    //Define pre-existing local storage in a new variable
    var regularTodoList = JSON.parse(localStorage.getItem("activities"));
    regularTodoList.unshift(x);
    localStorage.setItem("activities", JSON.stringify(regularTodoList));

    var completedTodoList = JSON.parse(localStorage.getItem("completedActivities"));
    completedTodoList.splice(y, 1);
    localStorage.setItem("completedActivities", JSON.stringify(completedTodoList));
    renderActivityList();
    renderCompletedActivityList();
}

function clearDone() {
    localStorage.removeItem("completedActivities");
    location.reload();
}

function renderActivityList() {
    document.getElementById("todoList").innerHTML = '';
    var fromLocalStorage = JSON.parse(localStorage.getItem("activities"));
    for (let i = 0; i < fromLocalStorage.length; i++) {
        document.getElementById('todoList').innerHTML +=
            '<li> <input type="checkbox" onClick="taskComplete(\'' + fromLocalStorage[i] + '\',\'' + [i] + '\')"> ' + fromLocalStorage[i] + '<button onClick="removeItem(\'' + [i] + '\')"> <i class="fas fa-times"></i> </button> </li>';
    }
}

function renderCompletedActivityList() {
    document.getElementById("todoListDone").innerHTML = '';
    var doneList = JSON.parse(localStorage.getItem("completedActivities"));
    for (let i = 0; i < doneList.length; i++) {
        document.getElementById('todoListDone').innerHTML +=
            '<li>' + doneList[i] + '<button onClick="regretItem(\'' + doneList[i] + '\',\'' + [i] + '\')"> <i class="fas fa-undo-alt"></i></button> </li>';
    }
}
