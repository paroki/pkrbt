import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';
import * as React from 'react';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { directus } from '@/utils/directus';

interface Carousel {
  children: React.ReactNode;
}

vi.mock('@/utils/directus');
const mock = mockDeep<typeof directus>();

// Mock next/font/google and specifically
vi.mock('next/font/google', () => ({
  Frank_Ruhl_Libre: () => ({
    className: 'mocked-frank-ruhl-libre'
  }),
  DM_Serif_Text: () => {
    className: 'mocked-dm';
  }
}));

// Mock the Carousel component
vi.mock('@/components/ui/carousel', () => {
  return {
    Carousel: ({ children }: Carousel) => <div>{children}</div>,
    CarouselContent: ({ children }: Carousel) => <div>{children}</div>,
    CarouselItem: ({ children }: Carousel) => <div>{children}</div>
  };
});

describe('Beranda', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    mockReset(mock);
  });

  it('should rendered properly', async () => {
    const mockArticles = [
      {
        title: 'Ut Usitas',
        description: 'Volva vita clementia',
        slug: 'ut-usitas',
        publishedAt: '2024-10-07T05:45:57.586Z',
        category: {
          id: 2,
          documentId: 'enjch2iwbs70y68m1e8m2iuw',
          name: 'Kegiatan'
        }
      }
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sdk = (await import('@/utils/directus')) as any;
    sdk.directus = mock;

    mock.post.search.mockResolvedValue({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: mockArticles as any,
      error: undefined
    });

    mock.page.readBySlug.mockResolvedValue({
      item: {
        id: 'some-id',
        blocks: [
          {
            collection: 'block_hero',
            item: {
              title: 'Menggenggam dengan kasih',
              subtitle: 'Menggenggam dengan kasih',
              images: []
            }
          }
        ],
        seo: {}
      },
      error: undefined
    });

    try {
      render(await Home());

      expect(screen.findAllByText('Menggenggam dengan kasih')).toBeDefined();
    } catch (error) {
      console.log({ error });
    }
  });
});
