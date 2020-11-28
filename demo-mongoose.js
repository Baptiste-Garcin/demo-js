const mongoose = require('mongoose');

// Ce schema est un peu plus complexe que ce que l'on a fait. J'ai pris soin de préciser des options de validation
// Tu peux voir que le username et l'email sont requis. Si tu essayes de sauvegarder en base un objet qui ne contient pas ces infos
// une erreur sera levée.
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // Unique ici s'assure que l'email est unique en base grâce à un index, ce n'est pas une sécurité totale et surtout
    // c'est mongo qui se charge de cela et pas mongoose. C'est vraiment le dernier filet.
    unique: true,
    validate: {
      // Ici, c'est la partie de mongoose qui s'assure de l'unicité de l'email.
      // Lorsque j'utilise user.save(), cette fonction est appelée avant que l'objet soit envoyé en base
      // Ce que ça fait, c'est que ça va chercher le model 'user' et ça l'utilise pour vérifier qu'aucun user ne possède cet email en db.
      // Le validator doit retourner un booléen.
      async validator(email) {
        const isNonUniqueEmail = await mongoose.model('user').exists({ email });
        return !isNonUniqueEmail;
      },
      message: 'nonUniqEmail',
    },
  },
  // Ces deux champs là sont optionnels et prennent par défaut la valeur du jour
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

// Ici on crée la class à partir du schema. Ce 'user' est le nom dont je me sers pour accéder au model dans le validator.
// Si je fais comme ça, c'est parce que dans le schema, la class n'existe pas encore, c'est un peu bizarre mais mongoose a un coté un peu étrange
const User = mongoose.model('user', userSchema);

// C'est l'ancienne version de import/export qui est encore valide en Node pour encore quelques années
module.exports = User;
