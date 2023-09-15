document.addEventListener("DOMContentLoaded", function () {
    const typingText = document.getElementById("typing-text");
    const cursor = document.getElementById("cursor");
    const originalText = "Hi, I'm Atharv.";
    const newText = "Welcome to my website.";

    function typeOut(text, callback) {
        let charIndex = 0;
        typingText.textContent = "";

        function type() {
            if (charIndex < text.length) {
                typingText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, 125); // Adjust the typing speed here (in milliseconds)
            } else {
                callback();
            }
        }

        type();
    }

    function deleteText(callback) {
        let textLength = typingText.textContent.length;

        function deleteChar() {
            if (textLength > 0) {
                typingText.textContent = typingText.textContent.slice(0, -1);
                textLength--;
                setTimeout(deleteChar, 75); // Adjust the deleting speed here (in milliseconds)
            } else {
                callback();
            }
        }

        deleteChar();
    }

    function typeAnimationLoop() {
        typeOut(originalText, function () {
            setTimeout(function () {
                deleteText(function () {
                    setTimeout(function () {
                        typingText.textContent = "";
                        typeOut(newText, function () {
                            setTimeout(function () {
                                deleteText(function () {
                                    typeAnimationLoop();
                                });
                            }, 1000);
                        });
                    }, 500);
                });
            }, 1000);
        });
    }

    typeAnimationLoop();

    cursor.style.visibility = "visible";
    setInterval(() => {
        cursor.style.visibility =
            cursor.style.visibility === "visible" ? "hidden" : "visible";
    }, 500);

    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    darkModeToggle.addEventListener("change", function () {
        if (this.checked) {
            body.classList.add("dark-mode");
        } else {
            body.classList.remove("dark-mode");
        }
    });

    // Initialize ScrollReveal
    ScrollReveal().reveal(".section", {
        delay: 200,
        distance: "50px",
        duration: 1000,
        origin: "bottom",
        easing: "ease-out"
    });
});
