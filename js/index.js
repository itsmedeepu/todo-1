/**
 *
 * author:DEEPAK S
 * date:16-04-2023
 * open-source
 */

let form = document.querySelector(".to-do");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = document.querySelector("#titles").value;
  let discription = document.querySelector("#decription").value;
  if (validate(title, discription)) {
    let todo = getTodos(title, discription);

    let spinner = document.querySelector(".spinner-border");
    let buttontext = document.querySelector(".button-text");

    let todos = addtodos();

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    buttontext.innerText = "Adding....";
    setTimeout(() => {
      spinner.classList.toggle("d-none");
      fetchalltodos();
      buttontext.innerText = "Add";
    }, 3000);
    spinner.classList.toggle("d-none");
  } else {
    alert("please dont leave blank");
  }
});

//check if all feilds are filled or not
function validate(title, description) {
  if (title == "") return false;
  if (description == "") return false;
  return true;
}

//get all todos
function getTodos(title, description) {
  let eachtodo = {};
  eachtodo.title = title;
  eachtodo.description = description;

  let date = getDate();
  eachtodo.date = date;
  return eachtodo;
}
//fetch all todos
function addtodos() {
  //check if todos is empty creata a empty list and add it
  if (localStorage.getItem("todos") === null) {
    return [];
  }
  let todo = JSON.parse(localStorage.getItem("todos"));
  return todo;
}

function getDate() {
  const date = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let today = date.getDate();
  let year = date.getFullYear();
  let dates = `${month} ${today} ${year}`;
  return dates;
}

function fetchalltodos() {
  let row = document.querySelector("#row");
  if (localStorage.getItem("todos") === null) {
    let todos = document.querySelectorAll("#todos");

    todos.forEach((e) => {
      e.remove();
    });

    return [];
  }

  let alltods = JSON.parse(localStorage.getItem("todos"));

  let todos = document.querySelectorAll("#todos");

  todos.forEach((e) => {
    e.remove();
  });

  alltods.forEach((e) => {
    let col = document.createElement("div");
    col.setAttribute("class", "col-lg-3");
    col.setAttribute("id", "todos");
    col.innerHTML = `<div class="card">
    <div class="card-header">Featured</div>
    <div class="card-body">
      <h5 class="card-title">${e.title}</h5>
      <p class="card-text">
        ${e.description}
      </p>
    </div>

    <div class="card-footer">
      <p class="text-muted float-start">${e.date}</p>

      <button class="btn btn-sm btn-danger float-end delete" data-id="${e.title}">
      <span
      class="spinner-border spinner-border-sm text-white d-none"
      role="status"
    ></span>
        <i class="fas fa-trash"> </i><span class="delete-text">Delete</span>
      </button>
      <button class="btn btn-sm btn-success float-end me-2 edit" data-id="${e.title}"  data-mdb-toggle="modal"
      data-mdb-target="#editmodal">
      <span
      class="spinner-border spinner-border-sm text-white d-none"
      role="status"
    ></span>
        <i class="fas fa-pen-to-square"> </i><span class="edit-text">Edit</span>
      </button>
    </div>
  </div>`;

    row.append(col);
  });
}
fetchalltodos();
modal();

const row = document.querySelector("#row");

row.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let title = e.target.getAttribute("data-id");
    e.target.childNodes[4].innerText = "Deleting..";
    setTimeout(() => {
      e.target.childNodes[1].classList.toggle("d-none");
      e.target.childNodes[4].innerText = "Delete";
      deleteTodos(title);
    }, 2000);
    e.target.childNodes[1].classList.toggle("d-none");
  }
  if (e.target.classList.contains("edit")) {
    let title = e.target.getAttribute("data-id");

    e.target.childNodes[4].innerText = "Loading....";
    setTimeout(() => {
      e.target.childNodes[1].classList.toggle("d-none");
      e.target.childNodes[4].innerText = "Edit";
      let todo = fetchToDosByTitle(title);
      document.querySelector("#edit-title").value = todo.title;
      document.querySelector("#edit-description").value = todo.description;
    }, 2000);
    e.target.childNodes[1].classList.toggle("d-none");
  }
});

//delete todos

function deleteTodos(title) {
  let todos = JSON.parse(localStorage.getItem("todos"));

  let removed = todos.filter((e) => {
    if (e.title !== title) return e;
  });
  if (removed.length === 0) {
    localStorage.removeItem("todos");
    fetchalltodos();
  } else {
    localStorage.setItem("todos", JSON.stringify(removed));
    fetchalltodos();
  }
}

//fetch todo by title

function fetchToDosByTitle(title) {
  let todos = JSON.parse(localStorage.getItem("todos"));

  let todo = todos.find((e) => {
    if (e.title === title) return e;
  });

  return todo;
}

//update the todos

//setmodal defualt configs

function modal() {
  let form = document.querySelector(".todo-from");
  let status = document.querySelector(".modal-status");
  setTimeout(() => {
    form.classList.toggle("d-none");
    status.childNodes[1].classList.toggle("d-none");
    status.childNodes[3].classList.toggle("d-none");
  }, 3000);
  form.classList.toggle("d-none");
  status.childNodes[1].classList.toggle("d-none");
  status.childNodes[3].classList.toggle("d-none");
}

let upbutton = document.querySelector("#update");

upbutton.addEventListener("click", (e) => {
  e.preventDefault();

  let title = document.querySelector("#edit-title").value;
  let description = document.querySelector("#edit-description").value;
  if (validate(title, description)) {
    let todos = getAllTodos();
    let updatedtods = todos.map((e) => {
      if (e.title === title) {
        e.description = description;
        e.date = getDate();
        return e;
      }
      return e;
    });
    let todo = fetchToDosByTitle(title);
    document.querySelector("#edit-title").value = todo.title;
    document.querySelector("#edit-description").value = todo.description;

    localStorage.setItem("todos", JSON.stringify(updatedtods));
    fetchalltodos();

    window.alert("todo updated sucessfully!!");
  } else {
    window.alert("please dont leave blank");
  }
});

//get all todos

function getAllTodos() {
  let alltods = JSON.parse(localStorage.getItem("todos"));

  return alltods;
}
