import api from '@/utils/strapi';

export async function getArticles(limit: number = 5) {
  // TODO: fix unit test error
  try {
    const { items } = await api.article.search({
      page: 1,
      limit,
      sort: ['publishedAt:desc']
    });

    return items;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export interface MarriagesProps {
  id: number;
  documentId: string;
  groomName: string;
  groomFrom: string;
  brideName: string;
  brideFrom: string;
  startAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: null;
}

export async function getMarriages(limit: number = 99) {
  const data = await api.fetch.GET('/an-marriages', {
    params: {
      query: {
        'pagination[limit]': limit,
        sort: 'startAt:desc'
      }
    }
  });

  return data.data?.data as MarriagesProps[];
}
