export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
  }
  noInicio(event) {
    event.preventDefault();
    this.wrapper.addEventListener('mousemove', this.quandoMover);
    console.log('mousedown');
  }

  quandoMover(event) {
    this.wrapper.removeEventListener('mousedown', this.quandoMover);
  }

  quandoTerminar(event) {}

  addEventosSlide() {
    this.wrapper.addEventListener('mousedown', this.noInicio);
    this.wrapper.addEventListener('mouseup', this.quandoTerminar);
  }

  bindEventos() {
    this.noInicio = this.noInicio.bind(this);
    this.quandoMover = this.quandoMover.bind(this);
    this.quandoTerminar = this.quandoTerminar.bind(this);
  }

  init() {
    this.bindEventos();
    this.addEventosSlide();
    return this;
  }
}
