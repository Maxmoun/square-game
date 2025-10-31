<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sheep Runner Game</title>
    <script src="https://cdn.tailwindcss.com"></script>
    
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <div id="game-container">
        <canvas id="gameCanvas" width="800" height="400"></canvas>
        
        <div id="ui-overlay">
            <p>Score actuel: <span id="current-score">0</span></p>
            <p>Meilleur Score: <span id="high-score">--</span></p>
            <button id="startButton">Démarrer</button>
        </div>
    </div>

    <script type="module" src="src/main.js"></script>
</body>
</html>