// components/ui/section-header.jsx
import { cn } from "@/lib/utils";

export default function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  className,
  ...props
}) {
  return (
    <div className={cn("flex items-center mb-6", className)} {...props}>
      {Icon && (
        <div className="mr-3 p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
