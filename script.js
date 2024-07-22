document.addEventListener('DOMContentLoaded', function () {
    console.log("Page Loaded");

    // Fonction pour lire les données du localStorage
    const readData = () => {
        const data = localStorage.getItem('data');
        return data ? JSON.parse(data) : { articles: [], forums: [] };
    };

    // Fonction pour écrire les données dans le localStorage
    const writeData = (data) => {
        localStorage.setItem('data', JSON.stringify(data));
    };

    // Fonction pour afficher les forums
    const loadForums = () => {
        const data = readData();
        const forumsContainer = document.getElementById('forums');
        if (forumsContainer) {
            forumsContainer.innerHTML = data.forums.map(forum => `
                <article>
                    <h3>${forum.title}</h3>
                    <p>${forum.description}</p>
                    <a href="forum.html?id=${forum.id}" class="view-forum" data-forum-id="${forum.id}">Voir le forum</a>
                </article>
            `).join('');
        }
    };

    const loadForum = (id) => {
        const data = readData();
        const forum = data.forums.find(f => f.id === id);
        const forumContent = document.getElementById('forumContent');
        if (forumContent) {
            if (forum) {
                forumContent.innerHTML = `
                    <h2>${forum.title}</h2>
                    <p>${forum.description}</p>
                    <!-- Ajouter ici le contenu du forum -->
                `;
            } else {
                forumContent.innerHTML = `<h2>Erreur lors du chargement du forum</h2>`;
            }
        }
    };

    if (document.getElementById('forums')) {
        loadForums();
    }

    const urlParams = new URLSearchParams(window.location.search);
    const forumId = urlParams.get('id');
    if (forumId) {
        loadForum(forumId);
    }

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

    // Gestion de la soumission du formulaire d'inscription
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const newUsername = document.getElementById('newUsername').value;
            const newPassword = document.getElementById('newPassword').value;

            console.log("Inscription :", { newUsername, newPassword });
            alert("Inscription réussie. Vous pouvez maintenant vous connecter.");
            signupForm.reset();
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

    // Forum - Soumettre un nouveau forum
    const newForumForm = document.getElementById('newForumForm');
    if (newForumForm) {
        newForumForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const forumTitle = document.getElementById('forumTitle').value;
            const forumDescription = document.getElementById('forumDescription').value;

            const data = readData();
            const newForum = {
                id: Date.now().toString(),
                title: forumTitle,
                description: forumDescription
            };
            data.forums.push(newForum);
            writeData(data);

            console.log("Nouveau forum créé :", { forumTitle, forumDescription });
            alert("Forum créé avec succès.");
            newForumForm.reset();
            loadForums();
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
    const resourceLinks = document.querySelectorAll('.resource-link');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const url = link.getAttribute('href');
            window.open(url, '_blank');
        });
    });

    // Gestion de l'ajout d'un article
    const addArticleForm = document.getElementById('addArticleForm');
    if (addArticleForm) {
        addArticleForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const title = document.getElementById('articleTitle').value;
            const content = document.getElementById('articleContent').value;

            const data = readData();
            const newArticle = {
                id: Date.now().toString(), // Generate a simple unique ID
                title: title,
                content: content
            };
            data.articles.push(newArticle);
            writeData(data);

            console.log("Nouvel article ajouté :", { title, content });
            alert("Article ajouté avec succès.");
            addArticleForm.reset();
        });
    }
});

