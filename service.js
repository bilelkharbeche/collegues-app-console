   // création d'une requête avec activation de suivi de Cookies.
   var request = require('request').defaults({ jar: true });

var auth = function (email, motDePasse, callBackFn, errorFn) {

 

    request('http://localhost:8080/auth',
        {
            method: 'POST',
            json: true,
            body: {
                email: email,
                motDePasse: motDePasse
            }
        },
        function (err, res, result) {
            // traiter résultat de la requête
            if (res.statusCode === 200) {
                callBackFn(result);
            } else {
                errorFn('Erreur');
            }
        });
}

var createColl = function (nom, prenoms, email, dateDeNaissance, photoUrl, motDePasse, callBackFn, errorFn) {
   
    request('http://localhost:8080/collegues',{
        method: 'POST',
        json: true,
        body: {
            nom: nom,
            prenoms: prenoms,
            email: email,
            dateDeNaissance: dateDeNaissance,
            photoUrl: photoUrl,
            motDePasse: motDePasse
        }
    },
    function (err, res, result) {
        if(res.statusCode === 200) {
            callBackFn(result);
        } else {
            errorFn('Erreur lors de la création d\'un collègue');
        }
    });
}

var findColl = function (nom, callBackFn, errorFn) {
    
    request('http://localhost:8080/collegues?nom=' + nom,{
        method: 'GET',
        json: true,
        body: {

        }
    },
    function (err, res, result) {
        if (res.statusCode === 200) {
            callBackFn(result);
        } else {
            errorFn('Aucun collègue ne possède ce nom');
        }
    });
}

var findByMat = function (matricule, callBackFn, errorFn) {
 

    request('http://localhost:8080/collegues/' + matricule,{
        method: 'GET',
        json: true,
        body: {

        }
    },
    function (err, res, result) {
        if (res.statusCode === 200) {
            callBackFn(result.nom + ' ' + result.prenoms + ' (' + result.dateDeNaissance + ')');
        } else {
            errorFn('Aucun collègue ne possède ce matricule');
        }
    });
}

module.exports = {
    auth: auth,
    findColl: findColl,
    findByMat: findByMat,
    createColl: createColl
}