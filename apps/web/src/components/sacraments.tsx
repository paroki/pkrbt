import { Frank_Ruhl_Libre as Frank } from 'next/font/google';
import { Text } from '@radix-ui/themes';
import DateReadable from './date';
import { MarriagesProps } from '@/utils/api';
import { groupByWeeks } from '@/utils/group-marriages';
import React from 'react';

const frank = Frank({
  subsets: ['latin']
});

function MarriagesItem({ items }: { items: MarriagesProps[] }) {
  return (
    <>
      {items.length > 0 ? (
        <>
          {items.map((data, index) => (
            <div className="marriage-el-children-container" key={index}>
              <div className="marriage-el-children">
                <div className="w-64">
                  <h4>{data.groomName}</h4>
                  <Text as="p" className="text-sm">
                    {data.groomFrom}
                  </Text>
                </div>
                <div className={`text-2xl md:text-5xl text-primary-400 text-center p-4 ${frank.className}`}>&</div>
                <div className="w-64 text-right">
                  <h4>{data.brideName}</h4>
                  <Text as="p" className="text-sm">
                    {data.brideFrom}
                  </Text>
                </div>
              </div>
              <div className="flex w-full justify-center gap-6 my-2 mt-6 text-sm text-gray-500">
                <DateReadable isoDate={data.startAt} year />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="p-2 my-2 border text-sm text-center rounded bg-gray-100">Tidak ada pengumuman.</div>
      )}
    </>
  );
}

interface MarriagesContainerProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  number: number;
}

function MarriagesContainer({ children, title, number, className }: MarriagesContainerProps) {
  return (
    <div className={`py-2 pb-3 ${className}`}>
      <h4 className="uppercase tracking-widest text-base">
        <span className="p-1 px-2 mr-3 text-sm bg-gray-200 text-gray-500 rounded">{number}</span>
        {title}
      </h4>
      {children}
    </div>
  );
}

export default async function Sacraments({ items }: { items: MarriagesProps[] }) {
  const groupedMarriages = groupByWeeks(items);

  return (
    <div className="space-y-6 mt-8">
      <MarriagesContainer title="Pengumuman Pertama" number={1}>
        <MarriagesItem items={groupedMarriages.first} />
      </MarriagesContainer>
      <MarriagesContainer title="Pengumuman Kedua" number={2}>
        <MarriagesItem items={groupedMarriages.second} />
      </MarriagesContainer>
      <MarriagesContainer title="Pengumuman Ketiga" number={3}>
        <MarriagesItem items={groupedMarriages.third} />
      </MarriagesContainer>
    </div>
  );
}
