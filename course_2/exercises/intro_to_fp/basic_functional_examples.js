// -----------------------------------------------------------------
// Exercise 1
// Directions: Write a pure function that prints "good afternoon" if
//       its afternoon and "good morning" any other time of the day.
// Hint - this will help with time of day: new Date().getHours()
// -----------------------------------------------------------------

function greet() {
    const newHour = new Date().getHours();
    if (newHour >= 12) {
        return "good afternoon";
    }
    else {
        return "good morning";
    }
}

console.log(greet());


// -----------------------------------------------------------------
// Exercise 2
// Directions: Write a pure function that takes in a number and  
//       returns an array of items counting down from that number to 
//       zero.
// -----------------------------------------------------------------
function createCountdownArray(number) {
    if (number < 0) {
        return [];
    }
    let newArray = [];
    for (let i = number; i >= 0; i--) {
        newArray.push(i);
    }
    return newArray;
}

console.log(createCountdownArray(2));
console.log(createCountdownArray(-1));

