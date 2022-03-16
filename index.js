const express = require("express");
const app = express();
const path = require("path");

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

//rotas
app.get("/", (req, res) => {
  res.render("index", { pokedex });
});

app.post("/cadastro", (req, res) => {
  const pokemon = req.body;
  pokedex.push(pokemon)
  
  res.redirect("/");
});

app.listen(3000, () =>
  console.log(`servidor rodando em: http://localhost:3000`)
);
