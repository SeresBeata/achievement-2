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
            //console.log(Object.keys(pokemonItem)[0]);
            //Validate whether all Object.keys() of the parameter are equal to the specific expected keys
            if(Object.keys(pokemonItem)[0] === 'name' && Object.keys(pokemonItem)[1] === 'height' && Object.keys(pokemonItem)[2] === 'type'){
                pokemonList.push(pokemonItem);
            }else{
                console.log('Incorrect key of object');
            }
        }else{
            console.log('Incorrect type of data');
        }
    }
    }
    }

})();
