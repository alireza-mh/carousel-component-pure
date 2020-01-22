import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.background = 'skyblue';
    $('.owl-carousel').owlCarousel({lazyLoad: true});
});