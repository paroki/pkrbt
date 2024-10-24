import Container from "@/components/ui/container";
import Jumbotron from "@/app/homepage/components/jumbotron";
import ContainerHeader from "@/components/layouts/container-header";
import MainNews from "@/app/homepage/components/main-news";
import MassSchedule from "@/app/homepage/components/schedule";
import Marriages from "@/app/homepage/components/marriages";
import Rings from "@/components/icons/rings";
import { Text } from "@radix-ui/themes";
import ErrorBoundary from "@/components/ui/error-boundaries";
import { generateMeta, MetaImage } from "@/utils/meta";
import { fetchHomepage } from "./homepage/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const homepage = await fetchHomepage();

  if (!homepage) {
    return {};
  }

  const { title, description, image } = homepage.seo;
  return generateMeta({
    title,
    description,
    image: image as MetaImage,
    type: "article",
  });
}

export default async function Home() {
  const articles = []; // await getArticles();
  const marriages = []; // await getMarriages();
  const homepage = await fetchHomepage();

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
          {articles.length > 0 && (
            <Container className="bg-gray-50">
              <div className="max-w-screen-lg mx-auto">
                <ContainerHeader>Artikel</ContainerHeader>
                <MainNews articles={articles} />
              </div>
            </Container>
          )}
          {/*
          <Container className="bg-gray-50">
            <div className="max-w-screen-lg mx-auto">
              <ContainerHeader className="text-base">
                Warta Gereja
              </ContainerHeader>
              <Announcement />
            </div>
          </Container>
          */}
          {marriages.length > 0 && (
            <Container className="bg-gray-50">
              <div className="max-w-screen-lg mx-auto">
                <div className="flex gap-5 items-center flex-col md:flex-row">
                  <Rings />
                  <div>
                    <ContainerHeader className="text-base">
                      Akan Menerima Sakramen Perkawinan
                    </ContainerHeader>
                    <Text as="p" className="text-sm">
                      Jika umat mengetahui adanya halangan perkawinan ini, wajib
                      memberitahu pastor paroki
                    </Text>
                  </div>
                </div>
                <Marriages items={marriages} />
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
