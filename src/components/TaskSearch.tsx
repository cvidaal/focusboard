import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type TaskSearchProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export const TaskSearch = ({
  searchQuery,
  onSearchChange,
}: TaskSearchProps) => {
  return (
    <div className="mb-4 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(event) => {
          onSearchChange(event.target.value);
        }}
        className="pl-10 pr-10"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-1/2 h-7 w-7 p-0"
          onClick={() => onSearchChange("")}
        >
          <X className="h4 w-4" />
        </Button>
      )}
    </div>
  );
};
