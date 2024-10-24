import { faker } from "@faker-js/faker";
import _ from "lodash";
import { getImages } from "./image.mjs";

export function createTitle() {
  return _.startCase(faker.lorem.words({ min: 2, max: 4 }));
}

export function createParagraphs() {
  return faker.lorem.paragraphs({ min: 3, max: 8 }, "\n\n");
}

export function extractSummary(content) {
  const regex = /^(?:([*_`]|\*\*|\[){0,1}[a-z]+)(.*)/gim;
  return content.match(regex)[0];
}

export function createContent() {
  return `
### ${createTitle()}

${createParagraphs()}

### ${createTitle()}

${createParagraphs()}

### ${createTitle()}

${createParagraphs()}

`;
}

export function typhographyContent() {
  return `
# Header 1

## Header 2

### Header 3

#### Header 4

# lists

- list 1
- list 2
- list 3

* test 1
* test 2
* test 3

# paragraph

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu egestas dui. Aenean ac dolor quam. Morbi pharetra cursus aliquet. Curabitur diam arcu, tincidunt cursus hendrerit vitae, efficitur nec metus. Vivamus ut mi nec lectus accumsan bibendum a accumsan justo. Etiam porta, elit sed ornare cursus, metus nisl eleifend lorem, at ornare ligula libero non sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi convallis ex quis lacinia feugiat. Pellentesque lobortis ante sit amet mi blandit, ac dignissim leo interdum. Cras sed felis erat. Integer vitae odio dolor. Proin at imperdiet urna. Vestibulum a tortor sed tellus porta imperdiet. Nulla lobortis hendrerit eros sit amet malesuada.

Mauris dolor erat, faucibus elementum placerat in, dictum vel risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempor sem in lectus vehicula porta ut malesuada justo. Proin lorem lorem, egestas a consectetur ullamcorper, porta quis lacus. Morbi eros urna, malesuada ac ornare sit amet, fermentum pretium nulla. Duis porttitor porttitor tellus, quis sagittis augue placerat et. Sed in leo auctor, posuere lectus ac, tempus tellus. Morbi molestie diam vel ultrices tempus. Ut interdum leo vel sodales vulputate. Mauris sed viverra metus. Mauris venenatis, lacus sit amet finibus efficitur, dui enim maximus felis, sit amet elementum ex massa in tellus.
`;
}

export function getImage() {
  const images = getImages();
  const index = faker.number.int({ min: 0, max: images.length - 1 });

  return images[index];
}
