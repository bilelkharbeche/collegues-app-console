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
                        const menu =
                            `\n***Veuillez choisir une action***

1. Rechercher un collègue par nom
2. Créer un collègue
99. Sortir\n`;
                        // récupération de la saisie utilisateur
                        rl.question(menu, (saisie) => {
                            if (saisie === '1') {
                                rl.question('Veuillez saisir un nom :', (saisieNom) => {
                                    service.findColl(saisieNom)
                                        .then((tabColl) => {
                                            if (tabColl == 0) {
                                                console.log('Aucun collègue ne possède ce nom');
                                                menuFonction();
                                            } else {
                                                tabColl.forEach(coll => console.log(`${coll.nom} ${coll.prenoms} (${coll.dateDeNaissance})`));
                                                menuFonction();
                                            }
                                        });
                                });
                            } else if (saisie === '2') {
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
                            } else if (saisie === '99') {
                                console.log('A+');
                                rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
                            }

                            else {
                                console.log('\nAucune commande ne correspond à celle entrée');
                                menuFonction();
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



