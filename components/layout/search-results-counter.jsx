// components/layout/search-results-counter.jsx
import { useBankContext } from "@/app/context/bank-context";
import { Search } from "lucide-react";

export default function SearchResultsCounter() {
  // Step 1: Get the search context data
  const { branches, atms, isSearching, searchTerm } = useBankContext();

  // Step 2: Don't render anything if not searching
  if (!isSearching) return null;

  // Step 3: Calculate total results
  const totalResults = branches.length + atms.length;

  // Step 4: Return the formatted counter display
  return (
    <div className="text-xs text-muted-foreground px-2 py-1 flex items-center justify-between border-b mb-2">
      <div className="flex items-center">
        <Search className="h-3 w-3 mr-1" />
        <span>Results for "{searchTerm}"</span>
      </div>
      <span className="font-medium">
        {totalResults} {totalResults === 1 ? "result" : "results"}
      </span>
    </div>
  );
}
