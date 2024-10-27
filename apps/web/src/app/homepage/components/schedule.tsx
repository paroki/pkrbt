const Day = ({ day, time }: { day: string; time: string }) => {
  return (
    <div className="flex">
      <div className="flex-[2] font-bold text-primary-600">{day}</div>
      <div className="flex-[1]">{time}</div>
    </div>
  );
};

export type ContainerHeaderType = {
  children: React.ReactNode; // Deklarasikan tipe children
};

const Header = ({ children }: ContainerHeaderType) => {
  return (
    <h4 className="my-2 border-y border-gray-200 text-base py-4 w-full text-center">
      {children}
    </h4>
  );
};

export default function MassSchedule() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-base leading-9">
      <div className="misa-group">
        <Header>Misa Mingguan</Header>
        <Day day="Sabtu" time="18:00" />
        <Day day="Minggu" time="08:00" />
      </div>
      <div className="misa-group">
        <Header>Misa Harian</Header>
        <Day day="Senin" time="05:30" />
        <Day day="Selasa" time="05:30" />
        <Day day="Rabu" time="18:00" />
        <Day day="Kamis" time="05:30" />
        <Day day="Jumat" time="18:00" />
      </div>
      <div className="misa-group">
        <Header>Misa Devosi Keluarga Kudus</Header>
        <Day day="Rabu" time="18:00" />
      </div>
      <div className="misa-group">
        <Header>Jumat Pertama</Header>
        <Day day="Jumat" time="18:00" />
      </div>
    </div>
  );
}
