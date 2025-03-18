let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.currentPaperX = 0;
    this.currentPaperY = 0;

    this.init();
  }

  init() {
    this.paper.addEventListener('touchstart', (e) => this.onTouchStart(e));
    this.paper.addEventListener('touchmove', (e) => this.onTouchMove(e));
    this.paper.addEventListener('touchend', () => this.onTouchEnd());
  }

  onTouchStart(e) {
    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ++;
    const touch = e.touches[0];
    this.touchStartX = touch.clientX - this.currentPaperX;
    this.touchStartY = touch.clientY - this.currentPaperY;
  }

  onTouchMove(e) {
    if (!this.holdingPaper) return;
    e.preventDefault();

    const touch = e.touches[0];
    this.currentPaperX = touch.clientX - this.touchStartX;
    this.currentPaperY = touch.clientY - this.touchStartY;

    this.paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
  }

  onTouchEnd() {
    this.holdingPaper = false;
  }
}

document.querySelectorAll('.paper').forEach(paper => new Paper(paper));
