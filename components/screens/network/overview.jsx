// components/screens/network/overview.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/components/ui/page-container";
import SectionHeader from "@/components/ui/section-header";
import { Network, Globe, Laptop, Server, AlertCircle } from "lucide-react";

export default function NetworkOverview({ branch }) {
  // Step 1: Prepare the component structure
  return (
    <PageContainer>
      {/* Step 2: Add the section header */}
      <SectionHeader
        icon={Network}
        title="Network Infrastructure"
        subtitle={branch.branchName}
      />

      {/* Step 3: Create a container for all cards */}
      <div className="space-y-6">
        {/* Step 4: IP Addresses Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="mr-2 h-4 w-4 text-primary" />
                IP Addresses
              </div>
              <Badge variant="outline">Core</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 5: WAN and LAN IPs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">WAN IP</div>
                <div className="flex items-center">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    {branch.ipAddresses.wanIp}
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">LAN IP</div>
                <div className="flex items-center">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    {branch.ipAddresses.lanIp}
                  </code>
                </div>
              </div>
            </div>

            {/* Step 6: Visual separator */}
            <Separator className="my-2" />

            {/* Step 7: Subnet and Gateway */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Subnet Mask</div>
                <div className="flex items-center">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    {branch.ipAddresses.subnetMask || "255.255.255.0"}
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Gateway</div>
                <div className="flex items-center">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    {branch.ipAddresses.gateway || "192.168.1.1"}
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 8: Network Devices Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center">
                <Server className="mr-2 h-4 w-4 text-primary" />
                Network Devices
              </div>
              <Badge variant="outline">Hardware</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 9: Router and Switch details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Router */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Router</div>
                  <Badge variant="secondary">Primary</Badge>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Model:</span>{" "}
                  {branch.networkDevices?.router?.model || "Cisco 2900 Series"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">IP:</span>{" "}
                  {branch.networkDevices?.router?.ip || "192.168.1.1"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Firmware:</span>{" "}
                  {branch.networkDevices?.router?.firmware || "15.7(3)M3"}
                </div>
              </div>

              {/* Switch */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Switch</div>
                  <Badge variant="secondary">Core</Badge>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Model:</span>{" "}
                  {branch.networkDevices?.switch?.model ||
                    "Cisco Catalyst 2960"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">IP:</span>{" "}
                  {branch.networkDevices?.switch?.ip || "192.168.1.2"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Ports:</span>{" "}
                  {branch.networkDevices?.switch?.ports || "24"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 10: Network Status Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="mr-2 h-4 w-4 text-primary" />
              Network Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 11: Status details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Link Status</div>
                <Badge className="bg-green-500 hover:bg-green-600">
                  Connected
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Bandwidth</div>
                <div className="text-sm">
                  {branch.networkStatus?.bandwidth || "10 Mbps"}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Last Outage</div>
                <div className="text-sm">
                  {branch.networkStatus?.lastOutage || "None in last 30 days"}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Uptime</div>
                <div className="text-sm">
                  {branch.networkStatus?.uptime || "99.9%"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
