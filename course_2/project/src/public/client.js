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


const createInfoDisplay = (info) => {
    return Object.entries(info).map(([key, value]) => `
        <dt>${key}:</dt>
        <dd>${value}</dd>
    `).join('');
};

const RoverInfo = (selectedRover, cb) => {
    if (!selectedRover) return '';

    const info = {
        'Launch Date': selectedRover.rover.launch_date,
        'Landing Date': selectedRover.rover.landing_date,
        'Retirement Date': selectedRover.rover.max_date,
        'Status': selectedRover.rover.status,
        'Total Photos': selectedRover.rover.total_photos.toLocaleString()
    };

    return `
        <div class="col-3 meta-data">
            <h3>Information</h3>
            <dl>
                ${cb(info)}
            </dl>
        </div>
    `;
};

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
            ${RoverInfo(selectedRover, createInfoDisplay)}
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

// ------------------------------------------------------  API CALLS

// Higher-order function: Fetch and update
const fetchAndUpdate = (endpoint, updateFn) => {
    fetch(endpoint)
        .then(res => res.json())
        .then(data => updateFn(data))
        .catch(error => console.error(`Error fetching from endpoint: ${endpoint}`, error));
}

document.getElementById("rover-selection").addEventListener("change", (event) => {
    const roverName = event.target.value;
    if (roverName === '') {
        updateStore({ selectedRover: null, roverPhotos: [] });
    } else {
        fetchAndUpdate(`http://localhost:3000/rover/${roverName}`, data => updateStore({ selectedRover: data }));
        fetchAndUpdate(`http://localhost:3000/rover/${roverName}/photos`, data => updateStore({ roverPhotos: data.photos }));
    }
});