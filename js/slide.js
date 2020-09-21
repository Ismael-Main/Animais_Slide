export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }
  transicao(active) {
    this.slide.style.transition = active ? 'transform .3s' : '';
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
    this.transicao(false);
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
    this.transicao(true);
    this.mudaSlideQuandoTermina();
  }

  mudaSlideQuandoTermina() {
    if (this.dist.movement > 120 && this.index.proximo !== undefined) {
      this.activeProximoSlide();
    } else if (this.dist.movement < -120 && this.index.anterior !== undefined) {
      this.activeAnteriorSlide();
    } else {
      this.trocaSlide(this.index.active);
    }
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
  //slides config

  slidePosicao(slide) {
    const margem = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margem);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const posicao = this.slidePosicao(element);
      return {
        posicao,
        element,
      };
    });
  }

  slidesIndexNavegacao(index) {
    const ultimoItem = this.slideArray.length - 1;
    this.index = {
      anterior: index ? index - 1 : undefined,
      ativo: index,
      proximo: index === ultimoItem ? undefined : index + 1,
    };
  }

  trocaSlide(index) {
    const slideAtivo = this.slideArray[index];
    this.moveSlide(slideAtivo.posicao);
    this.slidesIndexNavegacao(index);
    this.dist.finalPosition = slideAtivo.posicao;
  }
  activeAnteriorSlide() {
    if (this.index.anterior !== undefined) this.trocaSlide(this.index.anterior);
  }
  activeProximoSlide() {
    if (this.index.proximo !== undefined) this.trocaSlide(this.index.proximo);
  }
  init() {
    this.bindEventos();
    this.transicao(true);
    this.addSlideEventos();
    this.slidesConfig();
    return this;
  }
}
