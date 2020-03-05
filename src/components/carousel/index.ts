import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
import semiUniqe from "src/utils/semiRandom";
import arrow from "./asset/arrow.png";
import "./style.css";

export interface ICarouselComponent {
  componentName?: string;
  mountSelector?: string;
  owlCarousel?: OwlCarousel.Options;
  render?: () => void;
  addItem?: (elem: string) => void;
  destroy?: () => void;
}
class Carousel implements ICarouselComponent {
  uniqeComponentName: string;
  componentName: string;
  mountSelector: string;
  childs: any;
  owlCarousel: OwlCarousel.Options;
  navText: string[];

  constructor(name: string, mountSelector, childs, owlCarousel = {}) {
    this.uniqeComponentName = name || `carousel-${semiUniqe()}`;
    this.componentName = this.uniqeComponentName;
    this.childs = childs;
    this.mountSelector = mountSelector;
    this.owlCarousel = owlCarousel;
    this.navText = [
      `<img class='carousel-arrow carousel-arrow_left' src='${arrow}'/>`,
      `<img class='carousel-arrow carousel-arrow_right' src='${arrow}'/>`,
    ];
    this.render();
  }
  /**
   * @method destroy
   * @description destory owl carousel 
   */
  destroy() {
    $(this.mountSelector).owlCarousel("destroy");
  }

  render() {
    /* destroy in case it exist (its not perfect)  */
    $(this.mountSelector).owlCarousel("destroy");
    $(this.mountSelector).append(Array.isArray(this.childs) ? this.childs.join("") : this.childs);
    $(this.mountSelector).owlCarousel({ lazyLoad: true, nav: true, navText: this.navText, ...this.owlCarousel });
  }
}

export default Carousel;
