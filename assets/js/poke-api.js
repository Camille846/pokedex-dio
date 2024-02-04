
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    const abilities = pokeDetail.abilities.map((abilitySlot)=>abilitySlot.ability.name)
    const [ability] = abilities
    pokemon.ability=ability
    pokemon.experience=pokeDetail.base_experience
    pokemon.height=pokeDetail.height
    pokemon.weight=pokeDetail.weight

    return pokemon
}

pokeApi.getDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokeDetail)=> convertPokeApiDetailToPokemon(pokeDetail))
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getDetails))
        .then((detailRequests) => Promise.all(detailRequests))

        .catch((error)=> console.log(error))
}