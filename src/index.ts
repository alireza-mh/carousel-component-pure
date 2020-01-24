import CarouselContainer from 'src/components/carouselContainer'
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    /* these components will be mount on div with root class (default value has been set to the body) */
    const containerNumber = new CarouselContainer({mountSelector: '.root'});
    const containerNumber2 = new CarouselContainer({mountSelector: '.root', resetBtn: true});
});