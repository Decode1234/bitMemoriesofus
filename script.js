let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holding = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.currentX = 0;
    this.currentY = 0;

    this.init();
  }

  init() {
    this.paper.addEventListener('mousedown', (e) => this.startDrag(e));
    this.paper.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));

    document.addEventListener('mousemove', (e) => this.drag(e));
    document.addEventListener('touchmove', (e) => this.drag(e.touches[0]));

    document.addEventListener('mouseup', () => this.endDrag());
    document.addEventListener('touchend', () => this.endDrag());
  }

  startDrag(e) {
    this.holding = true;
    this.paper.style.zIndex = highestZ++;
    this.offsetX = e.clientX - this.currentX;
    this.offsetY = e.clientY - this.currentY;
  }

  drag(e) {
    if (!this.holding) return;
    e.preventDefault();
    
    this.currentX = e.clientX - this.offsetX;
    this.currentY = e.clientY - this.offsetY;
    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
  }

  endDrag() {
    this.holding = false;
  }
}

document.querySelectorAll('.paper').forEach(paper => new Paper(paper));
