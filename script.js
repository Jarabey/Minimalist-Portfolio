const cursor = document.querySelector(".cursor");
var timeout;

//follow cursor on mousemove
document.addEventListener("mousemove", (e) => {
    let x = e.pageX;
    let y = e.pageY;

    cursor.style.top = y + "px";
    cursor.style.left = x + "px";
    cursor.style.display = "block";

    //cursor effects when mouse stopped
    function mouseStopped() {
        cursor.style.display = "none";
    }
    clearTimeout(timeout);
    timeout = setTimeout(mouseStopped, 5000);
});

//cursor effects when mouseout
document.addEventListener("mouseout", () => {
    cursor.style.display = "none";
});

document.getElementById('translate-btn').addEventListener('click', function() {
    translatePage();
});

function translatePage() {
    const apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY'; // Replace with your API key
    const sourceLang = 'en';
    const targetLang = 'es';
    const text = document.getElementById('content').innerText;

    fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: text,
            source: sourceLang,
            target: targetLang
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('content').innerHTML = data.data.translations[0].translatedText;
    })
    .catch(error => console.error('Error:', error));
}