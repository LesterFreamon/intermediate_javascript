// Callback Challenge 2: Secret Number

// Write a callback chain that does the following:

// 1. Generates a random number
// 2. Waits three seconds, then adds 5 to the random number
// 3. Every two seconds, adds 2 to the random number for a total of 6 seconds
// 4. Subtracts 3
// 5. Waits four seconds, and logs the resulting number


// Your Code Here:
const wait4 = secret_num => { 
    setTimeout(console.log, 4000, secret_num)
}

const interval2 = (rand, cb) => {
    let sum = rand;
    const add1 = () => {
        
        sum = sum + 2;

        if ( sum-rand >= 6) {
            clearInterval(byTwo);
            cb(sum-3);
        }
    }
    const byTwo = setInterval(add1, 2000)
}

const add5 = (rand, cb, cb2 ) => {
    cb(rand+5, cb2);
}

// Function for you to get started with:
const generateRandomNumber = () => { 
    const rand = Math.round(Math.random() * 10);
    setTimeout(add5, 3000, rand, interval2, wait4);
} 

generateRandomNumber()

// HINT: Add in console logs!

// HINT: setInterval can be stopped using clearInterval like this:
// const myInterval = setInterval(exampleFunc, 2000)
// clearInterval(myInterval)