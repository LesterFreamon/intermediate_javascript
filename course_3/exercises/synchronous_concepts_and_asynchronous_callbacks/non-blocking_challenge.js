// Task 1 - write a program that acheives the following sequence
const longFunction = (ms) => {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
};
// log "A"
// wait 2s
// log "B"
// wait 3s
// log "C"
// log "D" immediately 
console.log('A');
longFunction(2000);
console.log('B');
longFunction(3000);
console.log('C');
console.log('D');