import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
  width?: number;
  sendHome?: boolean;
}

const Logo = ({ className, width = 300, sendHome = false }: Props) => {
  return (
    <Link to="/">
      <img
        className={cn(
          className,
          `${sendHome ? "cursor-pointer" : "cursor-auto"}`
        )}
        src="/primary-logo.webp"
        alt="Logo"
        width={width}
      />
    </Link>
  );
};

export default Logo;
