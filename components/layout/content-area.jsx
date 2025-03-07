// components/layout/content-area.jsx
"use client";

import { useBankContext } from "@/app/context/bank-context";
import WelcomeScreen from "@/components/screens/welcome";
import BranchOverview from "@/components/screens/branch-overview";
import NetworkOverview from "@/components/screens/network/overview";
import NetworkDetail from "@/components/screens/network/detail";
import ContactsOverview from "@/components/screens/contacts/overview";
import ContactDetail from "@/components/screens/contacts/detail";
import AtmsOverview from "@/components/screens/atms/overview";
import AtmDetail from "@/components/screens/atms/detail";

export default function ContentArea() {
  const { selectedBranch, selectedCategory, selectedItem } = useBankContext();

  // Welcome screen when no branch is selected
  if (!selectedBranch) {
    return <WelcomeScreen />;
  }

  // Branch overview when no category is selected
  if (!selectedCategory) {
    return <BranchOverview branch={selectedBranch} />;
  }

  // IP Addresses section
  if (selectedCategory === "ipAddresses") {
    if (!selectedItem) {
      return <NetworkOverview branch={selectedBranch} />;
    }

    return <NetworkDetail branch={selectedBranch} type={selectedItem} />;
  }

  // Contact Persons section
  if (selectedCategory === "contactPersons") {
    if (!selectedItem) {
      return <ContactsOverview branch={selectedBranch} />;
    }

    return <ContactDetail branch={selectedBranch} type={selectedItem} />;
  }

  // components/layout/content-area.jsx (continued)
  // ATMs section
  if (selectedCategory === "atms") {
    if (selectedItem === null) {
      return <AtmsOverview branch={selectedBranch} />;
    }

    return <AtmDetail branch={selectedBranch} atmIndex={selectedItem} />;
  }

  // Default fallback
  return (
    <div className="flex-1 p-6 bg-background">
      <div className="max-w-5xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold">
          Select a category from the sidebar
        </h1>
      </div>
    </div>
  );
}
