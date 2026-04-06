function updateClock() {
    const now = new Date();

    const formatted = now.toLocaleTimeString("fr-FR");
    
    document.getElementById("clock").textContent = formatted;

}

updateClock();
setInterval(updateClock, 1000);

function updateDay() {
    const now = new Date();

    const formatted = now.toLocaleDateString("fr-FR",{
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    document.getElementById("date").textContent = formatted;
}

updateDay();