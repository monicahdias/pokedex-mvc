const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const pokedex = [
  {
    id: 1,
    nome: "Ho-Oh",
    descricao:
      "Ho-Oh's feathers glow in seven colors depending on the angle at which they are struck by light. These feathers are said to bring happiness to the bearers. This Pokémon is said to live at the foot of a rainbow.",
    tipo: "Fire | Flying",
    altura: "3.8 m",
    peso: "199.0 kg",
    categoria: "Rainbow",
    habilidade: "Pressure",
    fraquezas: "Water | Electric | Rock",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/250.png",
  },
  {
    id: 2,
    nome: "Moltres",
    descricao:
      "It's one of the legendary bird Pokémon. When Moltres flaps its flaming wings, they glimmer with a dazzling red glow.",
    tipo: "Fire | Flying",
    altura: "2.0 m",
    peso: "60.0 kg",
    categoria: "Flame",
    habilidade: "Pressure",
    fraquezas: "Water | Electric | Rock",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/146.png",
  },
  {
    id: 3,
    nome: "Zapdos",
    descricao:
      "This Pokémon has complete control over electricity. There are tales of Zapdos nesting in the dark depths of pitch-black thunderclouds.",
    tipo: "Electric | Flying",
    altura: "1.6 m",
    peso: "52.6 kg",
    categoria: "Electric",
    habilidade: "Pressure",
    fraquezas: "Ice | Rock",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/145.png",
  },
  {
    id: 4,
    nome: "Articuno",
    descricao:
      "It's said that this Pokémon's beautiful blue wings are made of ice. Articuno flies over snowy mountains, its long tail fluttering along behind it.",
    tipo: "Ice | Flying",
    altura: "1.7 m",
    peso: "54.4 kg",
    categoria: "Freeze",
    habilidade: "Pressure",
    fraquezas: "Steel | Fire | Electric | Rock",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/144.png",
  },
];
let pokemon = undefined;
let nextId = 5;

//rotas

app.get("/", (req, res) => {
  res.render("index", { pokedex, pokemon });
});

app.get("/curiosidade", (req, res) => {
  res.render("curiosidade");
});

app.post("/formulario", (req, res) => {
  pokemon = req.body;
  pokemon.id = nextId;
  nextId++
  pokedex.push(pokemon);
  pokemon = undefined;
  res.redirect("/#cards");
});

app.get("/cadastro/(:id)?", (req, res) => {
  if(!isNaN(+req.params.id)){
  const idPokemon = +req.params.id;
  pokemon = pokedex.find((pokemon) => pokemon.id == idPokemon);
  res.render("formulario", { Pokemon: pokemon, Pokedex: pokedex });
  }
  res.render("formulario", {Pokemon: pokemon, Pokedex: pokedex});
});

app.get("/detalhes/:id", (req, res) => {
  const index = req.params.id;
  const pokemons = pokedex[index];
  res.render("detalhes", { pokemon: pokemons });
});

app.post("/atualizar/:id", (req, res) => {
  const index = +req.params.id;
  const newPokemon = req.body;
  newPokemon.id = pokedex[index].id;
  pokedex[index] = newPokemon;
  pokemon = undefined;
  res.redirect("/#cards");
});

app.get("/deletar/:id", (req, res) => {
  const index = +req.params.id;
  pokedex.splice(index, 1)
  console.log(pokedex)
  pokemon = undefined;
  res.redirect("/#cards");
});

app.listen(port, () =>
  console.log(`servidor rodando em: http://localhost:${port}`)
);