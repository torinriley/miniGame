document.getElementById('reportForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const word = document.getElementById('word').value;
    const details = document.getElementById('details').value;

    try {
        const response = await fetch("https://formspree.io/f/xanyjjjp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ word, details })
        });

        if (response.ok) {
            showPopupMessage("Thank you! Your report has been submitted.");
            document.getElementById('reportForm').reset();
        } else {
            showPopupMessage("Something went wrong. Please try again.");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        showPopupMessage("An error occurred. Please try again later.");
    }
});

function showPopupMessage(message) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.classList.add('show');

    setTimeout(() => {
        formMessage.classList.remove('show');
    }, 3000); 
}