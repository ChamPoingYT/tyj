document.addEventListener('DOMContentLoaded', function () {
    console.log("Page Loaded");

    // Fetch articles and display them
    const loadArticles = async () => {
        try {
            const response = await fetch('/api/articles');
            const articles = await response.json();
            const articlesContainer = document.getElementById('articles');
            if (articlesContainer) {
                articlesContainer.innerHTML = articles.map(article => `
                    <article>
                        <h3>${article.title}</h3>
                        <p>${article.content}</p>
                        <a href="article.html?id=${article.id}" class="read-more" data-article-id="${article.id}">Lire plus</a>
                    </article>
                `).join('');
            }
        } catch (error) {
            console.error("Error loading articles:", error);
        }
    };

    const loadArticle = async (id) => {
        try {
            const response = await fetch(`/api/articles/${id}`);
            const article = await response.json();
            const articleContent = document.getElementById('articleContent');
            if (articleContent) {
                articleContent.innerHTML = `
                    <h2>${article.title}</h2>
                    <p>${article.content}</p>
                `;
            }
        } catch (error) {
            console.error("Error loading article:", error);
            const articleContent = document.getElementById('articleContent');
            if (articleContent) {
                articleContent.innerHTML = `<h2>Erreur lors du chargement de l'article</h2>`;
            }
        }
    };

    if (document.getElementById('articles')) {
        loadArticles();
    }

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    if (articleId) {
        loadArticle(articleId);
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
        addArticleForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const title = document.getElementById('articleTitle').value;
            const content = document.getElementById('articleContent').value;

            const newArticle = {
                id: Date.now().toString(), // Generate a simple unique ID
                title: title,
                content: content
            };

            try {
                const response = await fetch('/api/articles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newArticle)
                });
                if (response.ok) {
                    alert("Article ajouté avec succès.");
                    addArticleForm.reset();
                } else {
                    alert("Erreur lors de l'ajout de l'article.");
                }
            } catch (error) {
                console.error("Error adding article:", error);
                alert("Erreur lors de l'ajout de l'article.");
            }
        });
    }
});
