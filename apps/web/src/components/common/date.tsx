import { CalendarDaysIcon } from 'lucide-react';
import React from 'react';

const formatDate = (isoString: string, locale: Intl.LocalesArgument = 'id-ID', year?: boolean) => {
  const date = new Date(isoString);
  return year
    ? new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
    : new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short' }).format(date);
};

interface DateProps {
  isoDate: string;
  locale?: Intl.LocalesArgument;
  showIcon?: boolean;
  className?: string;
  year?: boolean;
}

export default function DateReadable(props: DateProps) {
  return (
    <div className={`flex gap-3 items-center ${props.className}`}>
      {props.showIcon ? <CalendarDaysIcon className="w-4 h-4" /> : ''}
      <p>{formatDate(props.isoDate, 'id-ID', props.year)}</p>
    </div>
  );
}
