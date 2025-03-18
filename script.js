let highestZ = 1;

class Paper {
    constructor(paper) {
        this.paper = paper;
        this.holdingPaper = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.prevMouseX = 0;
        this.prevMouseY = 0;
        this.velX = 0;
        this.velY = 0;
        this.rotation = Math.random() * 30 - 15;
        this.currentPaperX = 0;
        this.currentPaperY = 0;
        this.init();
    }

    init() {
        this.paper.style.transform = `rotateZ(${this.rotation}deg)`;

        // Drag events
        this.paper.addEventListener("mousedown", (e) => this.startDrag(e, false));
        this.paper.addEventListener("touchstart", (e) => this.startDrag(e, true));
    }

    startDrag(e, isTouch = false) {
        this.holdingPaper = true;
        this.paper.style.zIndex = highestZ++;

        if (isTouch) {
            this.mouseX = e.touches[0].clientX;
            this.mouseY = e.touches[0].clientY;
        } else {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        document.addEventListener(isTouch ? "touchmove" : "mousemove", this.dragHandler);
        document.addEventListener(isTouch ? "touchend" : "mouseup", this.stopDragHandler);
    }

    dragHandler = (e) => {
        if (!this.holdingPaper) return;
        
        if (e.touches) {
            this.mouseX = e.touches[0].clientX;
            this.mouseY = e.touches[0].clientY;
        } else {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }

        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    };

    stopDragHandler = () => {
        this.holdingPaper = false;
        document.removeEventListener("mousemove", this.dragHandler);
        document.removeEventListener("mouseup", this.stopDragHandler);
        document.removeEventListener("touchmove", this.dragHandler);
        document.removeEventListener("touchend", this.stopDragHandler);
    };
}

document.querySelectorAll(".paper").forEach((paper) => new Paper(paper));

/* ✅ AutoPlay Fix */
function enableAudio() {
    let audio = document.getElementById("bg-music");
    if (audio) {
        audio.play().catch((e) => console.log("Autoplay prevented!", e));
    }

    let soundcloudIframe = document.getElementById("soundcloud-player");
    if (soundcloudIframe) {
        let overlay = document.getElementById("sc-overlay");
        overlay.style.display = "none";
    }
}

// Enable audio on first user interaction
window.addEventListener("click", enableAudio, { once: true });
