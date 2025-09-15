import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  width?: number;
}

const Logo = ({ className, width = 300 }: Props) => {
  return (
    <img
      className={cn(className)}
      src="/primary-logo.webp"
      alt="/primary-logo.png"
      width={width}
    />
  );
};

export default Logo;
