// Create `pokemonList` Array with 3 Pokémon objects through `let` keyword

let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 0.7,
        type: ['monster', 'grass']
    },
    {
        name: 'Pikachu',
        height: 0.4,
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
    //Display submitted Pokémon name on result section of index.html file
    document.querySelector('#name_key').innerText = currentPokemonName;

    //Create conditional statements to display different key-value pairs on index.html file
    //Display data of 0. object from pokemonList Array
    if (currentPokemonName == pokemonList[0].name){
        document.querySelector('#height').innerText = pokemonList[0].height;
        document.querySelector('#type_1').innerText = pokemonList[0].type[0]
        document.querySelector('#type_2').innerText = pokemonList[0].type[1]
    //Display data of 1. object from pokemonList Array
    } else if (currentPokemonName == pokemonList[1].name) {
        document.querySelector('#height').innerText = pokemonList[1].height;
        document.querySelector('#type_1').innerText = pokemonList[1].type[0]
        document.querySelector('#type_2').innerText = pokemonList[1].type[1]
    //Display data of 2. object from pokemonList Array
    }else{
        document.querySelector('#height').innerText = pokemonList[2].height;
        document.querySelector('#type_1').innerText = pokemonList[2].type[0]
        document.querySelector('#type_2').innerText = pokemonList[2].type[1]
    }
    
});

