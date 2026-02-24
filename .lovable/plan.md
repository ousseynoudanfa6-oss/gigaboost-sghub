

# GigaBoost Sénégal — Plan d'implémentation

## 🎨 Design & Thème
- Palette : orange (#FF6600), blanc, noir — style fintech moderne
- Design mobile-first responsive
- Mode sombre / clair avec toggle
- Animations fluides (fade-in, confettis CSS, checkmark animé)
- Disclaimer visible : "Plateforme promotionnelle indépendante, non affiliée à Orange"

## 🏠 Page d'accueil
- Hero section avec titre "Gagne jusqu'à 25 Go gratuitement"
- Sous-titre explicatif + bouton CTA "Commencer et gagner des Go"
- Section "Comment ça marche" en 4 étapes illustrées avec icônes
- FAQ en accordéon
- Section sponsors (logos placeholder)
- Compteur animé des Go distribués (simulation)

## 🔐 Authentification (simulation frontend)
- Page inscription (email + mot de passe) avec validation
- Page connexion
- Données stockées en localStorage
- Session simulée avec protection anti-refresh (les progrès persistent)

## 🎬 Système de publicités progressif
- Tableau interactif après connexion montrant les paliers :
  - 1 pub → 2 Go | 2 pubs → 5 Go | 3 pubs → 10 Go | 5 pubs → 25 Go
- Chaque clic ouvre un vrai lien externe (target=_blank)
- Timer obligatoire de 30 secondes (non skippable)
- Bouton "Valider la publicité" activé après les 30s
- Barre de progression animée + compteur dynamique

## 📊 Dashboard utilisateur
- Vue d'ensemble : publicités vues, Go cumulés, progression
- Barre de progression visuelle animée
- Badge spécial après 5 pubs complétées
- Animation confettis CSS à la complétion
- Historique des gains avec dates
- Notifications animées (toast)

## 🎉 Page finale (après 5 publicités)
- Redirection automatique vers page de félicitations
- Titre "Félicitations ! Votre demande de 25 Go est en cours"
- Message d'attente de 72h
- Animations : checkmark animé, loader circulaire, compteur 72h
- Design professionnel et rassurant

## 🧠 Fonctionnalités bonus
- **Parrainage** : Lien unique par utilisateur, compteur de filleuls, bonus simulé
- **Classement** : Leaderboard des top utilisateurs (données simulées)
- **Mode sombre/clair** : Toggle dans le header, persisté en localStorage
- **Historique** : Journal des publicités vues et Go gagnés avec timestamps

## 📱 Navigation
- Header avec logo, toggle dark mode, bouton connexion/profil
- Navigation fluide entre les pages (accueil, dashboard, classement, profil)
- Footer avec disclaimer légal et liens

