import Carousel, {ICarouselComponent} from "src/components/carousel";
import semiUniqe from "src/utils/semiRandom";
import extensionValidation from "src/utils/extensionValidation";

interface ICarouselContainer {
  componentName?: string;
  mountSelector: string;
  render?: () => void;
}
class CarouselContainer implements ICarouselContainer {
  uniqeComponentName: string;
  componentName: string;
  mountSelector: string;
  imageElements: string[];

  constructor(name?: string, mountSelector: string = "body") {
    this.uniqeComponentName = name || `carouselContainer-${semiUniqe()}`;
    this.mountSelector = mountSelector;
    this.imageElements = [];
    this.componentName = this.uniqeComponentName;
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.render();
  }

  handleBtnClick() {
    try {
      const inputValue = $(`#${this.uniqeComponentName} > form > input`)
        .val()
        .toString();
      if (extensionValidation(inputValue)) {
        this.populateImage(inputValue);
      }
    } catch {
    } finally {
      /* prevent default behaviour on submit */
      return false;
    }
  }

  populateImage(imageAddress: string) {
    this.imageElements.push(`<div><img src=${imageAddress}/></div>`);
    $(`#${this.uniqeComponentName}-carousel`).html('');
      const carouselElem: ICarouselComponent = new Carousel(
      `${this.uniqeComponentName}-obj`,
      `#${this.uniqeComponentName}-carousel`,
      this.imageElements
    );
  }

  render() {
    $(this.mountSelector).append(`
            <div id='${this.uniqeComponentName}'>
              <form action='/'>
                <input type='text'/>
                <button type="submit">Submit</button>
              </form>
            <div id='${this.uniqeComponentName}-carousel' class='owl-carousel'>
            </div>
            </div>
          `);
    $(`#${this.uniqeComponentName} > form`).submit(this.handleBtnClick);
  }
}

export default CarouselContainer;
