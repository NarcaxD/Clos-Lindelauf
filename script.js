/*
  ÉTAPE 3 — LES INTERACTIONS (JavaScript)
  Le HTML = le contenu, le CSS = l'apparence, le JavaScript = ce qui RÉAGIT
  quand on clique. Ce fichier est utilisé par index.html ET nl.html.
*/

// 1. OUVRIR UNE FICHE DE VIN
// On cherche tous les boutons qui ont un attribut data-fiche...
document.querySelectorAll('[data-fiche]').forEach(function (bouton) {
  // ...et pour chacun, on dit quoi faire au clic :
  bouton.addEventListener('click', function () {
    var idFiche = bouton.dataset.fiche;            // ex. "fiche-aligote"
    document.getElementById(idFiche).showModal();  // ouvre la fenêtre
  });
});

// 2. FERMER UNE FICHE
document.querySelectorAll('dialog.fiche').forEach(function (fiche) {
  // avec la croix ×
  fiche.querySelector('.fermer').addEventListener('click', function () {
    fiche.close();
  });
  // ou en cliquant dans la zone sombre autour de la fenêtre
  fiche.addEventListener('click', function (evenement) {
    if (evenement.target === fiche) fiche.close();
  });
});

// 3. PRÉ-REMPLIR LE FORMULAIRE
// Les boutons "Commander…" qui ont un attribut data-commande écrivent ce texte
// dans la case de commande, puis la page descend jusqu'au formulaire.
document.querySelectorAll('[data-commande]').forEach(function (bouton) {
  bouton.addEventListener('click', function () {
    var fiche = bouton.closest('dialog');
    if (fiche) fiche.close();                      // on ferme la fiche si besoin

    var champ = document.getElementById('champ-commande');
    var texte = bouton.dataset.commande;
    // on ajoute le texte à la suite de ce qui est déjà écrit
    champ.value = champ.value ? champ.value + '\n' + texte : texte;
    // on place le curseur dans la case, pour taper directement la quantité
    setTimeout(function () { champ.focus(); }, 600);
  });
});

// 4. MODE DÉMO DU FORMULAIRE
// Tant que Formspree n'est pas branché (l'adresse contient encore VOTRE_ID),
// on n'envoie rien : on affiche juste un message. Ce bloc deviendra inutile
// une fois le vrai identifiant Formspree mis dans le HTML.
var formulaire = document.querySelector('.formulaire');
if (formulaire && formulaire.action.indexOf('VOTRE_ID') !== -1) {
  formulaire.addEventListener('submit', function (evenement) {
    evenement.preventDefault();   // empêche l'envoi
    var nl = document.documentElement.lang.indexOf('nl') === 0;
    alert(nl
      ? 'Demoversie: het formulier wordt binnenkort gekoppeld. Uw bestelling is niet verzonden.'
      : 'Version de démonstration : le formulaire sera bientôt branché. Votre commande n\'a pas été envoyée.');
  });
}
