let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.mouseTouchX = 0;
    this.mouseTouchY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.rotating = false;
    this.init();
  }

  init() {
    this.paper.addEventListener("mousedown", (e) => this.startDrag(e));
    this.paper.addEventListener("touchstart", (e) => this.startTouch(e));
    document.addEventListener("mousemove", (e) => this.drag(e));
    document.addEventListener("touchmove", (e) => this.dragTouch(e));
    window.addEventListener("mouseup", () => this.endDrag());
    window.addEventListener("touchend", () => this.endDrag());
  }

  startDrag(e) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ++;
    this.mouseTouchX = e.clientX;
    this.mouseTouchY = e.clientY;
    this.prevMouseX = this.mouseTouchX;
    this.prevMouseY = this.mouseTouchY;
  }

  startTouch(e) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ++;
    let touch = e.touches[0];
    this.mouseTouchX = touch.clientX;
    this.mouseTouchY = touch.clientY;
    this.prevMouseX = this.mouseTouchX;
    this.prevMouseY = this.mouseTouchY;
  }

  drag(e) {
    if (!this.holdingPaper) return;
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.movePaper();
  }

  dragTouch(e) {
    if (!this.holdingPaper) return;
    let touch = e.touches[0];
    this.mouseX = touch.clientX;
    this.mouseY = touch.clientY;
    this.movePaper();
  }

  movePaper() {
    this.velX = this.mouseX - this.prevMouseX;
    this.velY = this.mouseY - this.prevMouseY;
    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;
    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;
    this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
  }

  endDrag() {
    this.holdingPaper = false;
  }
}

document.querySelectorAll(".paper").forEach((paper) => new Paper(paper));

// Autoplay Music on User Interaction
document.addEventListener("click", () => {
  let audio = document.getElementById("bg-music");
  if (audio.paused) {
    audio.play().catch((e) => console.log("Autoplay blocked: ", e));
  }
});
