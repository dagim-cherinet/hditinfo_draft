// components/screens/atms/overview.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/components/ui/page-container";
import SectionHeader from "@/components/ui/section-header";
import {
  CreditCard,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AtmsOverview({ branch }) {
  // Step 1: Calculate ATM statistics
  const totalAtms = branch.atms.length;
  const activeAtms = branch.atms.filter(
    (atm) => atm.status === "active"
  ).length;
  const inactiveAtms = totalAtms - activeAtms;

  // Step 2: Return the component JSX
  return (
    <PageContainer>
      {/* Step 3: Add section header */}
      <SectionHeader
        icon={CreditCard}
        title="ATM Machines"
        subtitle={branch.branchName}
      />

      {/* Step 4: Add ATM status summary card */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <AlertCircle className="mr-2 h-4 w-4 text-primary" />
            ATM Status Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step 5: Display ATM statistics in a grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1 text-center p-2 rounded-lg bg-background border">
              <div className="text-2xl font-bold">{totalAtms}</div>
              <div className="text-xs text-muted-foreground">Total ATMs</div>
            </div>

            <div className="space-y-1 text-center p-2 rounded-lg bg-green-50 border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {activeAtms}
              </div>
              <div className="text-xs text-green-600">Active</div>
            </div>

            <div className="space-y-1 text-center p-2 rounded-lg bg-red-50 border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {inactiveAtms}
              </div>
              <div className="text-xs text-red-600">Inactive</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 6: List all ATMs */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">All ATM Machines</h2>

        {/* Step 7: Map through each ATM and create a card */}
        {branch.atms.map((atm, index) => (
          <Card key={atm.atmId || index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-md flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-primary" />
                  {atm.atmName}
                </div>
                <Badge
                  variant={atm.status === "active" ? "success" : "destructive"}
                >
                  {atm.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Step 8: Display ATM details in a grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Location
                      </div>
                      <div className="text-sm">
                        {atm.location || "Main Branch Entrance"}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">ATM Type:</span>{" "}
                    {atm.type || "Cash Withdrawal & Deposit"}
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">Serial Number:</span>{" "}
                    {atm.serialNumber || `ATM-${index + 1000}`}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium">Last Maintained:</span>{" "}
                    {atm.lastMaintenance || "2023-05-15"}
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">Cash Status:</span>{" "}
                    {atm.cashStatus || "OK"}
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">IP Address:</span>{" "}
                    {atm.ipAddress || `192.168.1.${10 + index}`}
                  </div>
                </div>
              </div>

              {/* Step 9: Add services offered section */}
              <Separator className="my-3" />

              <div className="space-y-2">
                <div className="text-sm font-medium">Services Offered</div>
                <div className="flex flex-wrap gap-2">
                  {(
                    atm.services || [
                      "Cash Withdrawal",
                      "Balance Inquiry",
                      "Mini Statement",
                      "Funds Transfer",
                    ]
                  ).map((service) => (
                    <Badge key={service} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
