const UrlPokedex = 'https://pokeapi.co/api/v2/pokemon/'
const endPointDoPokemon = '${pokemon}'
const pokemonName = document.querySelector('.pokemon_name')
const PokemonNumber = document.querySelector(".pokemon_number")
const pokemonImg = document.querySelector('.pokemon_imgS')
const form = document.querySelector(".form")
const inputBusca = document.querySelector('.input_search')

const butaoAnterior = document.querySelector('.btn_prev')
const butaoNext = document.querySelector('.btn_next')
const butaoRamdon = document.querySelector('.random')
// const pokemonNotFound = document.getElementById('.notFound')
let number = 1
let ramdomNumber = Math.floor(Math.random() * 1010)


const procurarApi = async (endPointDoPokemon) => {

    const ApiResponsive = await fetch(UrlPokedex + endPointDoPokemon)
    if (ApiResponsive.status === 200) {
        const data = await ApiResponsive.json()

        return data
    }
}
const renderPokemon = async (endPointDoPokemon) => {
    pokemonName.innerHTML = 'carregando... '

    const pokemon = await procurarApi(endPointDoPokemon)
    if (pokemon) {
        pokemonImg.style.display = 'block'
        pokemonName.innerHTML = pokemon.name
        PokemonNumber.innerHTML = pokemon.id
        pokemonImg.src = pokemon.sprites.front_default
        number = pokemon.id
        form.reset()
    } else {
        pokemonName.innerHTML = 'não Encontrado '
        PokemonNumber.innerHTML = ''
        pokemonImg.style.display = 'none'
    }
}
const busca = (e) => {
    e.preventDefault()
    if (!isNaN(inputBusca.value.toLowerCase())) {
        console.log('iiiiiiiiii')
        number = parseInt(inputBusca.value.toLowerCase())
    }
    renderPokemon(inputBusca.value.toLowerCase())
}
const NextButao = () => {
    number += 1
    renderPokemon(number)
}
const AnteriorButao = () => {
    number -= 1
    renderPokemon(number)
}
const aleatorio = () => {
    number = Math.floor(Math.random() * 1010)
    renderPokemon(number)

}
form.addEventListener('submit', busca)
butaoAnterior.addEventListener('click', AnteriorButao)
butaoNext.addEventListener('click', NextButao)
butaoRamdon.addEventListener('click', aleatorio)
renderPokemon('1')
