// components/screens/atms/detail.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/components/ui/page-container";
import SectionHeader from "@/components/ui/section-header";
import { CreditCard, MapPin, Server, Wifi, Globe } from "lucide-react";

export default function AtmDetail({ branch, atmIndex }) {
  // Step 1: Get the specific ATM data
  const atm = branch.atms[atmIndex] || {};

  // Step 2: Return the simplified component structure
  return (
    <PageContainer>
      {/* Step 3: Add the section header with ATM name */}
      <SectionHeader
        icon={CreditCard}
        title={atm.atmName || `ATM #${atmIndex + 1}`}
        subtitle={`${branch.branchName} - ATM Details`}
      />

      {/* Step 4: Basic information card */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4 text-primary" />
              Basic Information
            </div>
            <Badge
              variant={atm.status === "active" ? "success" : "destructive"}
            >
              {atm.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
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
                <span className="font-medium">Model:</span>{" "}
                {atm.model || "NCR SelfServ 80 Series"}
              </div>

              <div className="text-sm">
                <span className="font-medium">Serial Number:</span>{" "}
                {atm.serialNumber || `ATM-${1000 + atmIndex}`}
              </div>
            </div>

            <div className="space-y-3">
              {/* Include location coordinates if available */}
              {atm.coordinates?.latitude && atm.coordinates?.longitude && (
                <div className="text-sm">
                  <span className="font-medium">Coordinates:</span>{" "}
                  {atm.coordinates.latitude}, {atm.coordinates.longitude}
                </div>
              )}

              <div className="text-sm">
                <span className="font-medium">Operating Hours:</span>{" "}
                {atm.operatingHours || "24/7"}
              </div>

              <div className="text-sm">
                <span className="font-medium">Services:</span>{" "}
                {atm.serviceTypes ||
                  "Cash Withdrawal, Balance Inquiry, Mini Statement"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 5: Hardware specifications */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Server className="mr-2 h-4 w-4 text-primary" />
            Hardware Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="text-sm">
                <span className="font-medium">Processor:</span>{" "}
                {atm.hardware?.processor || "Intel Core i5"}
              </div>
              <div className="text-sm">
                <span className="font-medium">Memory:</span>{" "}
                {atm.hardware?.memory || "8GB RAM"}
              </div>
              <div className="text-sm">
                <span className="font-medium">Storage:</span>{" "}
                {atm.hardware?.storage || "500GB SSD"}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm">
                <span className="font-medium">Card Reader:</span>{" "}
                {atm.hardware?.cardReader || "EMV Compliant"}
              </div>
              <div className="text-sm">
                <span className="font-medium">Cash Dispenser:</span>{" "}
                {atm.hardware?.cashDispenser || "4 Cassettes"}
              </div>
              <div className="text-sm">
                <span className="font-medium">Receipt Printer:</span>{" "}
                {atm.hardware?.printer || "Thermal Printer"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 6: Network and software information */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Wifi className="mr-2 h-4 w-4 text-primary" />
            Network & Software
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Network information */}
            <div>
              <h3 className="text-sm font-medium mb-2">
                Network Configuration
              </h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">IP Address:</span>{" "}
                  {atm.network?.ip || "192.168.1.100"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Subnet Mask:</span>{" "}
                  {atm.network?.subnet || "255.255.255.0"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Gateway:</span>{" "}
                  {atm.network?.gateway || "192.168.1.1"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Connection Type:</span>{" "}
                  {atm.network?.connectionType || "Ethernet"}
                </div>
              </div>
            </div>

            {/* Software information */}
            <div>
              <h3 className="text-sm font-medium mb-2">Software Information</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Operating System:</span>{" "}
                  {atm.software?.os || "Windows 10 IoT Enterprise"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">ATM Software:</span>{" "}
                  {atm.software?.atmSoftware || "NCR APTRA"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Software Version:</span>{" "}
                  {atm.software?.version || "v4.5.2"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
