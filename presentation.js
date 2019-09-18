// récupération du module `readline`
var readline = require('readline');
var service = require('./service.js');

// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var start = function () {

    rl.question('Veuillez saisir votre email\n', function (saisieMail) {
        rl.question('Veuillez saisir votre mot de passe\n', function (saisieMdp) {

            service.auth(saisieMail, saisieMdp, function (result) {

                var menu = '1. Rechercher un collègue par nom \n2. Créer un collègue \n99. Sortir \n';
                // récupération de la saisie utilisateur
                rl.question(menu, function (saisie) {

                    if (saisie === '1') {
                        rl.question('Veuillez saisir un nom :\n', function (saisieNom) {

                            service.findColl(saisieNom, function (resultNom) {
                                var tabMatricule = resultNom;

                                for (i = 0; i < tabMatricule.length; i++) {
                                    service.findByMat(tabMatricule[i], function (resultMat) {
                                        var infoColl = resultMat;
                                        console.log(infoColl);
                                    }, function(err){
                                        console.log(err)
                                    });
                                } 
                            });
                        });
                        start();
                    }
                    if (saisie === '2') {
                        rl.question('Nom : \n', function(nom){
                            rl.question('Prenoms : \n', function(prenoms){
                                rl.question('Email : \n', function(email){
                                    rl.question('Date de naissance : \n', function(dateDeNaissance){
                                        rl.question('Url de votre photo : \n', function(photoUrl){
                                            rl.question('Mot de passe : \n', function(motDePasse){
                                                service.createColl(nom,prenoms,email,dateDeNaissance,photoUrl,motDePasse, function(newColl){
                                                    console.log(newColl);
                                                }, function(messageErreur){
                                                    console.log(messageErreur);
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    }
                    if (saisie === '99') {
                        console.log('A+');
                        rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
                    }

                });
            },
                function (err) {
                    console.log('Erreur d\'identifiant');
                });
        })
    })
}

exports.start = start;



