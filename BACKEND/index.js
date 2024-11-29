// Définir l'emplacement des images
const IMAGES_SRC = "./FILES/images";
// Définir un port
const PORT = 5001;
// ************************************************
// Lancer un serveur express sur un port défini
const fs = require('fs');
// npm install express
const express = require('express');
const app = express();
// Lancement du serveur et attendre
app.listen(
    PORT,
    '0.0.0.0',
    () => {
        console.log('Server Pokedex is listening on ' + PORT);
    }
)

// Initialisation de la route '/' par la méthode GET
app.get('/', (req, res) => {
    // Lecture du fichier
    const data = fs.readFileSync('./DATA/pokedex.json')
    // Parse du doc JSON
    const pokedexAll = JSON.parse(data);
    // Création d'une réponse en JSON qui contient pokedexAll
    res.send(pokedexAll)
})


// Initialisation de la route '/hasard' par la méthode GET
// Cette route me renvoie les informations d'un pokemon au hasard
app.get('/hasard', (req, res) => {
    // Lecture du fichier
    const dataHasard = fs.readFileSync('./DATA/pokedex.json')

    // Parse du doc JSON
    const pokedexAll = JSON.parse(dataHasard);

    // Je souhaite récupérer le numéro du dernier index (max)
    const hasard = Math.floor(Math.random()*pokedexAll.length);

    // Récupérer le pokémon correspondant au numéro choisi
    const pokemonHasard = pokedexAll[hasard];

    // Envoi de la réponse
    res.send(pokemonHasard)

})

// Initialisation de la route '/:id' par la méthode GET
// Cette route me renvoie les informations d'un pokemon au hasard
app.get('/pokemon/:id(\\d+)', (req, res) => {
    // Lecture du fichier
    const dataId = fs.readFileSync('./DATA/pokedex.json');
    // Parse du doc JSON
    const pokedexAll = JSON.parse(dataId);

    // Récupération de l'ID du Pokémon depuis les paramètres de la requête
    const pokemonId = req.params.id;

    // Recherche du Pokémon correspondant à l'ID
    const pokemon = pokedexAll.find(poke => poke.id === parseInt(pokemonId));

    // Vérification si le Pokémon existe
    if (pokemon) {
        res.send(pokemon);
    } else {
        res.status(404).send({ Message: 'Pokémon non trouvé, ID non-reconnu' });
    }
});

// Initialisation de la route '/:name' par la méthode GET
// Cette route me renvoie les informations d'un pokemon au hasard
app.get('/pokemon/:name(\\w+)', (req, res) => {
    // Lecture du fichier
    const dataName = fs.readFileSync('./DATA/pokedex.json');
    // Parse du doc JSON
    const pokedexAll = JSON.parse(dataName);

    // Récupération du nom du Pokémon depuis les paramètres de la requête
    const pokemonName = req.params.name;

    // Recherche du Pokémon correspondant au nom
    const pokemon = pokedexAll.find(poke => poke.name.french.toLowerCase() === (pokemonName));

    // Vérification si le Pokémon existe
    if (pokemon) {
        res.send(pokemon);
    } else {
        res.status(404).send({ Message: 'Pokémon non trouvé, nom invalide, essaye peut être avec une minuscule !' });
    }
});

// Initialisation de la route '/types/:type' par la méthode GET
// Cette route me renvoie les informations d'un pokemon par son type
app.get('/pokemon/types/:type(\\w+)', (req, res) => {
    // Lecture du fichier
    const dataType = fs.readFileSync('./DATA/pokedex.json');
    // Parse du doc JSON
    const pokedexAll = JSON.parse(dataType);

    // Récupération du nom du Pokémon depuis les paramètres de la requête
    const pokemonType = req.params.type.toLowerCase();

    // Filtrer les Pokémon en vérifiant que le type spécifié est présent dans le tableau `type`
    const pokemon = pokedexAll.filter(poke =>
        Array.isArray(poke.type) &&
        poke.type.some(t => t.toLowerCase() === pokemonType));

    // Vérification si le Pokémon existe
    if (pokemon) {
        res.send(pokemon);
    } else {
        res.status(404).send({ Message: 'Pokémons non trouvés, type non-reconnu' });
    }
});

app.get('/pokemon/attack/:Attack(\\d+)', (req, res) => {
    // Lecture du fichier
    const dataAttack = fs.readFileSync('./DATA/pokedex.json');
    // Parse du doc JSON
    const pokedexAll = JSON.parse(dataAttack);

    // Récupération du niveau d'attaque depuis les paramètres de la requête
    const attackValue = parseInt(req.params.Attack, 10);

    // Filtrer les Pokémon en vérifiant que l'attaque correspond à la valeur spécifiée
    const pokemon = pokedexAll.filter(poke => poke.base.Attack >= attackValue);

    // Vérification si des Pokémon existent avec cette attaque
    if (pokemon.length > 0) {
        res.send(pokemon);
    } else {
        res.status(404).send({ Message: 'Pokémons non trouvés, dégâts non-reconnus' });
    }
});