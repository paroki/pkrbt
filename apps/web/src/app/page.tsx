import Container from "@/components/ui/container";
import Jumbotron from "@/app/homepage/components/jumbotron";
import ContainerHeader from "@/components/layouts/container-header";
import MainNews from "@/app/homepage/components/main-news";
import MassSchedule from "@/app/homepage/components/schedule";
import ErrorBoundary from "@/components/ui/error-boundaries";
import { generateMeta, MetaImage } from "@/utils/meta";
import { fetchHomepage } from "./homepage/utils";
import { directus } from "@/utils/directus";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const homepage = await fetchHomepage();

  if (!homepage) {
    return {};
  }

  const { title, description, image } = homepage.seo;
  return await generateMeta({
    title,
    description,
    image: image as MetaImage,
    type: "article",
  });
}

export default async function Home() {
  const { items: posts, error } = await directus.post.search({ limit: 5 });

  if (error) {
    Promise.reject(error.cause);
  }
  // const marriages = []; // await getMarriages();
  const { item: homepage, error: homepageError } =
    await directus.page.readBySlug("beranda");
  if (homepageError) {
    Promise.reject(homepageError);
  }

  if (!homepage) {
    return <div>Loading</div>;
  }

  try {
    return (
      <ErrorBoundary>
        <div>
          {homepage && (
            <Container>
              <div className="max-w-screen-lg mx-auto">
                <Jumbotron homepage={homepage} />
              </div>
            </Container>
          )}

          <Container className="bg-white">
            <div className="max-w-screen-lg mx-auto">
              <ContainerHeader>Jadwal Misa</ContainerHeader>
              <MassSchedule />
            </div>
          </Container>
          {posts.length > 0 && (
            <Container className="bg-gray-50">
              <div className="max-w-screen-lg mx-auto">
                <ContainerHeader>Artikel</ContainerHeader>
                <MainNews posts={posts} />
              </div>
            </Container>
          )}
        </div>
      </ErrorBoundary>
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}
