// components/ui/page-container.jsx
import { cn } from "@/lib/utils";

export default function PageContainer({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "flex-1 p-6 bg-background overflow-auto page-container",
        className
      )}
      {...props}
    >
      <div className="max-w-5xl mx-auto">{children}</div>
    </div>
  );
}
