// Build out this mock API request so that does the following:
// 1. Gets the user information and turns the JSON into a JavaScript object
// 2. Gets the event message and turns the JSON into a JavaScript object
// 3. Prints out a console log message that says "Thank you, Ralph S. Mouse, your account has been updated"


const eventMessage = JSON.stringify({body: "Your account has been updated!"});
const currentUser = JSON.stringify({
    name: "Ralph S. Mouse",
    id: "238jflK3"
});

const getUserInformation = () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, currentUser);
    }).then(data => JSON.parse(data))
};

const getEventMesssage = () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, eventMessage);
    }).then(data => JSON.parse(data))
};

getUserInformation().then(userInfo => {
    getEventMesssage()
    .then(message => message.body)
    .then(message => {
        const greeting = `Thank you, ${userInfo.name}.`
        console.log(`${greeting} ${message}`)
    })
}).catch(err => console.log(err));