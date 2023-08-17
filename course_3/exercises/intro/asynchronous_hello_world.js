// Welcome to a basic asynchronous program!
// This is a quick peek ahead into some of the syntax we'll be going over in the next lesson


// Notice how the console log for "Hello" comes AFTER "World",  yet when the program runs, the words appear in the correct order!
const printHelloWorld = () => {
  
    setTimeout(console.log, 2000, "World");
    
    console.log("Hello ");
  }
  
  // printHelloWorld();
  
  // CHALLENGE - Move the setTimeout after the console log, does that change the outcome? 
const printHelloWorldChangeOrder = () => {
    
    console.log("Hello ");
    setTimeout(console.log, 2000, "World");
  }
  // printHelloWorldChangeOrder();
  
  // CHALLENGE - Edit the time elapsed between "Hello" and "World" appearing on the screen
const printHelloWorldChangeTimeout = () => {
    setTimeout(console.log, 0.1, "World");
    console.log("Hello ");
    
  }

//printHelloWorldChangeTimeout();
  // CHALLENGE - Edit the message being sent to have three parts:
  // Part 1: "I'm " - shows up immediately
  // Part 2: "async" - shows up 2 seconds after "I'm"
  // Part 3: "...ronous!" - shows up 4 seconds after "async"
const printMessage = (message) => {
    setTimeout(console.log, 4000, "...hronous!")
}

const printHelloWorld2 = () => {
  console.log("I'm ");
  setTimeout(printMessage, 2000, "async");
}

printHelloWorld2();

  // Extra Challenge - if you want to go even further with it, time each of the dots in the ellipses of part 3
  // Write a function to make each dot appear one second after the other.