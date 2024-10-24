export const pageReadFields = `
id
title
slug
seo {
  title
  description
  image {
    id
    title
    description
    width
    height
  }
}
blocks {
  collection
  item {
    ... on block_hero {
      title
      subtitle
      content
      images {
        image {
          id
          title
          description
          width
          height
        }
      }
    }
    ... on block_markdown {
      body
    }
  }
}
`;
