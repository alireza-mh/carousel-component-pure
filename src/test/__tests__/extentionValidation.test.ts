import extensionValidation from "src/utils/extensionValidation";

it("Validate jpeg only (single value)", () => {
  const filePath = 'https://via.placeholder.com/150';
  const filePathJpeg = `${filePath}.jpeg`;
  const filePathPng = `${filePath}.png`;
  expect(extensionValidation(filePathJpeg, ['jpeg'])).toBe(true);
  expect(extensionValidation(filePathPng, ['jpeg'])).toBe(false);
});

it("multiple validation", () => {
  const filePath = 'https://via.placeholder.com/150';
  const filePathJpeg = `${filePath}.jpeg`;
  const filePathPng = `${filePath}.png`;
  const filePathSvg = `${filePath}.svg`;
  const filePathGif = `${filePath}.gif`;

  expect(extensionValidation(filePathJpeg, ['jpeg', 'svg', 'png'])).toBe(true);
  expect(extensionValidation(filePathPng, ['jpeg', 'svg', 'png'])).toBe(true);
  expect(extensionValidation(filePathSvg, ['jpeg', 'svg', 'png'])).toBe(true);
  expect(extensionValidation(filePathGif, ['jpeg', 'svg', 'png'])).toBe(false);

  /* capital letter extension */
  expect(extensionValidation(filePathJpeg, ['JPEG', 'SVG', 'PNG'])).toBe(true);
  expect(extensionValidation(filePathPng, ['JPEG', 'SVG', 'PNG'])).toBe(true);
  expect(extensionValidation(filePathSvg, ['JPEG', 'SVG', 'PNG'])).toBe(true);
  expect(extensionValidation(filePathGif, ['JPEG', 'SVG', 'PNG'])).toBe(false);

  /* capital letter filePath */
  expect(extensionValidation(filePathJpeg.toUpperCase(), ['jpeg', 'svg', 'png'])).toBe(true);
  expect(extensionValidation(filePathPng.toUpperCase(), ['jpeg', 'svg', 'png'])).toBe(true);
  expect(extensionValidation(filePathSvg.toUpperCase(), ['jpeg', 'svg', 'png'])).toBe(true);
  expect(extensionValidation(filePathGif.toUpperCase(), ['jpeg', 'svg', 'png'])).toBe(false);
});
