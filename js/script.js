//Create IIFE to avoid accidentally accessing the global state of `pokemonList` array
let pokemonRepository = (function(){
    // Create `pokemonList` Array with 4 Pokémon objects through `let` keyword
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 2.04,
            type: ['grass', 'poisen']
        },
        {
            name: 'Pikachu',
            height: 1.04,
            type: ['electric']
        },
        {
            name: 'Horsea',
            height: 1.04,
            type: ['water']
        },
        {
            name: 'Vaporeon',
            height: 3.03,
            type: ['water']
        }
    ];

    //Create public function in order to add a single item to the `pokemonList` array through push() method
    function add(pokemonItem){
        //Validate whether a type of the parameter is an object
        if (typeof pokemonItem === "object"){
            const expectedKeys = ['name', 'height', 'type'];
            let checkKey = true;
            // Validate whether all expected keys are present in the object using forEach loop
            expectedKeys.forEach(expectedKey => {
                if(!Object.keys(pokemonItem).includes(expectedKey)){
                    checkKey = false;
                    console.log('Incorrect key of object');
                    return;
                }
            });
            if(checkKey){
                pokemonList.push(pokemonItem);
            }
        }else{
            console.log('Incorrect type of data');
        }
    }

    //Create public function in order to return all items of `pokemonList` array
    function getAll(){
        return pokemonList;
    }

    //Create public function in order to find specific Pokémon only by name through filter() method
    function findOne(pokemonName){
        let resultFindOne = pokemonList.filter((pokemonItem) => pokemonItem.name === pokemonName);
        console.log(resultFindOne); //Output: an array within an object of the filetered Pokémon
        //Iterate over the array of the filtered Pokémon
        resultFindOne.forEach(function(itemOfFindOne){
           console.log(itemOfFindOne.name + ': height is ' + itemOfFindOne.height + ', type: ' + itemOfFindOne.type);
        });
    }

    //Public functions assigned as keys of IIFE
    return {
        add : add,
        getAll : getAll,
        findOne : findOne
    }

})();
//Find item in `pokmonList` array
pokemonRepository.findOne('Pikachu');
//Add new Object as item to `pokemonList` array
pokemonRepository.add({name: 'Eevee', height: 1.00, type:['normal']});
//Print all `pokemonList` array in console
console.log(pokemonRepository.getAll());

//Create `forEach();` function to iterate over the items in `pokemonList` array in order to display the details of each one as a <li> on index.html 
pokemonRepository.getAll().forEach(function(pokemon){
    //Create a variable for <ul> element
    let uListOfPokemons = document.querySelector('.page-main__pokemon-list');

    console.log(pokemon.name + ': ' + pokemon.height + ' ' + pokemon.type)
});
