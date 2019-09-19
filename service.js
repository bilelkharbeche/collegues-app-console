// création d'une requête avec activation de suivi de Cookies.
const request = require('request-promise-native').defaults({ jar: true });

class Service {
    constructor() { }

    auth(email, motDePasse) {
        return request('http://localhost:8080/auth',
            {
                method: 'POST',
                json: true,
                body: { email, motDePasse }
            });
    }

    createColl(nom, prenoms, email, dateDeNaissance, photoUrl, motDePasse) {
        return request('http://localhost:8080/collegues',
            {
                method: 'POST',
                json: true,
                body: { nom, prenoms, email, dateDeNaissance, photoUrl, motDePasse }
            });
    }
    
        findColl(nom) {
            return request(`http://localhost:8080/collegues?nom=${nom}`, { json: true })
                .then(tabMatricules => {
                    return Promise.all(tabMatricules
                        .map(matricule => `http://localhost:8080/collegues/${matricule}`)
                        .map(url => request(url, { json: true })));
                });
        }
    }

module.exports = { Service }