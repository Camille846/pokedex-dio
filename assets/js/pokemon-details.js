const pokemonDetailslist = document.getElementById('pokemonsDetailslist');
const loadDetails = document.getElementById('loadMoreDetails');
const back = document.getElementById('back');
const maxRecord = 200;
const limit = 3;
let offset = 0;


function loadPokemonDetail(offset,limit){
    pokeApi.getPokemons(offset,limit).then((pokemons =[])=> {
        pokemonDetailslist.innerHTML+=pokemons.map((pokemon)=>
        `
        <div class="pokemonDetails ${pokemon.type}">
            <li class="pokemonListDetails ${pokemon.type}">
                <span class="number">#${pokemon.number}</span><br>
                <span class="name">${pokemon.name}</span>
        
                <div class="category">
                    <ol class="types">
                        ${pokemon.types.map((type)=> `<li class="typePokemon">${type}</li>`).join('')}    
                     
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        
    
            <div class="statisticsPokemon">
                <div class="descriptionHeader">
                    <h2>Details</h2>
                </div>
                <div class="statisticsPokemonContent">
                    <div class="description">
                        <ul class="descriptionList">
                            
                            <li>Ability:  </li>
                            <li>Experience:  </li>
                            <li>Height:  </li>
                            <li>Weight:  </li>
                            
                        </ul>
                    </div>
                    <div class="descriptionContent">
                        <ul class="descriptionList">
                            
                            <li>${pokemon.ability}</li>
                            <li>${pokemon.height}</li>
                            <li>${pokemon.weight}</li>
                            <li>${pokemon.experience}</li>
                    
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `).join('');})
}

loadPokemonDetail(offset,limit)

loadDetails.addEventListener('click',() => {

    offset += limit;
    const qtdRecordNextPage = offset + limit;

    if(qtdRecordNextPage>=maxRecord){
        const newLimit = maxRecord - offset;
        loadPokemonDetail(offset,limit)
        buttonLoadMore.parentElement.removeChild(loadDetails)

    } else{
        loadPokemonDetail(offset,limit)
    }
    
})

back.addEventListener('click',()=>{
    window.location='index.html'
})