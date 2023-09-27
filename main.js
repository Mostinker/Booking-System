class CreateCinema {
  constructor(numOfRows, numofColumns) {
    this.numOfRows = numOfRows;
    this.numofColumns = numofColumns;
    this.tRow = document
      .getElementById("cinema-table")
      .getElementsByTagName("td");

    this.firstarr = new Array(this.numOfRows);
    this.movieSelect = document.getElementById("movie").value;
  }

  setterMovieSelect(newMovie) {
    this.movieSelect = newMovie;
  }

  create(table) {
    for (let i = 0; i < this.firstarr.length; i++) {
      this.firstarr[i] = new Array(this.numofColumns);
    }
    for (var i = 0; i < this.numOfRows; i++) {
      let row = table.insertRow();
      for (var j = 0; j < this.numofColumns; j++) {
        this.firstarr[i][j] = 0;
        let col = row.insertCell();
      }
    }
    //console.log(this.firstarr);
    for (var i = 0; i < this.tRow.length; i++) {
      this.tRow[i].classList.add("seat");
    }
  }
}

var count = 0;
const cinemaRoom = document.getElementById("room");
const seatsToBeSelecteed = document.getElementById("cinema-table");

seatsToBeSelecteed.addEventListener("click", (item) => {
  if (
    item.target.classList.contains("seat") &&
    !item.target.classList.contains("sold")
  ) {
    item.target.classList.toggle("selected");
    if (count == 0) {
      const question = document.createElement("p");
      question.classList.add("this-question");
      const questionText = document.createTextNode(
        "You wish to reserve these spots?"
      );
      question.appendChild(questionText);
      cinemaRoom.appendChild(question);
      count++;
      const yesButton = document.createElement("button");
      const yesButtonText = document.createTextNode("Yes");
      yesButton.appendChild(yesButtonText);
      yesButton.classList.add("yes-btn");
      yesButton.addEventListener("click", sold);
      const noButton = document.createElement("button");
      const noButtonText = document.createTextNode("No");
      noButton.appendChild(noButtonText);
      noButton.classList.add("no-btn");
      noButton.addEventListener("click", changedMyMind);
      //console.log(item.target.tagName);
      const buttonWrapper = document.createElement("div");
      buttonWrapper.classList.add("wrapper-class");
      buttonWrapper.appendChild(yesButton);
      buttonWrapper.appendChild(noButton);
      cinemaRoom.appendChild(buttonWrapper);
    }
    updatePrice();
  }
});

const sold = () => {
  for (var i = 0; i < cinema.tRow.length; i++) {
    if (cinema.tRow[i].classList.contains("selected")) {
      cinema.tRow[i].classList.toggle("sold");
      cinema.tRow[i].classList.remove("selected");
    }
  }
  count = 0;
  document.querySelector(".wrapper-class").remove();
  document.querySelector(".this-question").remove();
  document.getElementById("count").textContent = "0";
  document.getElementById("total").textContent = "0";
  updateMatrix();
};
const changedMyMind = () => {
  for (var i = 0; i < cinema.tRow.length; i++) {
    if (cinema.tRow[i].classList.contains("selected")) {
      cinema.tRow[i].classList.remove("selected");
    }
  }

  count = 0;
  document.querySelector(".wrapper-class").remove();
  document.querySelector(".this-question").remove();
  document.getElementById("count").textContent = "0";
  document.getElementById("total").textContent = "0";
};

const cinema = new CreateCinema(10, 15);
cinema.create(document.getElementById("cinema-table"));

let initialRoom = document.querySelector("#movie").value;
const changeRoom = () => {
  let newRoom = document.querySelector("#movie").value;
  cinema.setterMovieSelect(newRoom);
  if (initialRoom != newRoom) {
    for (var i = 0; i < cinema.tRow.length; i++) {
      if (
        cinema.tRow[i].classList.contains("selected") ||
        cinema.tRow[i].classList.contains("sold")
      ) {
        cinema.tRow[i].classList.remove("selected");
        cinema.tRow[i].classList.remove("sold");
      }
    }
    count = 0;
    initialRoom = newRoom;
  }
  // cele 2 linii de aici
  document.getElementById("count").textContent = "0";
  document.getElementById("total").textContent = "0";
};
const newRoom = document.getElementById("new-room");
newRoom.addEventListener("click", changeRoom);

const updatePrice = () => {
  let count = 0;
  for (var i = 0; i < cinema.tRow.length; i++) {
    if (cinema.tRow[i].classList.contains("selected")) {
      count++;
    }
  }
  let total = cinema.movieSelect * count;
  document.getElementById("count").textContent = count;
  document.getElementById("total").textContent = total;
};

const updateMatrix = () => {
  for (var i = 0; i < cinema.numOfRows; i++) {
    for (var j = 0; j < cinema.numofColumns; j++) {
      if (cinema.tRow[j + cinema.numofColumns * i].classList.contains("sold")) {
        cinema.firstarr[i][j] = 1;
      }
    }
  }
  //console.log(cinema.firstarr);
};
