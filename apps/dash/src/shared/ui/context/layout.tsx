import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from "react";

export type LayoutType = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
};
export const LayoutContext = createContext<LayoutType | undefined>(undefined);

export default function LayoutProvider({ children }: {} & PropsWithChildren) {
  const [title, setTitle] = useState<string>("");
  const contextValue = useMemo(
    () => ({
      title,
      setTitle,
    }),
    [title],
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
}
