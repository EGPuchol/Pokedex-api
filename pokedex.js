//METER ANIMACIÓN PARA CUANDO SE ESTÉ CARGANDO EL CONTENIDO Y QUE NO ESTÉ LA PANTALLA EN BLANCO (CONDICIONAL "SI NO SE HA CARGADO LA PAGINA, ENTONCES...")

//////////////////////////////////////////////////////

let divGeneral = document.querySelector(".divGeneral");

const getPokemons = async () => {
  const arrayPokemon$$ = [];
  for (let i = 1; i <= 151; i++) {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i);
    const results = await response.json();
    arrayPokemon$$.push(results);
  }
  return arrayPokemon$$;
};

const mapearPokemons = (PokemonsSinMapear) => {
  const pokemonsMapeados = PokemonsSinMapear.map((pokemons) => ({
    id: pokemons.id,
    foto: pokemons.sprites.other["official-artwork"]["front_default"],
    nombre: pokemons.name,
    altura: pokemons.height,
    peso: pokemons.weight,
    tipos: pokemons.types.map(type => type.type.name),
    // if tipo 2
  }));

  return pokemonsMapeados;
};

const pintarPokemons = (pokemons) => {
  divGeneral.innerHTML=""
  for (const pokemon of pokemons) {
    // VARIABLES
    let divGeneral = document.querySelector(".divGeneral");
    let divPokemon$$ = document.createElement("div");
    let h2Name = document.createElement("h2");
    let imgPokemon = document.createElement("img");
    let pAltura = document.createElement("p");
    let pPeso = document.createElement ("p");
    let id = document.createElement("id");
    let pTipos$$ = document.createElement("div"); 
    let divPeso$$ = document.createElement ("div");

    // CLASES Y CONTENIDO
    divPokemon$$.classList.add("divPokemon");
    imgPokemon.classList.add("imgPokemon");
    h2Name.textContent = pokemon.nombre;
    h2Name.classList.add("h2name")
    imgPokemon.setAttribute("src", pokemon.foto);
    imgPokemon.setAttribute("alt", pokemon.nombre);
    pAltura.textContent = pokemon.altura/10 + " m";
    pAltura.classList.add("pAltura");
    pPeso.textContent = pokemon.peso/10 + " kg";
    pPeso.classList.add("pPeso");
    id.textContent = "#" + pokemon.id;
    id.classList.add("idPokemon");
    pTipos$$.classList.add("tipos");
    pokemon.tipos.forEach(tipo => {
      const tipoPokemons = document.createElement("span");
      tipoPokemons.textContent = tipo;
      tipoPokemons.classList.add(tipo);
      pTipos$$.appendChild(tipoPokemons);
      divPokemon$$.classList.add(`${tipo}-background`);
      imgPokemon.classList.add(`${tipo}-image-background`);
    });
    divPeso$$.classList.add("peso")
    
    // ORGANIZACIÓN
    divGeneral.appendChild(divPokemon$$);
    divPokemon$$.appendChild(id);
    divPokemon$$.appendChild(h2Name);
    divPokemon$$.appendChild(imgPokemon);
    // divPokemon$$.appendChild(pAltura);
    // divPokemon$$.appendChild(pPeso);
    divPokemon$$.appendChild(divPeso$$);
    divPeso$$.appendChild(pAltura);
    divPeso$$.appendChild(pPeso);
    divPokemon$$.appendChild(pTipos$$);

    /////////////////NO ME FUNCIONA ESTA MANERA/////////////////////////////
    // let divPokemon$$ = document.createElement("div")
    // divPokemon$$.innerHTML =
    // `
    // <h2 class="h2Name">${pokemon.nombre}</h2>
    // <img src="${pokemon.foto}" alt="${pokemon.nombre}"/>
    // <p class="pAltura">${pokemon.altura}</p>
    // `
    // divGeneral.appendChild(divPokemon$$);
    /////////////////////////////////////////////////////////////////////////
  }
};

const cogerInput = (pokemons) => {
  const input$$ = document.querySelector("input");
  input$$.addEventListener("input", () => filtrarPokemons(pokemons,input$$.value))
};

const filtrarPokemons = (arrayParaFiltrar, filtro) => {
  let PokemonsFiltrados = arrayParaFiltrar.filter((pokemons)=>pokemons.nombre.toLowerCase().includes(filtro.toLowerCase()))
  // console.log(PokemonsFiltrados);
  pintarPokemons(PokemonsFiltrados)
};

const init = async () => {
  const pokemons = await getPokemons();
  const pokemonsMapeados = mapearPokemons(pokemons);
  pintarPokemons(pokemonsMapeados);
  cogerInput(pokemonsMapeados);
};
init();

