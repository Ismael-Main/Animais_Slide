import SlideNav from './slide.js';
import MenuMobile from './MenuMobile.js';

const slide = new SlideNav('.slide', '.slide-wrapper');
slide.init();
slide.addArrow('.prev', '.next');
slide.addControl('.custom-controls');
MenuMobile();
