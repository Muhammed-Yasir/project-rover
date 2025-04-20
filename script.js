const grid = document.getElementById("grid");
const roverImg = document.createElement("img");
roverImg.src = "rover.png"; // Ensure rover.png is in the same folder
roverImg.alt = "Rover";
roverImg.classList.add("rover-img");

let rover = {
  x: 0,
  y: 0,
  direction: "N",
  travelLog: [[0, 0]]
};

createGrid();
placeRover();

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
  }
  roverImg.classList.add("rover");
  grid.appendChild(roverImg);
}

function placeRover() {
  const cellWidth = grid.clientWidth / 10;  // Divide grid width into 10 cells
  const cellHeight = grid.clientHeight / 10;  // Divide grid height into 10 cells

  // Set the rover's position within the grid cell based on its current x, y coordinates
  roverImg.style.left = `${rover.x * cellWidth + (cellWidth * 0.1)}px`;  // Adjust position to center the rover
  roverImg.style.top = `${rover.y * cellHeight + (cellHeight * 0.1)}px`;  // Adjust position to center the rover
}

function moveForward() {
  switch (rover.direction) {
    case "N": if (rover.y > 0) rover.y--; break;
    case "S": if (rover.y < 9) rover.y++; break;
    case "E": if (rover.x < 9) rover.x++; break;
    case "W": if (rover.x > 0) rover.x--; break;
  }
  rover.travelLog.push([rover.x, rover.y]);
  placeRover();
  updateStatus();
}

function moveBackward() {
  switch (rover.direction) {
    case "N": if (rover.y < 9) rover.y++; break;
    case "S": if (rover.y > 0) rover.y--; break;
    case "E": if (rover.x > 0) rover.x--; break;
    case "W": if (rover.x < 9) rover.x++; break;
  }
  rover.travelLog.push([rover.x, rover.y]);
  placeRover();
  updateStatus();
}

function turnLeft() {
  const directions = ["N", "W", "S", "E"];
  let idx = directions.indexOf(rover.direction);
  rover.direction = directions[(idx + 1) % 4];
  updateStatus();
}

function turnRight() {
  const directions = ["N", "E", "S", "W"];
  let idx = directions.indexOf(rover.direction);
  rover.direction = directions[(idx + 1) % 4];
  updateStatus();
}

function executeCommands() {
  const input = document.getElementById("commands").value.trim().toLowerCase();
  for (const cmd of input) {
    switch (cmd) {
      case "f": moveForward(); break;
      case "b": moveBackward(); break;
      case "l": turnLeft(); break;
      case "r": turnRight(); break;
      default: alert(`Invalid command: ${cmd}`); return;
    }
  }
}

function updateStatus() {
  document.getElementById("position").textContent = `x=${rover.x}, y=${rover.y}`;
  document.getElementById("direction").textContent = rover.direction;
  document.getElementById("log").textContent = rover.travelLog.map(pos => `[${pos}]`).join(" → ");
}
