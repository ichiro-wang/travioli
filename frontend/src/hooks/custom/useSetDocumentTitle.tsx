import { useEffect } from "react";

export const useSetDocumentTitle = (title: string) => {
  const base = "Travioli";

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${base} | ${title}`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};
