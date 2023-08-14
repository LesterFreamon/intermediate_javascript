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

    compareHeight(human) {
        const humanHeight = human.height;
        const dinoHeight = this.height;
        if (humanHeight > dinoHeight) {
            return `are ${humanHeight - dinoHeight} inches taller than ${this.species}`;
        } else if (humanHeight < dinoHeight) {
            return `${this.species} is ${dinoHeight - humanHeight} inches taller than you`;
        } else {
            return `are as tall as ${this.species}`;
        }
    }

    compareWeight(human) {
        const humanWeight = human.weight;
        const dinoWeight = this.weight;
        if (humanWeight > dinoWeight) {
            return `are ${humanWeight - dinoWeight} lbs heavier than ${this.species}`;
        } else if (humanWeight < dinoWeight) {
            return `${this.species} is ${dinoWeight - humanWeight} lbs heavier than you`;
        } else {
            return `weigh the same as ${this.species}`;
        }
    }

    comparePlace(human) {
        const humanPlace = human.where;
        const dinoPlace = this.where;
        if (humanPlace == dinoPlace) {
            return `And you both lived in ${humanPlace}`;
        } else {
            return `You lived in ${humanPlace} while ${this.species} lived in ${dinoPlace}`;
        }
    }

    getAFact(human) {
        const facts = [
            `This dinosaur weighed ${this.weight} lbs`,
            `It stood at a height of ${this.height} inches`,
            `It was a ${this.diet}`,
            `It lived in ${this.where}`,
            `It existed in the  ${this.when} period`,
            this.fact,
            this.compareHeight(human),
            this.compareWeight(human),
            this.comparePlace(human),

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
    constructor({ species, weight, height, diet, where, when, fact }) {
        super({ species, weight, height, diet, where, when, fact });
    }

    // You can add additional methods or override existing methods for the Bird class
    getAFact() {
        return this.fact;
    }
}

class Human {
    constructor({ name, weight, height, residence }) {
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.where = residence;
        console.log(this.name, this.weight, this.height, this.where);
    }

    getImagePath() {
        return `./static/images/human.png`;
    }

    getTitle() {
        return this.name;
    }
}

let dinosaurs = [];


function fillTitleAndImage(creature) {
    const cell = document.createElement('td');
    cell.innerHTML = `<h3>${creature.getTitle()}</h3`;
    const img = document.createElement('img');
    img.src = creature.getImagePath();
    img.alt = `An image of ${creature.getTitle()}`
    img.style.width = '50%';
    img.style.height = 'auto';  // Preserve aspect ratio
    cell.appendChild(img);
    return cell;
}

function fillCell(dino, information) {
    let cell = fillTitleAndImage(dino);
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
                const information = thisDino.getAFact(human);
                row.appendChild(fillCell(thisDino, information));
            }
            else {
                goBack = 1;
                row.appendChild(fillTitleAndImage(human));
            }
        }
        tbody.appendChild(row);
    }

    // Show table and hide form
    document.getElementById('tableContainer').style.display = 'block';
    document.getElementById('form-div').style.display = 'none';
});


document.getElementById('showFormBtn').addEventListener('click', function () {
    const formDiv = document.getElementById('form-div');
    if (formDiv.style.display === 'none' || formDiv.style.display === '') {
        formDiv.style.display = 'block';
        document.getElementById('tableContainer').style.display = 'none';
    } else {
        formDiv.style.display = 'none';
        document.getElementById('tableContainer').style.display = 'block';
    }
});