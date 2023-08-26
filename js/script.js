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

    }

})();
