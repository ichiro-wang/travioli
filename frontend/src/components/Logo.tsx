import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
  width?: number;
  sendHome?: boolean;
}

const Logo = ({ className, width = 300, sendHome = false }: Props) => {
  const navigate = useNavigate();
  const onClick = sendHome ? () => navigate("/", { replace: true }) : undefined;

  return (
    <img
      className={cn(
        className,
        `${sendHome ? "cursor-pointer" : "cursor-auto"}`
      )}
      src="/primary-logo.webp"
      alt="T Logo"
      width={width}
      onClick={onClick}
    />
  );
};

export default Logo;
