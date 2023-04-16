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

    let todos = addtodos();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    fetchalltodos();
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
        <i class="fas fa-trash"> </i>DELETE
      </button>
      <button class="btn btn-sm btn-success float-end me-2 edit">
        <i class="fas fa-pen-to-square"> </i>EDIT
      </button>
    </div>
  </div>`;

    row.append(col);
  });
}
fetchalltodos();

const row = document.querySelector("#row");

row.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let title = e.target.getAttribute("data-id");
    deleteTodos(title);
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
