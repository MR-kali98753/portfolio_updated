import { Badge } from "@/components/ui/badge";

interface ProjectFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ProjectFilter = ({ categories, activeCategory, onCategoryChange }: ProjectFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
            activeCategory === category
              ? "bg-gradient-primary text-primary-foreground border-0 hover:opacity-90"
              : "border-border bg-surface-light/30 text-text-secondary hover:bg-surface-light/50 hover:text-text-primary"
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};