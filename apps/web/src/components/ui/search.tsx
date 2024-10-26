"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("keyword", term);
    } else {
      params.delete("keyword");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative my-6 group">
      <Input
        type="text"
        placeholder="Cari artikel atau kategori..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("keyword")?.toString()}
        className="my-0 pl-12 group"
      />
      <div className="absolute left-3 top-1/4 ">
        <SearchIcon className="w-5 h-5 text-gray-400 group-focus-within:text-gray-700 transition-all" />
      </div>
    </div>
  );
}
