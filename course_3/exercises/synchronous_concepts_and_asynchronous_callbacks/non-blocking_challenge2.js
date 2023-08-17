// Task 2 - print each word of this quote every second using built javascript method setInterval. Print the quote source all at once afterwards

// Tip: To stop a setInterval - call clearInterval() 
// Tip: To pass arguments to the function setInterval is calling, add them as a 3rd (and 4th if you need it) 
//      argument to setInterval, after the milliseconds 

// "The art of programming is the skill of controlling complexity."
// "-- Marijn Haverbeke, Eloquent JavaScript"

const quote = "The art of programming is the skill of controlling complexity.";
const reference = "-- Marijn Haverbeke, Eloquent JavaScript";

const printClosure = () => {
    let index = 0;
    return (quotes) => {
        let word = quotes[index];
        console.log(word);
        index += 1;
        if (index === quotes.length) {
            clearInterval(intervalID);
            console.log(reference);
        }

    }
}

let intervalID = setInterval(printClosure(), 1000, quote.split(" "));

// To stop it after 10 seconds:
/*
setTimeout(() => {
    clearInterval(intervalID);
    console.log("Stopped logging.");
    console.log(reference);
}, 10000);
*/