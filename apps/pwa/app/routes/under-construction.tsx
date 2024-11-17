import DefaultLayout from "~/components/layout/DefaultLayout";
import UnderConstruction from "~/components/under-construction";

export default function Page() {
  return (
    <DefaultLayout>
      <div className="w-full p-4">
        <UnderConstruction />
      </div>
    </DefaultLayout>
  );
}
