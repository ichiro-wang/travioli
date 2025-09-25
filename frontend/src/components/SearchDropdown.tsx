import { Search } from "lucide-react";
import { Input } from "./ui/input";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import React, { useState } from "react";

const noSearchResults: string[] = [
  "Start typing to search...",
  "Search does not work yet",
];
const mockSearchResults: string[] = ["Account 1", "Account 2", "Account 3"];

const SearchDropdown = () => {
  const [searchResults, setSearchResults] = useState<string[]>(noSearchResults);

  // simulating search with delay
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let timeout: NodeJS.Timeout | null = null;

    e.preventDefault();
    if (e.target.value.length === 0) {
      if (timeout) clearTimeout(timeout);

      setSearchResults(noSearchResults);
    } else {
      setSearchResults(["Loading..."]);

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        setSearchResults(mockSearchResults);
      }, 1000);
    }
  };

  return (
    <div className="flex gap-1 items-center">
      <Search size={20} />

      <NavigationMenuItem className="">
        <NavigationMenuTrigger
          className="p-0 hover:!bg-[initial] hover:!text-[initial]"
          showDownIcon={false}
          persistOnClick={true}
        >
          <Input
            className="w-[15rem]"
            id="searchBar"
            placeholder="Search..."
            type="text"
            onChange={onChange}
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent className="flex flex-col">
          <p className="text-left pb-2 mb-2 border-b-1">Search results</p>
          <ul className="flex flex-col gap-3">
            {searchResults.map((res) => (
              <li key={res}>{res}</li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </div>
  );
};

export default SearchDropdown;
