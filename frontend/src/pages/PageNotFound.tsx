import { useSetDocumentTitle } from "@/hooks/custom/useSetDocumentTitle";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  useSetDocumentTitle("Page Not Found :(");

  return (
    <div className="flex flex-col gap-3">
      <h1>Error (404)</h1>
      <h1>Could not find the page you are looking for</h1>
      <h1>Hello World!</h1>
    </div>
  );
};

export default PageNotFound;
