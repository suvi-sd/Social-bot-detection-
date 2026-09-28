# SOCIAL BOT DETECTION MODEL

B.Tech AI & Data Science final-year project. Predicts Human vs Social Bot from account features using an explainable weighted scoring model.

## Run
Open `index.html` in a browser (internet needed once for Chart.js and Google Fonts). No build step.

## Structure
- `index.html` : page layout and sections (components)
- `css/style.css` : theme, glassmorphism, responsive rules
- `js/detection.js` : FEATURES weights and `predict()` (the ML-style model)
- `js/storage.js` : detection history in localStorage
- `js/ui.js` : helpers, animated counters, sample accounts
- `js/analysis.js` : 6-step animated analysis
- `js/result.js` : result card and explainable factors
- `js/dashboard.js` : stats, Chart.js charts, history table
- `js/background.js` : neural-network animation, scroll reveal
- `js/main.js` : startup
- `assets/` : favicon

## Model
Each of 8 features gives a suspicion value 0..1, multiplied by its weight (max 100 points total). Probability = sigmoid((score - 45) / 9). Classified as bot when probability >= the chosen threshold.

Demo only. Not a judgment about real people or accounts.
