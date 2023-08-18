const greetings = ["developer", "learner", "student"];
let greetingIndex = 0;
let currentWord = "";
let currentIndex = 0;
let typing = true;
const typingSpeed = 100; // Adjust typing speed as needed
const backspaceSpeed = 50; // Adjust backspace speed as needed
const pauseDuration = 1500; // Adjust pause duration in milliseconds
const greetingText = document.getElementById("greeting-text");

async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        throw error;
    }
}

async function cycleGreetings() {
    const ipAddress = await getIPAddress();

    if (typing) {
        currentWord = greetings[greetingIndex].substring(0, currentIndex);
        greetingText.innerHTML = `Hi ${ipAddress} I am a ${currentWord}`;
        currentIndex++;

        if (currentIndex > greetings[greetingIndex].length) {
            typing = false;
            setTimeout(() => {
                currentIndex--;
                backspaceText();
            }, pauseDuration);
        } else {
            setTimeout(cycleGreetings, typingSpeed);
        }
    }
}

function backspaceText() {
    currentWord = greetings[greetingIndex].substring(0, currentIndex);
    greetingText.innerHTML = `Hi ${getIPAddress()} I am a ${currentWord}`;
    currentIndex--;

    if (currentIndex < 0) {
        typing = true;
        greetingIndex = (greetingIndex + 1) % greetings.length;
        setTimeout(cycleGreetings, pauseDuration);
    } else {
        setTimeout(backspaceText, backspaceSpeed);
    }
}

cycleGreetings(); // Start the animation


// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#ffffff'], // Use white color for particles
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            },
            image: {
                src: 'img/github.svg',
                width: 100,
                height: 100
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff', // Use white color for lines
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 100
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});
