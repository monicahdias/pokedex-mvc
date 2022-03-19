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
    nome: "Bulbasaur",
    descricao:
      "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    tipo: "grass",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
  },
  {
    id: 2,
    nome: "Charmander",
    descricao:
      "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    tipo: "fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
  },
  {
    id: 3,
    nome: "Squirtle",
    descricao:
      "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    tipo: "water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
  },
  {
    id: 4,
    nome: "Pikachu",
    descricao:
      "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
    tipo: "Electric",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
  },
];
let pokemon = undefined;
let nextId = 5;

//rotas

app.get("/", (req, res) => {
  res.render("index", { pokedex, pokemon });
});

app.get("/novidades", (req, res) => {
  res.render("novidades")
});

app.get("/musicas", (req, res) => {
  res.render("musicas")
});

app.post("/cadastro", (req, res) => {
  pokemon = req.body;
  pokemon.id = nextId++;
  pokedex.push(pokemon);
  pokemon = undefined;
  res.redirect("/#cards");
});

app.get("/detalhes/(:id)?", (req, res) => {
  const idPokemon = +req.params.id;
  pokemon = pokedex.find(pokemon =>pokemon.id==idPokemon);
  res.render("cadastro", { Pokemon: pokemon, Pokedex: pokedex });
});

app.post("/atualizar/:id", (req, res) => {
  const id = +req.params.id;
  const newPokemon = req.body;
  newPokemon.id = id;
  pokedex[id] = newPokemon;
  pokemon = undefined;
  res.redirect("/#cards");
});

app.get("/deletar/:id", (req, res) => {
  const id = +req.params.id;
  delete pokedex[id];
  pokemon = undefined;
  res.redirect("/#cards");
});

app.listen(port, () =>
  console.log(`servidor rodando em: http://localhost:${port}`)
);
