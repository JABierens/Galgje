// Lijst met woorden om uit te kiezen
var words = ["programmeren", "javascript", "computer", "code", "html", "css", "huis", "auto", "fiets", "computer", "telefoon", "tafel", "stoel", "boek", "piano", "gitaar", "afdelingsleider", "belastingdienst", "chronometer", "determineren", "eigendunkelijk", "fascinerend",
  "gebedsruimte", "handpalm", "informatief", "jeugdbescherming", "kantoormedewerker", "leiderschapskwaliteiten",
  "militair", "strategie", "neurotransmitter", "ondernemingsraad", "papieren", "quantummechanica", "regenboogkleuren",
  "straatmuzikant", "tegemoetkomend", "uitgestrekt", "vakantieganger", "wereldkampioenschap", "xylofoonspeler",
  "zelfbewustzijn", "achteloosheid", "brutaliteit", "deskundigheid", "eigenwijsheid", "formaliteit", "gezelligheid",
  "hoogmoedigheid", "innemendheid", "jaloezie", "kunstzinnigheid", "luiheid", "moedeloosheid", "nieuwsgierigheid",
  "onzekerheid", "prachtigheid", "rijkdom", "spontaniteit", "toeschouwers", "uitstekendheid", "verantwoordelijkheid",
  "weerstandigheid", "zachtaardigheid", "ademhalingsoefeningen", "bloeddrukverlager", "chiropractie", "darmflora",
  "ecologisch", "filosofisch", "gynaecologie", "hypotheekrente", "immuniteit", "journalistiek", "kerncentrale",
  "luchtvervuiling", "mediterraan", "natuurfenomeen", "organisatietalent", "plasticvervuiling", "quantumfysica",
  "regenwoud", "sterrenkunde", "taalkundige", "uithoudingsvermogen", "verantwoordelijkheidsgevoel", "watersnoodramp",
  "xenofobie", "zelfontplooiing", "anatomie", "bewustwording", "communicatiemiddel", "duurzaamheid", "enthousiasteling",
  "fotografie", "gezondheidszorg", "hoofdtelefoon", "instructeur", "journalist", "klimaatverandering", "luisterboek",
  "misdaadroman", "natuurliefhebber", "onderwijskunde", "politieagent", "quote", "reisleider", "schilderkunst",
  "televisieserie", "uitvinder", "verzamelaar", "werktuigbouwkunde", "xylofoonmuziek", "yoga", "zeilboot",
  "architectuur", "bergbeklimmen", "creativiteit", "dansen", "eten", "fotobewerking", "golfsurfen", "hiken",
  "inrichting", "joggen", "kunst", "lezen", "muziek", "natuur", "ontspanning", "trekpop"
];

let message = document.getElementById("message");
// Kies een willekeurig woord uit de lijst
var word = words[Math.floor(Math.random() * words.length)];

// Maak een array met underscores voor elk karakter in het woord
var answerArray = [];
for (var i = 0; i < word.length; i++) {
  answerArray[i] = "_";
}

// Aantal pogingen die de speler heeft
var remainingGuesses = 6;

// Lijst met geraden letters door de speler
var guessedLetters = [];

// Laat het woord zien met underscores
function showAnswer() {
  document.getElementById("word").innerHTML = answerArray.join(" ");
}

// Laat de lijst met geraden letters zien
function showGuessedLetters() {
  document.getElementById("letters").innerHTML = "Geraden letters: " + guessedLetters.join(", ");
}

// Laat het aantal overgebleven pogingen zien
function showRemainingGuesses() {
  document.getElementById("chances").innerHTML = "Je hebt nog " + remainingGuesses + " pogingen over.";
}

// Controleer of het geraden karakter voorkomt in het woord
function checkGuess(guess) {
  // Als de geraden letter al eerder is geraden, doe niets
  if (guessedLetters.includes(guess)) {
    return;
  }

  guessedLetters.push(guess);

  var found = false;
  for (var i = 0; i < word.length; i++) {
    if (word[i] === guess) {
      answerArray[i] = guess;
      found = true;
    }
  }

  if (!found) {
    remainingGuesses--;
    document.querySelectorAll(".hangman").forEach((hangpart, idx) => {
      if (idx <= remainingGuesses - 1) {
        hangpart.style.display = "none";
      } else {
        hangpart.style.display = "inherit";
      }
    });
  }

  showAnswer();
  showGuessedLetters();
  showRemainingGuesses();

  // Controleer of de speler heeft gewonnen of verloren
  if (answerArray.indexOf("_") === -1) {
    message.textContent = "Gefeliciteerd, je hebt gewonnen!";
  } else if (remainingGuesses === 0) {
    message.textContent = "Helaas, je hebt verloren. Het woord was: " + word;
  } else if (remainingGuesses === -1) {
    reset()
  }
}

// Reset het spel
function reset() {
  word = words[Math.floor(Math.random() * words.length)];
  answerArray = [];
  for (var i = 0; i < word.length; i++) {
    answerArray[i] = "_";
  }
  remainingGuesses = 6;
  guessedLetters = [];
  showAnswer();
  showGuessedLetters();
  showRemainingGuesses();
  message.textContent = " "
  document.querySelectorAll(".hangman").forEach((hangpart, idx) => {
    if (idx <= remainingGuesses) {
      hangpart.style.display = "none";
    } else {
      hangpart.style.display = "inherit";
    }
  });
}

// Voeg event listeners toe aan de knoppenhh
document.getElementById("reset").addEventListener("click", reset);

function keyupListener(event){
  if (event.keyCode >= 65 && event.keyCode <= 90 && remainingGuesses) {
    checkGuess(event.key.toLowerCase());
  }
}

let keyup_listener = document.addEventListener("keyup", (evt) => keyupListener(evt));
