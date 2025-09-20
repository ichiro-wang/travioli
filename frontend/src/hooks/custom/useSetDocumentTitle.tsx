import { useEffect } from "react";

export const useSetDocumentTitle = (title: string | undefined) => {
  const base = "Travioli";

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${base} | ${title}` : base;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};
