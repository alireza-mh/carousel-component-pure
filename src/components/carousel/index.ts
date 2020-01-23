import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
import semiUniqe from "src/utils/semiRandom";

export interface ICarouselComponent {
  componentName?: string;
  mountSelector?: string;
  render?: () => void;
  addItem?: (elem: string) => void;
}
class Carousel implements ICarouselComponent {
  uniqeComponentName: string;
  componentName: string;
  mountSelector: string;
  childs: any;
  owlCarousel: OwlCarousel.Options;

  constructor(name: string, mountSelector, childs, owlCarousel = {}) {
    this.uniqeComponentName = name || `carousel-${semiUniqe()}`;
    this.componentName = this.uniqeComponentName;
    this.childs = childs;
    this.mountSelector = mountSelector;
    this.owlCarousel = owlCarousel;
    this.render();
  }

  render() {
    /* destroy in case it exist (its not perfect)  */
    $(this.mountSelector).owlCarousel("destroy");
    $(this.mountSelector).append(Array.isArray(this.childs) ? this.childs.join("") : this.childs);
    $(this.mountSelector).owlCarousel({ lazyLoad: true });
  }
}

export default Carousel;
