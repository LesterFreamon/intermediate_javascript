weaponsWithNoises = [
  {name: 'Phaser', noise: 'bssszzsssss', universe: 'Star Trek'},
	{name: 'Blaster', noise: 'Pew Pew', universe: 'Star Wars'},
	{name: 'Sonic Screwdriver', noise: 'Pew Pew', universe: 'Dr. Who'},
	{name: 'Lightsaber', noise: 'Pew Pew', universe: 'Star Wars'},
	{name: 'Noisy Cricket', noise: 'Pew Pew', universe: 'Men in Black'}
]

function weaponsFromUniverse(universe) {
	// ...Your code here!
	const thisWeaponsWithNoises = weaponsWithNoises.filter(weapon => weapon.universe === universe);

	return (weaponName) => {
		const weapon = thisWeaponsWithNoises.find(thisWeaponsWithNoises => thisWeaponsWithNoises.name === weaponName)
		if (weapon) {
			console.log(`user ${weapon.name}: ${weapon.noise}`);
		}
		else {
			console.log(`user ${weaponName} is not a part of the ${universe} universe`);
		}

	}
}

// USAGE
const useStarWarsWeapon = weaponsFromUniverse('Star Wars')

useStarWarsWeapon('Blaster') // console logs 'used Blaster: Pew Pew'
useStarWarsWeapon('Noisy Cricket') // console logs 'Noisy Cricket is not a part of the Star Wars universe'