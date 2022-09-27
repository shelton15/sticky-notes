//sticky note in javascript?
const createBox = document.getElementsByClassName("createBox")[0];
const notes = document.getElementsByClassName("notes")[0];
let contentArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

var i = 0;

contentArray.forEach(divMaker);

function divMaker(noteObj) {
  var div = document.createElement("div");
  div.setAttribute("noteId", noteObj.noteId);
  var h1 = document.createElement("h1");

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "hidden");
  deleteBtn.setAttribute("name", "delete");
  deleteBtn.textContent = "delete";
  h1.textContent = noteObj.text;

  div.className = "note";
  div.setAttribute(
    "style",
    "margin:" + margin() + "; background:" + color() + ""
  );
  div.appendChild(deleteBtn);
  div.appendChild(h1);

  notes.appendChild(div);

  div.addEventListener("mouseenter", function () {
    div.style.transform = "scale(1.1)";
  });

  div.addEventListener("mouseleave", function () {
    div.style.transform = "scale(1)";
  });
}

function addNote() {
  const input = document.getElementById("user-input");
  const noteId = getUniqueId();
  const noteObj = { noteId: noteId, text: input.value };
  contentArray.push(noteObj);
  localStorage.setItem("items", JSON.stringify(contentArray));
  divMaker(noteObj);
  input.value = "";
}

function createNote() {
  if (createBox.style.display === "none") createBox.style.display = "block";
  else createBox.style.display = "none";
}

function deleteNotes() {
  localStorage.clear();
  notes.innerHTML = "";
  contentArray = [];
}

function margin() {
  var random_margin = ["-5px", "1px", "5px", "10px", "15px", "20px"];

  return random_margin[Math.floor(Math.random() * random_margin.length)];
}

function color() {
  var random_colors = [
    "#87CEEB",
    "#ADD8E6",
    "#6CA6CD",
    "#8DB6CD",
    "#A2B5CD",
    "#BFEFFF",
  ];

  if (i > random_colors.length - 1) {
    i = 0;
  }
  return random_colors[i++];
}

createBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") addNote();
});

///-----------------Added----------------------

function getUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

//-----addEventListener for selecting a .notes element:
//-----it toggle delete btn when you click inside or outside the .notes element
notes.addEventListener("click", function (event) {
  const noteElement = event.target.closest(".note");
  if (noteElement !== null) {
    const buttons = noteElement.querySelectorAll("button");
    buttons.forEach(function (btn) {
      btn.classList.remove("hidden");
    });
  } else {
    document.querySelectorAll(".note button").forEach(function (btn) {
      btn.classList.add("hidden");
    });
  }
});

//-----addEventListener for deleting a .note element
notes.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const noteElement = event.target.closest(".note");
    const noteId = noteElement.getAttribute("noteId");
    console.log(noteId);
    //remove item from localStorage
    contentArray = contentArray.filter(x => x.noteId !== noteId);
    localStorage.setItem("items", JSON.stringify(contentArray));
    //remove note element
    noteElement.remove();
  }
});





