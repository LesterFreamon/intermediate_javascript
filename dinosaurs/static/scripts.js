
class Dinosaur {
    constructor({ species, weight, height, diet, where, when, fact }) {
        this.species = species
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

    getTitle() {
        return this.species;
    }

    getAFact() {
        const facts = [
            `This dinosaur weighed ${this.weight} lbs`,
            `It stood at a height of ${this.height} inches`,
            `It was a ${this.diet}`,
            `It lived in ${this.where}`,
            `It existed in the  ${this.when} period`,
            this.fact
        ];

        const randomIndex = Math.floor(Math.random() * facts.length);
        return facts[randomIndex];
    }

    getInfo() {
        return this.getAFact();
    }

    getImagePath() {
        return `./static/images/${this.species.toLowerCase().replace(/ /g, "_")}.png`;
    }
}

class Bird extends Dinosaur {
    constructor({ species, weight, height, diet, where, when, fact, wingSpan }) {
        super({ species, weight, height, diet, where, when, fact });
    }

    // You can add additional methods or override existing methods for the Bird class
    getAFact() {
        return this.fact;
    }
}

class Human {
    constructor({ name, weight, height, where }) {
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.where = where;
    }

    compareHeight(dino) {
        const humanHeight = this.height;
        const dinoHeight = dino.height;
        if (humanHeight > dinoHeight) {
            return `are ${humanHeight - dinoHeight} inches taller than ${dino.species}`;
        } else if (humanHeight < dinoHeight) {
            return `${dino.species} is ${dinoHeight - humanHeight} inches taller than you`;
        } else {
            return `are as tall as ${dino.species}`;
        }
    }

    compareWeight(dino) {
        const humanWeight = this.weight;
        const dinoWeight = dino.weight;
        if (humanWeight > dinoWeight) {
            return `are ${humanWeight - dinoWeight} lbs heavier than ${dino.species}`;
        } else if (humanWeight < dinoWeight) {
            return `${dino.species} is ${dinoWeight - humanWeight} lbs heavier than you`;
        } else {
            return `weigh the same as ${dino.species}`;
        }
    }

    comparePlace(dino) {
        const humanPlace = this.where;
        const dinoPlace = dino.where;
        if (humanPlace == dinoPlace) {
            return `And you both lived in ${humanPlace}`;
        } else {
            return `You lived in ${humanPlace} while ${dino.species} lived in ${dinoPlace}`;
        }
    }
    getImagePath() {
        return `./static/images/human.png`;
    }

    getTitle() {
        return this.name;
    }

    getInfo(dino) {
        return `When comparing to ${dino.species}
        <br>${this.compareHeight(dino)}
        <br>${this.compareWeight(dino)}
        <br>${this.comparePlace(dino)}`

    }
}

let dinosaurs = [];

function fillCell(dino, information) {
    const cell = document.createElement('td');
    cell.innerHTML = `<h3>${dino.getTitle()}</h3`;
    const img = document.createElement('img');
    img.src = dino.getImagePath();
    img.alt = `An image of ${dino.name}`
    img.style.width = '50%';
    img.style.height = 'auto';  // Preserve aspect ratio
    cell.appendChild(img);
    cell.innerHTML += `<p>${information}</p>`;
    return cell;
}
fetch("./static/dino.json")
    .then(response => response.json())
    .then(dinoData => {
        dinoData.Dinos.forEach(dino => {
            if (dino.species != "Pigeon") {
                dinosaurs.push(new Dinosaur(dino));
            }
            else {
                dinosaurs.push(new Bird(dino));
            }

        });
    })
    .catch(error => console.error('Error fetching the JSON file:', error));

document.getElementById('dino-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevents the form from submitting in the traditional way

    // Extract form values
    const name = document.getElementById('name').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const residence = document.getElementById('residence').value;
    const human = new Human({ name, weight, height, residence });

    // Populate table
    // Create the table element
    const table = document.getElementById('dino-compare');
    const tbody = table.tBodies[0];
    tbody.innerHTML = '';

    // Loop to create rows and cells
    let goBack = 0;
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            let dinoIndex = (i * 3) + j - goBack;
            let thisDino = dinosaurs[dinoIndex];
            if ((i != 1) || (j != 1)) {
                const information = thisDino.getAFact();
                row.appendChild(fillCell(thisDino, information)); 
            }
            else {
                goBack = 1;
                const randomNumber = Math.floor(Math.random() * 9);
                const information = human.getInfo(dinosaurs[randomNumber]);
                row.appendChild(fillCell(human, information));
            }
        }
        tbody.appendChild(row);
    }

    // Show table and hide form
    document.getElementById('tableContainer').style.display = 'block';
    document.getElementById('form-div').style.display = 'none';
});


document.getElementById('showFormBtn').addEventListener('click', function() {
    const formDiv = document.getElementById('form-div');
    if (formDiv.style.display === 'none' || formDiv.style.display === '') {
        formDiv.style.display = 'block';
        document.getElementById('tableContainer').style.display = 'none';
    } else {
        formDiv.style.display = 'none';
        document.getElementById('tableContainer').style.display = 'block';
    }
});