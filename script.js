document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. GESTION DE LA NAVIGATION (ACCUEIL) ---
    const btnInscription = document.querySelector(".btn-inscription");
    const btnConnexion = document.querySelector(".btn-connexion");

    if (btnInscription) {
        btnInscription.addEventListener("click", () => {
            window.location.href = "inscription.html";
        });
    }

    if (btnConnexion) {
        btnConnexion.addEventListener("click", () => {
            window.location.href = "connexion.html";
        });
    }

    // --- 2. GESTION DU FORMULAIRE D'INSCRIPTION ---
    const signupForm = document.querySelector(".signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // Bloque le rechargement automatique

            const fullName = document.querySelector('input[placeholder="Full Name"]').value;
            const nickname = document.querySelector('input[placeholder="Nickname"]').value;
            const dob = document.querySelector('input[type="date"]').value;
            const email = document.querySelector('input[placeholder="Email Address"]').value;
            const password = document.querySelector('input[placeholder="Password"]').value;

            const donneesUtilisateur = { fullName, nickname, dob, email, password };

            // ATTENTION : Laisse localhost SI tu testes sur ton PC avec le serveur allumé.
            // Pour un test 100% mobile autonome, il faudra remplacer par l'URL de ton backend hébergé.
            try {
                const response = await fetch('http://localhost:3000/api/inscription', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(donneesUtilisateur)
                });

                const data = await response.json();

                if (data.success) {
                    sessionStorage.setItem("user_nickname", nickname);
                    alert("✨ " + data.message);
                    window.location.href = "carte.html"; // Redirection propre
                } else {
                    alert("❌ " + data.message);
                }
            } catch (err) {
                console.error("Erreur d'inscription :", err);
                // Sauvegarde locale de secours pour le test mobile si le serveur n'est pas sur le web
                sessionStorage.setItem("user_nickname", nickname || "SERGE");
                alert("🤖 Mode démo / Serveur local hors-ligne. Passage à la carte !");
                window.location.href = "carte.html";
            }
        });
    }

    // --- 3. GESTION DU BOUTON CONTINUE (CARTE) ---
    const btnContinue = document.querySelector(".btn-valider-commande");
    if (btnContinue) {
        btnContinue.addEventListener("click", async () => {
            const pseudo = sessionStorage.getItem("user_nickname") || "Client Anonyme";
            const adresse = document.querySelector(".address-text")?.textContent || "Bepanda, Douala";

            console.log(`Envoi de la commande pour ${pseudo}...`);

            try {
                const response = await fetch('http://localhost:3000/api/nouvelle-commande', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ adresse, pseudo })
                });

                const data = await response.json();
                if (data.success) {
                    alert("🍏 Trello mis à jour ! " + data.message);
                } else {
                    alert("❌ Erreur : " + data.message);
                }
            } catch (err) {
                console.error("Erreur Trello :", err);
                alert("📢 Commande simulée ! (Ouvre ton site sur ton PC avec ton serveur Node actif pour envoyer à Trello).");
            }
        });
    }
});