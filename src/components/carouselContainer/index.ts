import Carousel, { ICarouselComponent } from "src/components/carousel";
import semiUniqe from "src/utils/semiRandom";
import extensionValidation from "src/utils/extensionValidation";
import "./style.css";

interface ICarouselContainer {
  componentName?: string;
  mountSelector: string;
  render?: () => void;
}

type CarouselContainerConstructor = {
  name?: string;
  mountSelector?: string;
  carouselOptions?: OwlCarousel.Options;
  resetBtn?: boolean;
};

class CarouselContainer implements ICarouselContainer {
  uniqeComponentName: string;
  componentName: string;
  mountSelector: string;
  imageElements: string[];
  carouselElem: ICarouselComponent;
  carouselOptions: OwlCarousel.Options;
  resetBtn: boolean;

  constructor({ name, mountSelector, carouselOptions, resetBtn }: CarouselContainerConstructor = {}) {
    this.uniqeComponentName = name || `carouselContainer-${semiUniqe()}`;
    this.mountSelector = mountSelector || "body";
    this.imageElements = [];
    this.componentName = this.uniqeComponentName;
    this.carouselOptions = carouselOptions;
    this.resetBtn = resetBtn || false;
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.render();
  }

  handleBtnClick() {
    $(`#${this.uniqeComponentName} .container-input`).removeClass('input-error');
    try {
      const inputValue = $(`#${this.uniqeComponentName} > form > input`)
        .val()
        .toString();
        /* support multiple image address input */
        const inputArray = inputValue.split(",");
        if (inputArray.every(inputItem => extensionValidation(inputItem))){
        inputArray.forEach(inputItem => {
          if (extensionValidation(inputItem)) {
            this.populateImage(inputItem);
          }
        });
      } else {
        /* show appropriate error */
        $(`#${this.uniqeComponentName} .container-input`).addClass('input-error')
      }
    } finally {
      /* prevent default behaviour on submit */
      return false;
    }
  }

  /**
   * @method populateImage
   * @param imageAddress {string}
   * @description add new image to the carousel
   */
  populateImage(imageAddress: string) {
    this.imageElements.push(`<div><img src=${imageAddress}/></div>`);
    $(`#${this.uniqeComponentName}-carousel`).html("");
    this.carouselElem = new Carousel(
      `${this.uniqeComponentName}-obj`,
      `#${this.uniqeComponentName}-carousel`,
      this.imageElements
    );
  }
  /**
   * @method handleReset
   * @description Reset carousel
   */
  handleReset() {
    this.imageElements = [];
    this.carouselElem.destroy();
  }
  /**
   * @method render
   * @description rendering view of component
   */
  render() {
    $(this.mountSelector).append(`
            <div id='${this.uniqeComponentName}' class='container-carousel'>
              <form action='/'>
                <input class='container-input' placeholder='insert image link' type='text' required/>
                <button class='container-btn' type="submit">Submit</button>
                ${this.resetBtn ? `<button class='container-btn-reset' type="reset">Reset</button>` : ''}
              </form>
            <div id='${this.uniqeComponentName}-carousel' class='owl-carousel'>
            </div>
            </div>
          `);
    $(`#${this.uniqeComponentName} > form`).submit(this.handleBtnClick);
    $(`#${this.uniqeComponentName} > form .container-btn-reset`).click(this.handleReset);
  }
}

export default CarouselContainer;
