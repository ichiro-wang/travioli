import { LoaderCircleIcon, type LucideProps } from "lucide-react";
import { cn } from "@/utils/cn";

type SpinnerVariantProps = Omit<SpinnerProps, "variant">;

const Circle = ({ className, ...props }: SpinnerVariantProps) => (
  <LoaderCircleIcon className={cn("animate-spin", className)} {...props} />
);

const Ellipsis = ({ size = 24, ...props }: SpinnerVariantProps) => {
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Loading...</title>
      <circle cx="4" cy="12" fill="currentColor" r="2">
        <animate
          attributeName="cy"
          begin="0;ellipsis3.end+0.25s"
          calcMode="spline"
          dur="0.6s"
          id="ellipsis1"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
      <circle cx="12" cy="12" fill="currentColor" r="2">
        <animate
          attributeName="cy"
          begin="ellipsis1.begin+0.1s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
      <circle cx="20" cy="12" fill="currentColor" r="2">
        <animate
          attributeName="cy"
          begin="ellipsis1.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          id="ellipsis3"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          values="12;6;12"
        />
      </circle>
    </svg>
  );
};

export type SpinnerProps = LucideProps & {
  variant?: "circle" | "ellipsis";
};

const Loader = ({ variant, ...props }: SpinnerProps) => {
  switch (variant) {
    case "circle":
      return <Circle {...props} />;
    case "ellipsis":
      return <Ellipsis {...props} />;
    default:
      return <Ellipsis {...props} />;
  }
};

export { Loader };
