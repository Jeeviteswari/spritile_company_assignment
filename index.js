let myFormEl = document.getElementById("myForm");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

let passwordEl = document.getElementById("password");
let passwordErrMsgEl = document.getElementById("passwordErrMsg");

emailEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Email Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }
});

passwordErrMsgEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        passwordErrMsgEl.textContent = "Password Required*";
    } else {
        passwordErrMsgEl.textContent = "";
    }
});

myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
});

function sendMail(){
    var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    }

    const serviceID = "service_lcinwq6";
    const templateID = "template_6e1ln0l";
    
    emailjs.send(serviceID, templateID, params)
    .then((result) => {
        console.log(result);
        alert("Message sent successfully");
    })
    
    .catch((error) => console.log(error));
}

function login(myFormEl){
    if(myFormEl.emailEl.value && myFormEl.passwordEl.value){
        let profilePic = "https://res.cloudinary.com/djfaxrxbf/image/upload/v1657032568/Teddy_bear_edvwfm.png";
        let dateOfBirth = "30/10/1995";
        let addressDetails = "Andhrapradesh";
        let mobileNo = 9581063237;
        
        let profileElement = document.createElement("div");
        profileElement.classList.add("profile-details");
        myFormEl.appendChild(profileElement);
        console.log(profilePic);
        console.log(dateOfBirth);
        console.log(addressDetails);
        console.log(mobileNo);
    }
    else{
        alert("Please enter valid details");
    }
}

var size = 4;
var fieldCells = createField();

var values;
var emptyX, emptyY;

var LEFT = {dx: -1, dy: 0};
var RIGHT = {dx: 1, dy: 0};
var UP = {dx: 0, dy: -1};
var DOWN = {dx: 0, dy: 1};



//Creating HTML elements for table cells 
function createField() {
    var cells = [];
    var table = document.getElementById('field');
    for (var y = 0; y < size; y++) {
      var tr = document.createElement('tr');
      table.appendChild(tr);
      var rowCells = [];
      cells.push(rowCells);
      for (var x = 0; x < size; x++) {
        var td = document.createElement('td');
        td.setAttribute('class', 'cell');
        tr.appendChild(td);
        rowCells.push(td);
      }
    }
    return cells;
  }

  function createInitialValues() {
    emptyX = emptyY = size - 1;
    var v = [];
    var i = 1;
    for (var y = 0; y < size; y++) {
      var rowValues = [];
      v.push(rowValues);
      for (var x = 0; x < size; x++) {
        rowValues.push(i);
        i++
      }
    }
    v[emptyY][emptyX] = 0;
    return v;
  }

  function draw() {
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        var v = values[y][x];
        var td = fieldCells[y][x];
        td.innerHTML = v == 0 ? '': String(v);
      }
    }
  }
  
  function makeMove(move) {
    var newX = emptyX + move.dx, newY = emptyY + move.dy;
    if ((newX >= size) || (newX < 0) ||
      (newY >= size) || (newY < 0)
    ) {
      return false;
    }
    var c = values[newY][newX];
    values[newY][newX] = 0;
    values[emptyY][emptyX] = c;
    emptyX = newX;
    emptyY = newY;
    return true;
  }

  function shuffle() {
    var options = [LEFT, RIGHT, UP, DOWN];
    var iterations = 5;
    for (var i = 0; i < iterations; i++) {
      var move = options[Math.floor(Math.random() * options.length)];
      makeMove(move);
    }
  }

  function gameOver() {
    var expectedValue = 1;
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        if (values[y][x] == expectedValue) {
          expectedValue++;
        } else {
          if (x == size - 1 && y == size - 1 && values[y][x] == 0) {
            return true;
          }
          return false;
        }
      }
    }
    return true;
  }

  document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
      case 38: makeMove(UP); break;
      case 40: makeMove(DOWN); break;
      case 37: makeMove(LEFT); break;
      case 39: makeMove(RIGHT); break;
    }
    draw();
    if (gameOver()) {
      setTimeout(function() {
        alert('Game over, you won!');
        init();
      }, 1000);
    }
  });

  function init() {
    values = createInitialValues();
    shuffle();
    draw();
  }

  init();
