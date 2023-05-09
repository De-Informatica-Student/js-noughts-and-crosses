// Variabelen voor het bijhouden van het spel
let turnX = true;
let finished = false;
let turnCount = 1;

// Een constante die de mogelijke winreeksen bevat
// We gebruiken een drie-dimensionale reeks om een reeks ifjes te voorkomen
const winConditions = [
    ['tl', 'tc', 'tr'], ['ml', 'mc', 'mr'], ['bl', 'bc', 'br'],
    ['tl', 'ml', 'bl'], ['tc', 'mc', 'bc'], ['tr', 'mr', 'br'],
    ['tl', 'mc', 'br'], ['tr', 'mc', 'bl']
];

// Maak een variabele aan voor de turnindicator
// We zetten deze in een variabele omdat hij vaak wordt gebruikt
// Deze geven we nog geen waarde, 
// omdat we niet zeker weten of de pagina al klaar is met laden
let turnIndicator = null;

// We gebruiken de onload functie om een aantal acties uit te voeren
// als de pagina klaar is met laden
window.onload = function () {
    // Stel de knoppen in voor het eerste gebruik.
    resetButtons()

    // Geef de reset knop de juiste functie
    document.getElementById('reset').onclick = reset;

    // Stel de turn indicator in.
    turnIndicator = document.getElementById('turn-indicator');
};

/**
 * Een set van de gebruiker, bedoeld als event
 * 
 * @param {PointerEvent} event 
 * Het event om te bepalen op welke knop is geklikt
 */
function move(event) {
    // Controleer of de knop leeg is en het spel nog bezig is
    if (event.target.innerHTML === '&nbsp;' && !finished) {
        // Verander de inhoud van de knop
        event.target.innerHTML = turnX ? 'X' : 'O';
        
        // Controleer de overwinnigsconditie
        if (checkWinCondition()) {
            // Het spel is voorbij
            finished = true;

            // Gebruik de turnidicator voor het resultaat
            turnIndicator.innerHTML = turnX
                ? 'Keuisje wint!'
                : 'Rondje wint!'
        }
        
        // Controleer of het bord vol is
        else if (turnCount === 9) {
            // Het spel is voorbij
            finished = true;

            // Geef het gelijke spel aan
            turnIndicator.innerHTML = "Gelijkspel"
        }
        
        // Het spel is nog niet voorbij dus we gaan verder
        else {
            // Verander de speler
            turnX = !turnX;

            // Tell de beurt op
            turnCount = turnCount + 1;

            // Toon wie er aan de beurt is
            updateIndicator();
        }
    }
}

/**
 * Reset het spel zodat er opnieuw begonnen kan worden
 */
function reset() {
    // Reset de variabele naar hun originele waarde
    finished = false;
    turnCount = 1;

    // Reset de knoppen en laat zien wie er aan de beurt is
    resetButtons();
    updateIndicator();
}

/**
 * Reset de knoppen die onderdeel zijn van het spel
 * De knoppen worden ingesteld voor een spel dat nog moet beginnen
 * Deze functie zet de 'onclick' functie goed en de innerHTML
 */
function resetButtons() {
    // We zoeken alle knoppen op die onderdeel zijn van een rij
    // Dit zijn alle knoppen behalve de reset-knop
    const buttons = document.querySelectorAll('.row button');

    // Ga langs alle knoppen
    buttons.forEach(function (button) {
        // Stel de 'onclick' functie in
        button.onclick = move;

        // Zet de innerHTML op &nbsp;
        // Dit is een spatie als HTML code
        // De spatie is nodig voor de stijling
        button.innerHTML = '&nbsp;';
    });
}

/**
 * Laat zien wie er aan de beurt is in de turn indicator
 */
function updateIndicator() {
    // Controleer wie er is en geef dit aan
    turnIndicator.innerHTML = turnX
        ? 'De beurt is aan kruisje'
        : 'De beurt is aan rondje';
}

/**
 * Controleer of iemand heeft gewonnen
 */
function checkWinCondition() {
    // Controleer voor iedere mogelijke combinatie of er is gewonnen
    winConditions.forEach(function (condition) {
        // Haal de inhoud van de knoppen uit de reeks op
        const firstButton = document.getElementById(condition[0]).innerHTML;
        const secondButton = document.getElementById(condition[1]).innerHTML;
        const thirdButton = document.getElementById(condition[2]).innerHTML;
        
        // Controleer of de knoppen niet leeg zijn
        if (firstButton != '&nbsp;' && secondButton != '&nbsp;' && thirdButton != '&nbsp;') {
            // Controleer of er is gewonnen
            if (firstButton === secondButton && secondButton === thirdButton) {
                // Er is gewonnen
                return true;
            }
        }
    });
    
    // Niemand heeft gewonnen
    return false;
}