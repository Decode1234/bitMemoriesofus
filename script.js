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
    this.rotating = false;

    this.init();
  }

  init() {
    this.paper.addEventListener('mousedown', (e) => this.onMouseDown(e));
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('mouseup', () => this.onMouseUp());
  }

  onMouseDown(e) {
    if (this.holdingPaper) return;
    
    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ++;
    this.prevMouseX = e.clientX;
    this.prevMouseY = e.clientY;
  }

  onMouseMove(e) {
    if (!this.holdingPaper) return;
    
    this.velX = e.clientX - this.prevMouseX;
    this.velY = e.clientY - this.prevMouseY;
    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;

    this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;

    this.prevMouseX = e.clientX;
    this.prevMouseY = e.clientY;
  }

  onMouseUp() {
    this.holdingPaper = false;
  }
}

document.querySelectorAll('.paper').forEach(paper => new Paper(paper));
