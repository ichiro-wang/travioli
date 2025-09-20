import FullPage from "@/components/FullPage";
import { useSetDocumentTitle } from "@/hooks/custom/useSetDocumentTitle";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  useSetDocumentTitle("Page Not Found :(");

  return (
    <FullPage className="flex-col">
      <h1 className="font-bold text-2xl">Error (404)</h1>
      <h2>Could not find the page you are looking for</h2>
      <p>
        Return{" "}
        <Link to="/" className="text-blue-700 underline">
          home
        </Link>
      </p>
    </FullPage>
  );
};

export default PageNotFound;
