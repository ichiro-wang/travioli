import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <h1>Error (404)</h1>
      <h1>Could not find the page you are looking for</h1>
      <Button onClick={() => navigate(-1)}>Return</Button>
    </div>
  );
};

export default PageNotFound;
