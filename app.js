const affichage = document.querySelector('.affichage');
const btns = document.querySelectorAll('button');
const input = document.querySelectorAll('input');
const infotxt = document.querySelector('.info-txt');
let fait = false;

// objet date: DEBUT
const jour = new Date();
const semaine = new Date(jour.getTime() + 7 * 24 * 60 * 60 * 1000);

let day = ('0' + semaine).slice(9,11);
let month = ('0' + (jour.getMonth() + 1)).slice(-2);
let year = jour.getFullYear();
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;
// objet date: FIN

btns.forEach(btn => {
    btn.addEventListener('click', btnaction);
})

function btnaction(e){

    let nvobj = {};

    input.forEach(input => {
        let attname = input.getAttribute('name');
        let attvaleur = attname !== "expirecookie" ? input.value : input.valueAsDate;
        nvobj[attname] = attvaleur;
    })

    let description = e.target.getAttribute('data-cookie');

    if(description === 'creer'){
        creercookie(nvobj.nomcookie, nvobj.valeurcookie, nvobj.expirecookie);
    } else if(description === 'toutafficher'){
        listecookies();
    }
}


function creercookie(name, value, exp){

    infotxt.innerText = "";

    // les deux bloque suivant permettent de supprimer la liste des cookies lors de la creation d'un nouveau cookie

    affichage.childNodes.forEach( child => {
        child.remove();
    })
    // affichage.innerText = "";

    //fin des deux bloques

    // si le cookie à un même nom
    let cookie = document.cookie.split(';');
    cookie.forEach(cookie => {
        cookie = cookie.trim();
        // console.log(cookie);
        let formatcookie = cookie.split('=');
        console.log(formatcookie);
        if(formatcookie[0] === encodeURIComponent(name)){
            fait = true;
        }
    })

    if(fait){
        infotxt.innerText = "Un cookie possède déjà ce nom!"
        fait = false;
        return;
    }

    // si le cookie n'a pas de nom
    if(name.length === 0){
        infotxt.innerText = `Impossible de définir un cookie sans nom.`;
        return;
    }

    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`;
    let info = document.createElement('li');
    info.innerText = `cookie ${name} bien ♥ crée.`;
    affichage.appendChild(info);
    setTimeout(() => {
        info.remove();
    }, 1500);
}
function listecookies(){
     let cookie = document.cookie.split(';');
     if(cookie.join() === ""){
        infotxt.innerText = "Pas de cookie à afficher";
        return;
     }
     cookie.forEach(cookie => {

        cookie = cookie.trim();
        let formatcookie = cookie.split('=');

        // console.log(formatcookie);
        infotxt.innerText = "Cliquer sur un cookie dans la liste pour le supprimer.";
        let item = document.createElement('li');

        item.innerText = `Le nom du cookie est : ${decodeURIComponent(formatcookie[0])} et la Valeur est : ${decodeURIComponent(formatcookie[1])}`;
        affichage.appendChild(item);

        // supprimer cookie
        item.addEventListener('click', () => {

            document.cookie = `${formatcookie[0]}=; expires=${new Date(0)}`
            item.innerText = `votre cookie ${formatcookie[0]} a été supprimé`;
            setTimeout(() => {
                item.remove();
            }, 1000);
        })
     })
}