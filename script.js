document.addEventListener('DOMContentLoaded', function () {
    console.log("Page Loaded");

    // Gestion de la soumission du formulaire de connexion
    const loginForm = document.querySelector('form[action="dashboard.html"]');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simuler une connexion réussie
            if (username === "admin" && password === "admin") {
                window.location.href = "dashboard.html";
            } else {
                alert("Nom d'utilisateur ou mot de passe incorrect");
            }
        });
    }

    // Gestion de la soumission du formulaire de contact
    const contactForm = document.querySelector('form[action="submit_contact.html"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            console.log("Message envoyé :", { name, email, message });
            alert("Merci pour votre message. Nous vous répondrons bientôt.");
            contactForm.reset();
        });
    }

    // Gestion de la navigation active
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // Gestion de l'ajout d'une fiche
    const addFicheForm = document.querySelector('form[action="add_fiche.html"]');
    if (addFicheForm) {
        addFicheForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const ficheTitle = document.getElementById('ficheTitle').value;
            const ficheContent = document.getElementById('ficheContent').value;

            console.log("Nouvelle fiche ajoutée :", { ficheTitle, ficheContent });
            alert("Fiche ajoutée avec succès.");
            addFicheForm.reset();
        });
    }

    // Gestion de la soumission du formulaire de commentaire sur le blog
    const commentForms = document.querySelectorAll('.comment-form');
    commentForms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const comment = form.querySelector('.comment').value;

            console.log("Commentaire envoyé :", comment);
            alert("Merci pour votre commentaire.");
            form.reset();
        });
    });

    // Gestion des préférences utilisateur
    const preferencesForm = document.querySelector('form[action="preferences.html"]');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const theme = document.querySelector('input[name="theme"]:checked').value;
            const notifications = document.getElementById('notifications').checked;

            console.log("Préférences mises à jour :", { theme, notifications });
            alert("Préférences sauvegardées.");
        });
    }

    // Gestion des messages utilisateur
    const messageForm = document.querySelector('form[action="messages.html"]');
    if (messageForm) {
        messageForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const recipient = document.getElementById('recipient').value;
            const messageContent = document.getElementById('messageContent').value;

            console.log("Message envoyé à :", recipient, messageContent);
            alert("Message envoyé.");
            messageForm.reset();
        });
    }

    // Forum - Soumettre une nouvelle discussion
    const forumForm = document.querySelector('form[action="new_topic.html"]');
    if (forumForm) {
        forumForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const topicTitle = document.getElementById('topicTitle').value;
            const topicContent = document.getElementById('topicContent').value;

            console.log("Nouvelle discussion :", { topicTitle, topicContent });
            alert("Discussion créée avec succès.");
            forumForm.reset();
        });
    }

    // Blog - Lire plus
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const articleId = link.getAttribute('data-article-id');
            console.log("Lire plus sur l'article :", articleId);
            // Charger l'article complet (implémentation nécessaire)
        });
    });

    // Ressources - Ouverture de liens externes
    const resourceLinks = document.querySelector
