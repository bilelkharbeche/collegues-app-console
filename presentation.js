// récupération du module `readline`
const readline = require('readline');
const { Service } = require('./service.js');

const service = new Service();

// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const start = () => {

    rl.question('Veuillez saisir votre email\n', (saisieMail) => {
        rl.question('Veuillez saisir votre mot de passe\n', (saisieMdp) => {

            service.auth(saisieMail, saisieMdp)
                .then(() => {
                    console.log('Vous êtes bien connecté');

                    const menuFonction = () => {
                        const menu = '1. Rechercher un collègue par nom \n2. Créer un collègue \n99. Sortir \n';
                        // récupération de la saisie utilisateur
                        rl.question(menu, (saisie) => {

                            if (saisie === '1') {
                                rl.question('Veuillez saisir un nom :\n', (saisieNom) => {

                                    service.findColl(saisieNom)
                                        .then((tabColl) => {
                                            tabColl.forEach(coll => console.log(`${coll.nom} ${coll.prenoms} (${coll.dateDeNaissance})`));
                                            menuFonction();
                                        });
                                });
                            }
                            if (saisie === '2') {
                                rl.question('Nom : \n', (nom) => {
                                    rl.question('Prenoms : \n', (prenoms) => {
                                        rl.question('Email : \n', (email) => {
                                            rl.question('Date de naissance : \n', (dateDeNaissance) => {
                                                rl.question('Url de votre photo : \n', (photoUrl) => {
                                                    rl.question('Mot de passe : \n', (motDePasse) => {
                                                        service.createColl(nom, prenoms, email, dateDeNaissance, photoUrl, motDePasse)
                                                            .then((newColl) => {
                                                                console.log(newColl);
                                                                menuFonction();
                                                            }, (err) => {
                                                                console.log("Erreur de saisie lors de la création du collègue");
                                                                menuFonction();
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

                    }

                    menuFonction();
                },
                    (err) => {
                        console.log('Erreur d\'identifiant');
                        start();
                    });
        })
    })
}

exports.start = start;



