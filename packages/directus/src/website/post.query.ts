export const postSearchFragment = `
id
title
slug
summary
category {
  id
  title
}
cover {
  id
  title
  description
  width
  height
}
publishedAt
createdBy {
  first_name
  last_name
}
`;

export const postSearchFields = `
...searchFragment
`;

export const postReadFields = `
...searchFragment
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
images {
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
