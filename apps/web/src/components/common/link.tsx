import * as React from 'react';
import Link from 'next/link';

interface LinkBtnType {
  name: string;
  path: string;
}

export default function LinkBtn({ name, path }: LinkBtnType) {
  return (
    <div className="flex justify-end mt-8">
      <Link
        passHref
        href={path}
        className="p-2 bg-primary-400 text-gray-50 hover:text-gray-50 hover:text-inherit shadow rounded tracking-widest uppercase text-xs hover:bg-primary-500 transition-colors">
        {name}
      </Link>
    </div>
  );
}
