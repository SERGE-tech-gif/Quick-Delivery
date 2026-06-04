// On attend que la page soit complètement chargée
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sélection du bouton d'inscription sur l'écran d'accueil
    const btnInscription = document.querySelector(".btn-nav.btn-inscription");
    
    // 2. Écoute du clic sur ce bouton
    if (btnInscription) {
        btnInscription.addEventListener("click", () => {
            // Redirection vers la page d'inscription
            window.location.href = "inscription.html";
        });
    }
});
// On cible le formulaire d'inscription
const signupForm = document.querySelector(".signup-form");

if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Bloque le rechargement de la page
        
        // Récupération simplifiée et sécurisée grâce aux attributs 'name'
        const fullName = signupForm.querySelector("input[name='fullName']").value;
        const nickname = signupForm.querySelector("input[name='nickname']").value;
        const dob = signupForm.querySelector("input[name='dob']").value;
        const email = signupForm.querySelector("input[name='email']").value;
        const password = signupForm.querySelector("input[name='password']").value;

        const donneesUtilisateur = { fullName, nickname, dob, email, password };

        // Envoi au serveur Backend
        fetch('http://localhost:3000/api/inscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donneesUtilisateur)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Stockage du pseudo pour la page de la carte
                sessionStorage.setItem("userNickname", nickname);
                
                // Alerte de confirmation reçue depuis le serveur
                alert(data.message);
                
                // Redirection finale vers la carte
                window.location.href = "carte.html";
            } else {
                alert("Erreur retournée par le serveur : " + data.message);
            }
        })
        .catch(error => {
            console.error("Erreur de communication :", error);
            alert("Impossible de joindre le serveur.");
        });
    });
    // Écoute du clic sur le bouton "Continue" de la carte
document.getElementById("btn-valider-commande").addEventListener("click", () => {
    const pseudoStocke = sessionStorage.getItem("userNickname") || "Client Anonyme";
    const adresseTexte = document.querySelector(".address-text").textContent; // Récupère "Bepanda, Douala"

    // Envoi des infos de livraison à notre serveur Backend
   fetch('http://localhost:3000/api/inscription', { ... })
// ou
axios.post('http://localhost:3000/api/nouvelle-commande', { ... })
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            adresse: adresseTexte,
            pseudo: pseudoStocke
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Super ! " + data.message);
            // Ici tu pourras rediriger vers un écran de remerciement ou de suivi
        } else {
            alert("Erreur : " + data.message);
        }
    })
    .catch(err => {
        console.error(err);
        alert("Impossible de joindre le serveur pour valider la commande.");
    });
});
}