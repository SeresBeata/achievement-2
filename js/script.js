// Create `pokemonList` Array with 3 Pokémon objects through `let` keyword

let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 0.7,
        type: ['monster', 'grass']
    },
    {
        name: 'Pikachu',
        height: 0.5,
        type: ['field', 'fairy']
    },
    {
        name: 'Horsea',
        height: 0.4,
        type: ['water', 'dragon']
    }
];




//Create event listener for form submit button
 document.querySelector('button').addEventListener('click', () =>{

    //Assign submitted Pokémon name as a value to `currentPokemonName` variable
    let currentPokemonName = document.querySelector('#pokemon_name').value;

 });
