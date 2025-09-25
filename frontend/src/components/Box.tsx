import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const Box = ({ className, children }: Props) => {
  return (
    <div className={cn("border rounded-md p-3", className)}>{children}</div>
  );
};

export default Box;
