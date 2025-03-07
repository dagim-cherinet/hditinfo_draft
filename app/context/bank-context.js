// app/context/bank-context.js
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { bankData } from "../data/bank-data";

// Step 1: Create the context
const BankContext = createContext(undefined);

// Step 2: Create the provider component
export function BankProvider({ children }) {
  // Step 3: Set up state for navigation
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Step 4: Set up state for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    branches: bankData.bank.branches,
    atms: [],
  });

  // Step 5: Create a debounce effect for search performance
  useEffect(() => {
    // Create a timer that will update the debounced search term after a delay
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay for better performance

    // Clean up the timer if searchTerm changes before timeout completes
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Step 6: Process search results when debounced term changes
  useEffect(() => {
    // If search is empty, show all branches and no ATMs
    if (!debouncedSearchTerm.trim()) {
      setSearchResults({
        branches: bankData.bank.branches,
        atms: [],
      });
      return;
    }

    // Convert search term to lowercase for case-insensitive matching
    const term = debouncedSearchTerm.toLowerCase();

    // Step 7: Filter branches based on search criteria
    const filteredBranches = bankData.bank.branches.filter(
      (branch) =>
        branch.branchName?.toLowerCase().includes(term) ||
        branch.city?.toLowerCase().includes(term) ||
        branch.address?.toLowerCase().includes(term) ||
        branch.region?.toLowerCase().includes(term)
    );

    // Step 8: Find ATMs that match the search across all branches
    const filteredAtms = [];
    bankData.bank.branches.forEach((branch) => {
      // Skip if branch has no ATMs
      if (!branch.atms) return;

      // Find matching ATMs in this branch
      const branchAtms = branch.atms.filter(
        (atm) =>
          atm.atmName?.toLowerCase().includes(term) ||
          atm.location?.toLowerCase().includes(term) ||
          atm.type?.toLowerCase().includes(term)
      );

      // Add branch information to each matching ATM
      if (branchAtms.length > 0) {
        branchAtms.forEach((atm) => {
          filteredAtms.push({
            ...atm,
            branchId: branch.branchId,
            branchName: branch.branchName,
          });
        });
      }
    });

    // Step 9: Update the search results state
    setSearchResults({
      branches: filteredBranches,
      atms: filteredAtms,
    });
  }, [debouncedSearchTerm]);

  // Step 10: Create navigation helper functions

  // Select a branch (clears category and item selection)
  const selectBranch = useCallback((branch) => {
    setSelectedBranch(branch);
    setSelectedCategory(null);
    setSelectedItem(null);
  }, []);

  // Select a category within a branch (clears item selection)
  const selectCategory = useCallback((branch, category) => {
    setSelectedBranch(branch);
    setSelectedCategory(category);
    setSelectedItem(null);
  }, []);

  // Select a specific item within a category
  const selectItem = useCallback((branch, category, item) => {
    setSelectedBranch(branch);
    setSelectedCategory(category);
    setSelectedItem(item);
  }, []);

  // Step 11: Create a function to navigate to an ATM from search results
  const navigateToAtm = useCallback((atm) => {
    // Find the branch that contains this ATM
    const branch = bankData.bank.branches.find(
      (b) => b.branchId === atm.branchId
    );
    if (!branch) return;

    // Find the index of the ATM within that branch
    const atmIndex = branch.atms.findIndex((a) => a.atmId === atm.atmId);
    if (atmIndex === -1) return;

    // Navigate to that ATM
    selectItem(branch, "atms", atmIndex);
  }, []);

  // Add reset function
  const resetSelection = () => {
    setSelectedBranch(null);
    setSelectedCategory(null);
    setSelectedItem(null);
  };

  // Step 12: Create the context value object with all needed data and functions
  const contextValue = {
    // Data from search results
    branches: searchResults.branches,
    atms: searchResults.atms,

    // Selected items for navigation
    selectedBranch,
    selectedCategory,
    selectedItem,

    // Search state
    searchTerm,
    setSearchTerm,
    isSearching: searchTerm.trim().length > 0,

    // Navigation functions
    selectBranch,
    selectCategory,
    selectItem,
    navigateToAtm,

    // reset selection
    resetSelection,

    // Bank data for reference
    bankData: bankData.bank,
  };

  // Step 13: Return the provider with the context value
  return (
    <BankContext.Provider value={contextValue}>{children}</BankContext.Provider>
  );
}

// Step 14: Create a custom hook for using the context
export function useBankContext() {
  const context = useContext(BankContext);

  // Make sure the hook is used within a provider
  if (context === undefined) {
    throw new Error("useBankContext must be used within a BankProvider");
  }

  return context;
}
