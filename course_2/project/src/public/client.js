let store = Immutable.Map({
    user: Immutable.Map({ name: "Student" }),
    apod: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    selectedRover: null,
    roverPhotos: [],
});


// add our markup to the page
const root = document.getElementById('root')


const updateStore = (newState) => {
    store = store.merge(newState);
    render(root, store);
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

const RoverInfo = (selectedRover) => {
    if (!selectedRover) return '';
    return `
    <div class="col-3 meta-data">
    <h3>Information</h3>
    <dl>
    <dt>Launch Date:</dt>
        <dd>${selectedRover.rover.launch_date}</dd>    
    <dt>Landing Date:</dt>
        <dd>${selectedRover.rover.landing_date}</dd>
        <dt>Retirement Date:</dt>
        <dd>${selectedRover.rover.max_date}</dd>

        <dt>Status:</dt>
        <dd>${selectedRover.rover.status}</dd>

        <dt>Total Photos:</dt>
        <dd>${selectedRover.rover.total_photos.toLocaleString()}</dd>
    </dl>
</div>
    `;
}

const RoverPhotos = (photos) => {
    if (!photos || photos.length === 0) return '';


    const photoElements = photos.map(photo => `
        <div class="col-4">
            <img src="${photo.img_src}" alt="Rover photo taken by ${photo.camera.full_name}" />
            <p>Taken from "${photo.camera.full_name}" on ${photo.earth_date}</p>
        </div>
    `).join('');

    return `<div class="col-9"><div class="row text-center"><div class="col"><h3>Latest Images</h3></div></div><div class="row">${photoElements}</div></div>`;
}

const App = (state) => {
    let { rovers, apod, selectedRover, roverPhotos } = state.toJS();
    console.log(selectedRover);
    if (selectedRover === null) {
        return `${Greeting(store.get('user').get('name'))}`
    }
    return `
    <div class="rover-info">
    <h2>${selectedRover.rover.name}</h2>
        <div class="row">
            ${RoverInfo(selectedRover)}
            ${RoverPhotos(roverPhotos)}
        </div>
        </div>
        <footer></footer>
    `;
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}! Please select the rover you want to call.</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    if (!apod || apod.date === today.getDate()) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}

// ------------------------------------------------------  API CALLS

const getRoverData = (roverName) => {
    fetch(`http://localhost:3000/rover/${roverName}`)
        .then(res => res.json())
        .then(data => {
            updateStore({ selectedRover: data });
        })
        .catch(error => {
            console.error("Error fetching rover data:", error);
        });
}

const getRoverPhotos = (roverName) => {
    fetch(`http://localhost:3000/rover/${roverName}/photos`)
        .then(res => res.json())
        .then(data => {
            updateStore({ roverPhotos: data.photos });
        })
        .catch(error => {
            console.error("Error fetching rover photos:", error);
        });
}


document.getElementById("rover-selection").addEventListener("change", (event) => {
    const roverName = event.target.value;
    if (roverName === '') {
        updateStore({ selectedRover: null, roverPhotos: [] });
    } else {
        getRoverData(roverName);
        getRoverPhotos(roverName);
    }
});
