//Create IIFE to avoid accidentally accessing the global state of `pokemonList` array
let pokemonRepository = (function(){
    // Create an empty array, called `pokemonList`
    let pokemonList = [];
    //Create variable for PokeAPI endpoint 
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Create public function in order to add a single item to the `pokemonList` array through push() method
    function add(pokemonItem){
        //Validate whether a type of the parameter is an object
        if (typeof pokemonItem === "object"){
            const expectedKeys = ['name', 'detailsUrl'];
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

    //Create public function, where the parameter represent a single Pokémon
    function addListItem(pokemon){
        //Create a variable for <ul> element
        let uListOfPokemons = document.querySelector('.page-main__pokemon-list');

        //Create <li> and btn elements 
        let uListItem = document.createElement('li'); 
        let listBtn = document.createElement('button');

        //Set the content of btn element and add a class
        listBtn.innerText = pokemon.name;
        listBtn.classList.add('pokemon-list__item');

        //Append btn to <li> and <li> to <ul>
        uListItem.appendChild(listBtn);
        uListOfPokemons.appendChild(uListItem);

        //Call btnListener() function
        btnListener(listBtn, pokemon);
    }

    //Create function to print details of single Pokémon item on console
    function showDetails(pokemon){
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    //Create function to add eventListener() to buttons
    function btnListener(buttons, pokemon){
        buttons.addEventListener('click', function(event){
            showDetails(pokemon);
        });
    }

    //Create public function to fetch data -list of Pokémon- from the API
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl)
            .then(function (response) {
                hideLoadingMessage();
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                });
            })
            .catch(function (e) {
                hideLoadingMessage();
                console.error(e);
            });
    }

    //Create public function to fetch the details of a single Pokemon from the API
    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                hideLoadingMessage();
                return response.json();
            })
            .then(function (details) {
                // Now we add the details to the item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            })
            .catch(function (e) {
                hideLoadingMessage();
                console.error(e);
            });
    }

    //Create function to display a loading message while data is being loaded
    function showLoadingMessage(){
        console.log('Data is loading');
        let loadMessage = document.querySelector('.page-main__load-message');
        loadMessage.innerText = 'Data is loading ⏳';
    }

    //Create function to remove the loading message, if data has been loaded
    function hideLoadingMessage(){
        console.log('Data is loaded. Here comes the result');
        let loadMessage = document.querySelector('.page-main__load-message');

        setTimeout(function(){loadMessage.innerText = '';}, 500);
    }

    //Public functions assigned as keys of IIFE
    return {
        add : add,
        getAll : getAll,
        findOne : findOne,
        addListItem : addListItem,
        loadList : loadList,
        loadDetails : loadDetails
    }

})();

//Create `forEach` to iterate over the fetched Pokémon items from the API and display them
pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});