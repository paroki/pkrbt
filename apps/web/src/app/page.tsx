import Container from "@/components/ui/container";
import Jumbotron from "@/app/homepage/jumbotron";
import ContainerHeader from "@/components/container-header";
import MainNews from "@/components/main-news";
import MassSchedule from "@/components/schedule";
import Marriages from "@/components/marriages";
import Rings from "@/components/icons/rings";
import { Text } from "@radix-ui/themes";
import { getArticles, getMarriages } from "@/utils/api";
import ErrorBoundary from "@/components/ui/error-boundaries";
import { fetchHomepage } from "./homepage/utils";
import { generateMeta } from "@/utils/meta";
import { Image } from "@pkrbt/openapi";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const homepage = await fetchHomepage();

  if (!homepage) {
    return {};
  }

  const { metaTitle, metaDescription, metaImage } = homepage;
  return generateMeta({
    title: metaTitle,
    description: metaDescription,
    image: metaImage as Required<Image>,
    type: "website",
  });
}

export default async function Home() {
  const articles = await getArticles();
  const marriages = await getMarriages();
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
          {marriages.length && (
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
