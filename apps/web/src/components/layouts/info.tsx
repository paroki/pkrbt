"use client";

import Address from "@/components/layouts/address";
import ContainerHeader from "@/components/layouts/container-header";
import ServiceTime from "@/components/layouts/service-time";
import SocialMedia from "@/components/layouts/social-media";

export default function Info() {
  return (
    <div className="grid gap-7 py-6 sm:grid-cols-2 md:grid-cols-3 text-sm leading-9">
      <div>
        <ContainerHeader
          size="smaller"
          className="text-center mb-4 border-b pb-2"
        >
          Media Paroki
        </ContainerHeader>
        <SocialMedia />
      </div>
      <div>
        <ContainerHeader
          size="smaller"
          className="text-center mb-4 border-b pb-2"
        >
          Jadwal Pelayanan
        </ContainerHeader>
        <ServiceTime />
      </div>
      <div>
        <ContainerHeader
          size="smaller"
          className="text-center mb-4 border-b pb-2"
        >
          Alamat
        </ContainerHeader>
        <Address />
      </div>
    </div>
  );
}
