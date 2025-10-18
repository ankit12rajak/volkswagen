import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  className?: string;
}

const StatCard = ({ title, value, change, changeType = "neutral", icon: Icon, className }: StatCardProps) => {
  return (
    <div className={cn("glass p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && (
            <p
              className={cn(
                "text-sm font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          changeType === "positive" && "bg-success/10",
          changeType === "negative" && "bg-destructive/10",
          changeType === "neutral" && "bg-primary/10"
        )}>
          <Icon className={cn(
            "w-5 h-5",
            changeType === "positive" && "text-success",
            changeType === "negative" && "text-destructive",
            changeType === "neutral" && "text-primary"
          )} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
