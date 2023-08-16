const greetings = ["developer", "learner", "student"];
let greetingIndex = 0;
const greetingText = document.getElementById("greeting-text");

function cycleGreetings() {
    greetingText.innerHTML = `Hi ${getIPAddress()} I am a ${greetings[greetingIndex]}`;
    greetingIndex = (greetingIndex + 1) % greetings.length;
}

function getIPAddress() {
    // This is a simplified way to get IP address for demonstration purposes.
    return "123.45.67.89";
}

setInterval(cycleGreetings, 2000); // Change greetings every 2 seconds
