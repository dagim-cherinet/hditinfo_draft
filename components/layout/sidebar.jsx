// components/layout/sidebar.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useBankContext } from "@/app/context/bank-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import HighlightText from "@/components/ui/highlight-text";
import {
  Search,
  X,
  Network,
  Users,
  CreditCard,
  Globe,
  Laptop,
  Server,
  CircleDot,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

// NavButton component
function NavButton({
  icon: Icon,
  label,
  isActive,
  onClick,
  searchTerm = "",
  isChild = false,
}) {
  return (
    <Button
      variant="ghost"
      size={isChild ? "xs" : "sm"}
      className={cn(
        "w-full justify-start",
        isActive && "bg-primary/10 text-primary font-medium",
        isChild && "text-xs h-7"
      )}
      onClick={onClick}
    >
      {Icon && <Icon className={cn("mr-2", isChild ? "h-3 w-3" : "h-4 w-4")} />}
      <span className="flex-1 text-left">
        {searchTerm ? (
          <HighlightText text={label} highlight={searchTerm} />
        ) : (
          label
        )}
      </span>
    </Button>
  );
}

export default function Sidebar() {
  const {
    branches,
    atms,
    selectedBranch,
    selectedCategory,
    selectedItem,
    searchTerm,
    setSearchTerm,
    selectBranch,
    selectCategory,
    selectItem,
    navigateToAtm,
    isSearching,
    resetSelection,
  } = useBankContext();

  // Simple state tracking - just IDs
  const [openBranchIds, setOpenBranchIds] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  // When selected branch changes, make sure it's open
  useEffect(() => {
    if (selectedBranch && !openBranchIds.includes(selectedBranch.branchId)) {
      setOpenBranchIds([...openBranchIds, selectedBranch.branchId]);
    }
  }, [selectedBranch]);

  // Simple toggle function
  function toggleBranch(branchId) {
    if (openBranchIds.includes(branchId)) {
      // If it's open, close it
      setOpenBranchIds(openBranchIds.filter((id) => id !== branchId));
    } else {
      // If it's closed, open it
      setOpenBranchIds([...openBranchIds, branchId]);
    }
  }
  // Update useEffect to handle reset
  useEffect(() => {
    if (!selectedBranch) {
      setOpenBranchIds([]);
      setOpenCategory(null);
    }
  }, [selectedBranch]);
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Search input */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search branches, ATMs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-8"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-2">
        {/* Branches */}
        {branches.map((branch) => (
          <div
            key={branch.branchId}
            className="mb-2 border rounded-md overflow-hidden"
          >
            {/* Branch header */}
            <div
              className={cn(
                "flex justify-between items-center p-2 cursor-pointer",
                selectedBranch?.branchId === branch.branchId &&
                  !selectedCategory &&
                  "bg-primary/10 text-primary font-medium"
              )}
              onClick={() => {
                toggleBranch(branch.branchId);
                selectBranch(branch);
              }}
            >
              <span className="text-sm">
                <HighlightText
                  text={branch.branchName}
                  highlight={searchTerm}
                />
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  openBranchIds.includes(branch.branchId) &&
                    "transform rotate-180"
                )}
              />
            </div>

            {/* Branch content - only shown when open */}
            {openBranchIds.includes(branch.branchId) && (
              <div className="p-2">
                <div className="space-y-1 border-l-2 border-primary/10 pl-2 ml-3">
                  {/* IP Addresses */}
                  <div>
                    <NavButton
                      icon={Network}
                      label="IP Addresses"
                      isActive={
                        selectedBranch?.branchId === branch.branchId &&
                        selectedCategory === "ipAddresses" &&
                        !selectedItem
                      }
                      onClick={() => {
                        if (selectedCategory === "ipAddresses") {
                          setOpenCategory(null);
                          selectBranch(branch);
                        } else {
                          setOpenCategory("ipAddresses");
                          selectCategory(branch, "ipAddresses");
                        }
                      }}
                    />

                    {/* IP Address items */}
                    {openCategory === "ipAddresses" &&
                      selectedBranch?.branchId === branch.branchId && (
                        <div className="ml-3 mt-1 border-l-2 border-primary/10 pl-2 space-y-1">
                          <NavButton
                            icon={Globe}
                            label="WAN IP"
                            isChild={true}
                            isActive={selectedItem === "wanIp"}
                            onClick={() =>
                              selectItem(branch, "ipAddresses", "wanIp")
                            }
                            searchTerm={searchTerm}
                          />
                          <NavButton
                            icon={Laptop}
                            label="LAN IP"
                            isChild={true}
                            isActive={selectedItem === "lanIp"}
                            onClick={() =>
                              selectItem(branch, "ipAddresses", "lanIp")
                            }
                            searchTerm={searchTerm}
                          />
                          <NavButton
                            icon={Server}
                            label="Router Config"
                            isChild={true}
                            isActive={selectedItem === "routerConfig"}
                            onClick={() =>
                              selectItem(branch, "ipAddresses", "routerConfig")
                            }
                            searchTerm={searchTerm}
                          />
                          <NavButton
                            icon={Network}
                            label="Switch Config"
                            isChild={true}
                            isActive={selectedItem === "switchConfig"}
                            onClick={() =>
                              selectItem(branch, "ipAddresses", "switchConfig")
                            }
                            searchTerm={searchTerm}
                          />
                        </div>
                      )}
                  </div>

                  {/* Contact Persons */}
                  <div>
                    <NavButton
                      icon={Users}
                      label="Contact Persons"
                      isActive={
                        selectedBranch?.branchId === branch.branchId &&
                        selectedCategory === "contactPersons" &&
                        !selectedItem
                      }
                      onClick={() => {
                        if (selectedCategory === "contactPersons") {
                          setOpenCategory(null);
                          selectBranch(branch);
                        } else {
                          setOpenCategory("contactPersons");
                          selectCategory(branch, "contactPersons");
                        }
                      }}
                    />

                    {/* Contact Person items */}
                    {openCategory === "contactPersons" &&
                      selectedBranch?.branchId === branch.branchId && (
                        <div className="ml-3 mt-1 border-l-2 border-primary/10 pl-2 space-y-1">
                          <NavButton
                            icon={CircleDot}
                            label="Manager"
                            isChild={true}
                            isActive={selectedItem === "manager"}
                            onClick={() =>
                              selectItem(branch, "contactPersons", "manager")
                            }
                            searchTerm={searchTerm}
                          />
                          <NavButton
                            icon={CircleDot}
                            label="Operation Manager"
                            isChild={true}
                            isActive={selectedItem === "operationManager"}
                            onClick={() =>
                              selectItem(
                                branch,
                                "contactPersons",
                                "operationManager"
                              )
                            }
                            searchTerm={searchTerm}
                          />
                        </div>
                      )}
                  </div>

                  {/* ATMs */}
                  <div>
                    <NavButton
                      icon={CreditCard}
                      label="ATMs"
                      isActive={
                        selectedBranch?.branchId === branch.branchId &&
                        selectedCategory === "atms" &&
                        !selectedItem
                      }
                      onClick={() => {
                        if (selectedCategory === "atms") {
                          setOpenCategory(null);
                          selectBranch(branch);
                        } else {
                          setOpenCategory("atms");
                          selectCategory(branch, "atms");
                        }
                      }}
                    />

                    {/* ATM items */}
                    {openCategory === "atms" &&
                      selectedBranch?.branchId === branch.branchId &&
                      branch.atms &&
                      branch.atms.length > 0 && (
                        <div className="ml-3 mt-1 border-l-2 border-primary/10 pl-2 space-y-1">
                          {branch.atms.map((atm, index) => (
                            <NavButton
                              key={atm.atmId || index}
                              icon={CircleDot}
                              label={atm.atmName}
                              isChild={true}
                              isActive={selectedItem === index}
                              onClick={() => selectItem(branch, "atms", index)}
                              searchTerm={searchTerm}
                            />
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
