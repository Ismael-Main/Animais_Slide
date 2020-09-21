export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  quandoAtualizaPosicao(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.5;
    return this.dist.finalPosition - this.dist.movement;
  }

  quandoInicia(event) {
    let tipoMovimento;
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.dist.startX = event.clientX;
      tipoMovimento = 'mousemove';
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      tipoMovimento = 'touchmove';
    }
    this.wrapper.addEventListener(tipoMovimento, this.quandoMove);
  }

  quandoMove(event) {
    const posicaoPointer =
      event.type === 'mousemove'
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.quandoAtualizaPosicao(posicaoPointer);
    this.moveSlide(finalPosition);
  }

  quandoTermina(event) {
    const tipoDoMovimento =
      event.type === 'mouseup' ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener('mousemove', this.quandoMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  addSlideEventos() {
    this.wrapper.addEventListener('mousedown', this.quandoInicia);
    this.wrapper.addEventListener('touchstart', this.quandoInicia);
    this.wrapper.addEventListener('mouseup', this.quandoTermina);
    this.wrapper.addEventListener('touchend', this.quandoTermina);
  }

  bindEventos() {
    this.quandoInicia = this.quandoInicia.bind(this);
    this.quandoMove = this.quandoMove.bind(this);
    this.quandoTermina = this.quandoTermina.bind(this);
  }

  init() {
    this.bindEventos();
    this.addSlideEventos();
    return this;
  }
}
