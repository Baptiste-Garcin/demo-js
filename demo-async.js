// Exemple de fonction asynchrone. Celle-ci se sert de setTimeout pour retourner 'test' après 100 millisecondes.
const asyncFunc = function() {
  let res;
  setTimeout(() => {
    console.log('fromAsyncFunc'); // 3
    res = 'test';
  }, 100);
  return res;
}

// Ici, on appelle la fonction asynchrone et on affiche le résultat.
// On constate que le résultat au moment de son affichage n'est pas défini
// et que le console.log('fromAsyncFunc') est déclenché après console.log('from Outside')
const main = function() {
  const result = asyncFunc();
  console.log(result); // 1
  console.log('from Outside') // 2
}

main();

// Pour régler ce problème, il existe plusieurs solutions.
// La plus ancienne est celle du 'callback'.
// Une fonction callback est une fonction passée en paramètre à une autre fonction.
// Elle est ensuite appelée par sa fonction "parente"

// Ici, on a modifié la fonction asynchrone qui nous sert d'exemple.
// Elle prend maintenant un argument "callback" de type fonction comme paramètre.
// Celle-ci est appelée une fois que la fonction asynchrone terminée.
// Cette technique pose un problème de maintenabilité. En effet, on arrive facilement à des fonctions
// appelant des fonctions appelant des fonctions…
const asyncFunc = function(callback) {
  setTimeout(() => {
    console.log('fromAsyncFunc');
    // ici, la fonction callback passée en argument est appelée après 100 millisecondes
    callback({ res: 'bar' });
  }, 100);
}


const main = function() {
// Ici, on passe une fonction comme paramètre à "asyncFunc".
// Par convention, une fonction callback prend une potentielle erreur en premier paramètre
// et le retour de la fonction parente comme deuxième paramètre.
  asyncFunc(function (err, res) {
    // une fois la fonction callback appelée dans asyncFunc, le code contenu ici est executé.
    if (err) {
      // Handle Error
    }

    console.log({ res });
    console.log('from Outside')
  });
}

main();

// Une technique un peu plus moderne repose sur l'utilisation de l'objet Promise.
// C'est un objet qui a plusieurs états: Pending, fulfilled, rejected
// Il emporte 2 méthodes, then() qui est appelé quand la promesse passe en "fulfilled"
// et catch() qui est appelée en cas d'erreur.

// On a modifié la fonction asyncFunc. Celle-ci retourne une promesse qui sera résolue après 100 millisecondes
// On définit rarement une promesse, on utilise plutôt des fonctions de librairies qui retournent des promesses.
const asyncFunc = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fromAsyncFunc');
      reject({ foo: 'bar' })
    }, 100);
  })
}

const main = function() {
  // on récupère la promesse retournée par la fonction asyncFunc
  const promise = asyncFunc();
    // On consomme ici la promesse avec la fonction then (qui prend comme paramètre une fonction)
    // et on récupère une éventuelle promesse avec la fonction catch
    promise.then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log('err');
      console.log(err);
    })
}

// Récément, une simplification de cette syntaxe a été ajoutée au JavaScript et celle-ci tend à devenir la norme

// On pourrait réécrire la fonction main de cette façon.
// On spécifie "async" au moment de la définition de la fonction
// Cela nous permet d'utiliser le mot clé "await" à l'intérieur de celle-ci
// Cela nous permet de consommer la promesse avec un code qui ressemble à du code synchrone
const main = async function() {
  let data;
  try {
    data = await asyncFunc();
    console.log(data);
  } catch (err) {
    console.error(err);
  }

  console.log('fromOutside');
}

main()
