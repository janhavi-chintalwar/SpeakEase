let recognition;

function startListening() {
    const lang = document.getElementById("inputLang").value;

    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = lang;
    recognition.start();

    recognition.onresult = (event) => {
        document.getElementById("speechText").value =
            event.results[0][0].transcript;
    };
}

function translateText() {
    const text = document.getElementById("speechText").value;
    const target = document.getElementById("outputLang").value;
    const inputLang = document.getElementById("inputLang").value;

    if (text.trim() === "") {
        alert("Please speak something first!");
        return;
    }

    // Map speech language to translation language
    let sourceLang = "en";
    if (inputLang === "hi-IN") sourceLang = "hi";
    if (inputLang === "mr-IN") sourceLang = "mr";

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
    )}&langpair=${sourceLang}|${target}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById("translatedText").value =
                data.responseData.translatedText;
        })
        .catch(() => {
            alert("Translation failed. Please check internet.");
        });
}
