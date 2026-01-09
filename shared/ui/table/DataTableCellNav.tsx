import { useNavigate } from "react-router";

export function DataTableCellNav({
  route,
  value,
}: {
  route: string;
  value: any;
}) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(route)} className="hover:cursor-pointer">
      {value}
    </div>
  );
}
