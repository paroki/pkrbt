'use client';

const Day = ({ day, time }: { day: string; time: string }) => {
  return (
    <div className="flex">
      <div className="flex-[2] font-bold">{day}</div>
      <div className="flex-[1]">{time}</div>
    </div>
  );
};

export default function ServiceTime() {
  return (
    <div className="misa-group">
      <Day day="Senin-Sabtu" time="08.00 - 20.00" />
      <Day day="Minggu" time="08.00 - 15.00" />
    </div>
  );
}
