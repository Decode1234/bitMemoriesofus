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
    this.paper.addEventListener("mousedown", (e) => this.startDrag(e));
    this.paper.addEventListener("touchstart", (e) => this.startDrag(e, true));
    document.addEventListener("mousemove", (e) => this.drag(e));
    document.addEventListener("touchmove", (e) => this.drag(e, true));
    document.addEventListener("mouseup", () => this.stopDrag());
    document.addEventListener("touchend", () => this.stopDrag());
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
  }

  drag(e, isTouch = false) {
    if (!this.holdingPaper) return;
    if (isTouch) {
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
  }

  stopDrag() {
    this.holdingPaper = false;
  }
}

document.querySelectorAll(".paper").forEach((paper) => new Paper(paper));

// Audio Autoplay Fix
window.addEventListener("click", () => {
  let audio = document.getElementById("bg-music");
  if (audio.paused) {
    audio.play().catch((e) => console.log("Autoplay prevented!", e));
  }
}, { once: true });
