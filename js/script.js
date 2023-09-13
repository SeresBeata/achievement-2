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

        //Create <li>, btn and <img> elements 
        let uListItem = document.createElement('li'); 
        let listBtn = document.createElement('button');
        let imgPreview = document.createElement('img');

        //Set the content of btn element and add a class
        listBtn.innerText = pokemon.name;
        listBtn.classList.add('pokemon-list__item');

        //Set the content of the <img> element
        imgPreview.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

        //Append img to btn, btn to <li> and <li> to <ul>
        listBtn.appendChild(imgPreview);
        uListItem.appendChild(listBtn);
        uListOfPokemons.appendChild(uListItem);

        //Call btnListener() function
        btnListener(listBtn, pokemon);

        //Create <option>, set its value to the name of Pokémon, and append to datalist for combo box to search for Pokémon
        let nameList = document.getElementById('datalistOptions');
        let option = document.createElement('option');
        option.value = pokemon.name;
        nameList.appendChild(option);

        //Set the id attribute of the Pokémon buttons to match the index of Pokémon
        listBtn.setAttribute('id', pokemon.id);
    }

    //Create a function to either scroll to the selected Pokémon or alert the user about invalid Pokémon input
    function searchOne(pokemonName){
        let resultFindOne = '';
        resultFindOne = pokemonList.filter((pokemonItem) => pokemonItem.name === pokemonName);
        // console.log(resultFindOne); //Output: an array within an object of the filetered Pokémon
        //Iterate over the array of the filtered Pokémon
        resultFindOne.forEach(function(itemOfFindOne){
            // console.log(itemOfFindOne.name + ': height is ' + itemOfFindOne.height + ', type: ' + itemOfFindOne.type + ', index:' + itemOfFindOne.id);

            //Use the "result" <a> tag to scroll to the selected Pokémon
            let result = document.getElementById('result');
            result.href = `#${itemOfFindOne.id}`;
            result.classList.remove('hidden_result');
            result.addEventListener('click', function(){
                result.classList.add('hidden_result');
            });
        });
        // console.log(resultFindOne);
        // console.log(resultFindOne.length);
        if(resultFindOne.length === 0){
            alert('Sorry, we have no such a Pokémon! Try again!');
        }
    }

    //Create public function to search for different Pokémon at the search bar
    function clickSearch(){
        let searchBtn = document.getElementById('searchBtn');
        searchBtn.addEventListener("click", function(){
            //Let's empty the href of the result <a> first
            let result = document.getElementById('result');
            result.href = '';
            //Get the value of the input
            let searchInput = document.getElementById('exampleDataList');
            // console.log(searchInput.value)
            //Call the searchOne() function and use the vaule of the input as argument
            searchOne(searchInput.value);
        })
    }

    //Create function to print details of single Pokémon item on console
    function showDetails(pokemon){
        loadDetails(pokemon).then(function () {
            //Test through print data on the console
            console.log(pokemon);
            console.log(pokemon.imageUrl);
            console.log(pokemon.name + ' ' + pokemon.height + ' ' + pokemon.types[0].type.name);

            if(pokemon.types.length > 1){
                console.log(pokemon.types[1].type.name);
            }
        
            //Create modal for Pokémon-------------------------------------------------------------
            //Create variable for the <div> with the id of 'moddal-container'
            let modalContainer = document.querySelector('#my-modal-container');

            // Clear all existing modal content
            modalContainer.innerHTML = '';

            //Create 'div' element and add the .modal class to it
            let modal = document.createElement('div');
            modal.classList.add('my-modal');

            // Add the new modal content
            //Add close btn
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('my-modal-close');
            closeButtonElement.innerText = 'X';
            //Use event listener to call hideModal() function in case of click event on close btn
            closeButtonElement.addEventListener('click', hideModal);

            //Add heading
            let titleElement = document.createElement('h1');
            titleElement.innerText = pokemon.name;

            let contentElementHeight = document.createElement('h3');
            contentElementHeight.innerText = 'Height: ';

            let contentHeightValue = document.createElement('span');
            contentHeightValue.innerText = `${pokemon.height / 10} m`;

            let contentElementType0 = document.createElement('h3');
            contentElementType0.innerText = 'Type:';

            //Add paragraph
            let contentElementType1 = document.createElement('p');
            contentElementType1.innerText = pokemon.types[0].type.name;

            let contentElementType2 = document.createElement('p');
            if(pokemon.types.length > 1){
                contentElementType2.innerText = pokemon.types[1].type.name;
            }else{
                contentElementType2.innerText = '';
            }

            //Add img
            let contentElementImg = document.createElement('img');
            contentElementImg.src = pokemon.imageUrl;

            let contentElementImg2 = document.createElement('img');
            contentElementImg2.src = pokemon.imageUrlBack;

            //Create <div> elements for flip card animation
            let contentElementCard1 = document.createElement('div');
            contentElementCard1.classList.add('scene');
            contentElementCard1.classList.add('scene--card');

            let contentElementCard2 = document.createElement('div');
            contentElementCard2.classList.add('card');

            let contentElementCard3 = document.createElement('div');
            contentElementCard3.classList.add('card__face');
            contentElementCard3.classList.add('card__face--front');

            let contentElementCard4 = document.createElement('div');
            contentElementCard4.classList.add('card__face');
            contentElementCard4.classList.add('card__face--back');

            //Append the <img> and <div> elements for flip animation
            contentElementCard3.appendChild(contentElementImg);
            contentElementCard4.appendChild(contentElementImg2);
            contentElementCard2.appendChild(contentElementCard3);
            contentElementCard2.appendChild(contentElementCard4);
            contentElementCard1.appendChild(contentElementCard2);

            //Append created elements to the created 'div' with the 'modal' class 
            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(contentElementHeight);
            modal.appendChild(contentHeightValue);
            modal.appendChild(contentElementType0);
            modal.appendChild(contentElementType1);
            modal.appendChild(contentElementType2);
            modal.appendChild(contentElementCard1);
            //Append the created 'div' with the 'modal' class to the '#modal-container' <div> element
            modalContainer.appendChild(modal);

            //Add 'is-visible' class to the '#modal-container' <div> element
            modalContainer.classList.add('is-visible');

            //for the user to be able to remove the modal when the user clicks outside of the modal
            modalContainer.addEventListener('click', (e) => {
            // Since this is also triggered when clicking INSIDE the modal
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
            });

            //Call the flipCard() function to "flip" the card inside of model
            flipCard();
        });
    }

    //Create function to "flip" card inside of the modal
    function flipCard(){
        let frontCard = document.querySelector('.card');
        frontCard.addEventListener( 'click', function() {
            frontCard.classList.toggle('is-flipped');
          });
    }

    //Create function to close the modal later on
    function hideModal() {
        let modalContainer = document.querySelector('#my-modal-container');
        //Remove 'is-visible' class from the '#modal-container' <div> element
        modalContainer.classList.remove('is-visible');
    }

    //Use event listener to close the modal in case of 'escape' press
    window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#my-modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

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
                json.results.forEach(function (item, index) {
                    let pokemon = {
                        id: index + 1,
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
                item.imageUrl = details.sprites.other["official-artwork"].front_default;
                item.imageUrlBack = details.sprites.other["official-artwork"].front_shiny;
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
    }

    //Create function to remove the loading message, if data has been loaded
    function hideLoadingMessage(){
        console.log('Data is loaded. Here comes the result');
    }

    //Public functions assigned as keys of IIFE
    return {
        add : add,
        getAll : getAll,
        findOne : findOne,
        addListItem : addListItem,
        loadList : loadList,
        loadDetails : loadDetails,
        clickSearch : clickSearch
    }

})();

//Create `forEach` to iterate over the fetched Pokémon items from the API and display them
pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});