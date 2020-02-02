import CarouselContainer from "src/components/carouselContainer";

it("renders without crashing", () => {
  document.body.innerHTML = `<div class="root"></div>`;
  const containerNumber = new CarouselContainer({ mountSelector: ".root" });
  const containerNumber2 = new CarouselContainer({ mountSelector: ".root", resetBtn: true });
});

it('renders correctly', () => {
  document.body.innerHTML = `<div class="root"></div>`;
  const containerNumber = new CarouselContainer({ mountSelector: ".root", name: 'test1' });
  const containerNumber2 = new CarouselContainer({ mountSelector: ".root", name: 'test2', resetBtn: true });
  expect(document.querySelector('.root')).toMatchSnapshot();
});
