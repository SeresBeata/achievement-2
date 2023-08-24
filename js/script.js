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
    },
    {
        name: 'Vaporeon',
        height: 1.0,
        type: ['water', '']
    }
];

//Create a variable for datalist HTML element with id `#pokemon_list`
let nameList = document.getElementById('pokemon_list');

//Use forEach(); method to populate datalist HTML element with options from `pokemonList` array
pokemonList.forEach(function(item){
    let option = document.createElement('option');
    option.value = item.name;
    nameList.appendChild(option);
 });

 //Create event listener for form submit button
 document.querySelector('button').addEventListener('click', () =>{

    //Assign submitted Pokémon name as a value to `currentPokemonName` variable
    let currentPokemonName = document.querySelector('#pokemon_name').value;

    // Create for loop for `pokemonList` Array
    for (let index = 0; index < pokemonList.length; index++) {

        //Create conditional statement to display different key-value pairs on index.html file
        if(pokemonList[index].name.includes(currentPokemonName) === true){

            //Display submitted Pokémon name on result section of index.html file
            document.querySelector('#name_key').innerText = currentPokemonName;
            //Display type of the submitted Pokémon on result section of index.html file
            document.querySelector('#type').innerText = pokemonList[index].type[0] + ', ' +pokemonList[index].type[1];
            //Create conditional statments to display different messages depending on the value of the `height`of the submitted Pokémon
            if(pokemonList[index].height >= 0.7){
                document.querySelector('#height').innerText = pokemonList[index].height + ' - It is a large Pokémon!';
            }else if (pokemonList[index].height < 0.7 && pokemonList[index].height > 0.4){
                document.querySelector('#height').innerText = pokemonList[index].height + ' - It is an average sized Pokémon!';
            }else{
                document.querySelector('#height').innerText = pokemonList[index].height + ' - It is a small Pokémon!';
            }

        }
    }

    //Use findIndex() to check, if submitted Pokémon name is exist at `pokemonList` array
    let isNotExist = pokemonList.findIndex(item => item.name === currentPokemonName)
    //If submitted pokémon name does not exist, then create pop-up message with the submitted name
    if (isNotExist === -1){
       alert('Sorry, there is no such Pokémen, as ' + currentPokemonName + '.');
       //Set the result section of index.html empty after pop-up message
       document.querySelector('#name_key').innerText = '';
       document.querySelector('#type').innerText = '';
       document.querySelector('#height').innerText = '';
    }
 });
