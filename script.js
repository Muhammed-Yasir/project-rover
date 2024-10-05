const roverPositionElement = document.getElementById('roverPosition');


const travelLogOutput = document.getElementById('travelLogOutput');

const newCommand=document.getElementById('newCommand');


// function for main project
function project(){

// current direction of rover
const rover = {
  direction: "N", // Default direction is North
  
  //rover position 
  //x for column [0,10]
  x:0,
  //y for row [0,10]
  y:0,
  
  //travel log
  travelLog:[]
};



function moveForward() {
  switch (rover.direction) {
    case "N":
      if(rover.y>0){
          rover.y--; // Move North (decrease y)
          }
          break;
     
    case "S":
    if(rover.y<10){
          rover.y++; // Move South (increase y)
          }
      break;
    case "E":
    if(rover.x<10){
          rover.x++; // Move East (increase x)
          }
      break;
    case "W":
    if(rover.x>0){
          rover.x--; // Move West (decrease x)
      }
      break;
    default:
      console.log("Invalid direction!");
  }
  
  
}


function moveBackward() {
  switch (rover.direction) {
    case "N":
    if(rover.y<10){
          rover.y++; // Move South (increase y)
          }
      break;
    case "S":
    if(rover.y>0){
          rover.y--; // Move North (decrease y)
          }
      break;
    case "E":
    if(rover.x>0){
          rover.x--; // Move West (decrease x)
          }
      break;
    case "W":
    if(rover.x<10){
          rover.x++; // Move East (increase x)
          }
      break;
    default:
      console.log("Invalid direction!");
  }
  
  
}


function turnLeft(rover) {

  switch (rover.direction) {
    case "N":
      rover.direction = "W"; // Turn left from North to West
      break;
    case "W":
      rover.direction = "S"; // Turn left from West to South
      break;
    case "S":
      rover.direction = "E"; // Turn left from South to East
      break;
    case "E":
      rover.direction = "N"; // Turn left from East to North
      break;
    default:
      console.log("Invalid direction"); // invalid direction
  }
  
}

function turnRight(rover) {
  switch (rover.direction) {
    case "N":
      rover.direction = "E"; // Turn right from North to East
      break;
    case "E":
      rover.direction = "S"; // Turn right from East to South
      break;
    case "S":
      rover.direction = "W"; // Turn right from South to West
      break;
    case "W":
      rover.direction = "N"; // Turn right from West to North
      break;
    default:
      console.log("Invalid direction"); //invalid direction
  }
  
  
 
}

let commands =prompt( "enter commands");

rover.travelLog.push([rover.x, rover.y]);

function processCommands(commands) {
    for (const cmd of commands) {
    
        switch (cmd) {
            case 'f':
            // forward 
                moveForward();
                // position pushing to travellog
                rover.travelLog.push([rover.x, rover.y]);
                break ;
            case 'b':
            //backward
                moveBackward();
                
               //position pushing to travel log
               rover.travelLog.push([rover.x,rover.y]);
                break;
                
            case 'l':
            //left
                turnLeft(rover);
                break;
            case 'r':
            //right;
                turnRight(rover);
                break;
            default :
                console.error(`Invalid command: ${cmd}`);
                
            }
       }     
}
let check=0;
// validating user commands 
function validateCommand(command) {
 
    for(const cmd of command){
      
         switch(cmd){
             case 'f':
             case 'b':
             case 'r':
             case 'l':
                  check=1;
                  break;
             default :
                  check=0;
                  break;
    }
    
    }
    if(check==0){
        console.error('invalid command:', commands);
        newCommand.innerHTML="Commamd is not valid";
    }
    return check;
}


let isValid= validateCommand(commands);
    

if(isValid==1){
    const result = processCommands(commands);
    newCommand.innerHTML=commands;
    }else{
        console.log ("terminated")
    }
console.log(`Final position: (${rover.x}, ${rover.y}), facing ${rover.direction}`);

console.log("travel log:",rover.travelLog);

roverPositionElement.textContent = `New Rover position: x = ${rover.x}, y = ${rover.y}`;




function convertToCoordinates(travelPath) {
    return travelPath.map(([x, y]) => `[${x},${y}]`);
}

const roverPath = rover.travelLog;
const roverCoordinates = convertToCoordinates(roverPath);
travelLogOutput.innerHTML=roverCoordinates;

}

