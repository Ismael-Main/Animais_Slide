export default function menuMobile() {
  const menuBtn = document.querySelector('.botao-menu');
  const menuMobile = document.querySelector('.menu-mobile');
  const menuLinks = document.querySelectorAll('.menu-mobile a');
  var telaTamanho = window.innerWidth;

  function ativarMenuMobile() {
    menuMobile.classList.toggle('ativo');
  }
  menuBtn.addEventListener('click', ativarMenuMobile);

  function fecharMenu() {
    menuMobile.classList.remove('ativo');
  }

  menuLinks.forEach((evento) => {
    evento.addEventListener('click', fecharMenu);
  });
  console.log(telaTamanho);
}
