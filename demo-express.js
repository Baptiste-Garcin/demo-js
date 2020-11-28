const express = require("express");

const User = require('../Model/User')
const router = express.Router();

// Ici c'est un exemple basic de route Express
router.post("/", async function(req, res) {
  // je récupère les données de la requête qui vient du client.
  // Normalement tu valides que les données envoyées sont valide
  // C'est à dire qu'il y a bien un email et un password mais bon, il y a des solutions, on en parlera mardi
  const body = req.body;

  // Ici, j'instancie la class avec les données du client
  const user = new User(body)

  // on envoie user en base de donnée
  await user.save();

  // Ici on répond avec un JSON
  res.json({ success: true });
});

// C'est un exemple de route de GET
// On va récupérer un user par rapport à son id unique (générée par mongo)
// /:id, ça veut dire qu'un paramètre d'url est attendu
// exemple localhost:3000/123
// 123 est un paramètre d'url
router.get('/:id', async function(req, res) {
  // ici je récupère l'id passée dans l'URL
  const id = req.params.id;

  // Là, je fais une requête en db
  const user = await User.find({ id: id });

  // Et là, je retourne la valeur
  // ici { user } équivaut à { user: user }
  res.json({ user });
});
