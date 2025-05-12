// Rastgele kelimeler ve ipuçları
const wordsWithHints = [
    { word: "javascript", hint: "Bir programlama dili" },
    { word: "programlama", hint: "Kod yazma sanatı" },
    { word: "bilgisayar", hint: "Elektronik bir cihaz" },
    { word: "internet", hint: "Bilgi ağı" },
    { word: "kodlama", hint: "Yazılım geliştirme süreci" }
];

let guessedLetters = [];
let wrongLetters = [];
let maxWrongGuesses = 10; // 10 can
let currentWrongGuesses = 0;
let selectedWord = "";
let selectedHint = "";

// HTML elementlerini seç
const wordArea = document.getElementById("wordArea");
const wrongLettersDiv = document.getElementById("wrongLetters");
const letterInput = document.getElementById("letterInput");
const guessButton = document.getElementById("guessButton");
const messageDiv = document.getElementById("message");
const remainingLivesDiv = document.getElementById("remainingLives");
const hintDiv = document.getElementById("hint");

// Yeni bir oyun başlat
function startNewGame() {
    const randomIndex = Math.floor(Math.random() * wordsWithHints.length);
    selectedWord = wordsWithHints[randomIndex].word;
    selectedHint = wordsWithHints[randomIndex].hint;

    guessedLetters = [];
    wrongLetters = [];
    currentWrongGuesses = 0;

    remainingLivesDiv.innerText = `Kalan Can: ${maxWrongGuesses}`;
    hintDiv.innerText = `İpucu: ${selectedHint}`; // İpucunu güncelle
    messageDiv.innerText = "";
    letterInput.disabled = false;
    guessButton.disabled = false;

    displayWord();
    displayWrongLetters();
}

// Kelimeyi ekrana çiz
function displayWord() {
    wordArea.innerHTML = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
}

// Yanlış harfleri ekrana yaz
function displayWrongLetters() {
    wrongLettersDiv.innerHTML = `Yanlış Harfler: ${wrongLetters.join(", ")}`;
}

// Oyunu kontrol et
function checkGameStatus() {
    if (!wordArea.innerText.includes("_")) {
        messageDiv.innerText = "Tebrikler! Kelimeyi doğru tahmin ettiniz!";
        guessButton.disabled = true;
        letterInput.disabled = true;
    } else if (currentWrongGuesses >= maxWrongGuesses) {
        messageDiv.innerText = `Kaybettiniz! Kelime: ${selectedWord}`;
        guessButton.disabled = true;
        letterInput.disabled = true;
    }
}

// Tahmin etme işlemi
guessButton.addEventListener("click", () => {
    const guessedLetter = letterInput.value.toLowerCase();
    letterInput.value = "";

    if (!guessedLetter || guessedLetter.length !== 1) {
        messageDiv.innerText = "Lütfen bir harf girin!";
        return;
    }

    if (guessedLetters.includes(guessedLetter) || wrongLetters.includes(guessedLetter)) {
        messageDiv.innerText = "Bu harfi zaten tahmin ettiniz!";
        return;
    }

    if (selectedWord.includes(guessedLetter)) {
        guessedLetters.push(guessedLetter);
        letterInput.classList.remove("wrong");
    } else {
        wrongLetters.push(guessedLetter);
        currentWrongGuesses++;
        remainingLivesDiv.innerText = `Kalan Can: ${maxWrongGuesses - currentWrongGuesses}`;
        letterInput.classList.add("wrong");
    }

    displayWord();
    displayWrongLetters();
    checkGameStatus();
});

// Oyunu başlat
startNewGame();