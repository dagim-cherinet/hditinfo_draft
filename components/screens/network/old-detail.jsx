// components/screens/network/detail.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/components/ui/page-container";
import SectionHeader from "@/components/ui/section-header";
import {
  Network,
  Globe,
  Laptop,
  Server,
  Copy,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function NetworkDetail({ branch, type }) {
  const [copied, setCopied] = useState(false);

  // Helper function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get icon based on detail type
  const getIcon = () => {
    switch (type) {
      case "wanIp":
        return Globe;
      case "lanIp":
        return Laptop;
      case "routerConfig":
        return Server;
      case "switchConfig":
        return Network;
      default:
        return Network;
    }
  };

  // Get title based on detail type
  const getTitle = () => {
    switch (type) {
      case "wanIp":
        return "WAN IP Configuration";
      case "lanIp":
        return "LAN IP Configuration";
      case "routerConfig":
        return "Router Configuration";
      case "switchConfig":
        return "Switch Configuration";
      default:
        return "Network Configuration";
    }
  };

  // Get data based on detail type
  const getData = () => {
    switch (type) {
      case "wanIp":
        return {
          ip: branch.ipAddresses.wanIp,
          subnet: branch.ipAddresses.wanSubnet || "255.255.255.0",
          gateway: branch.ipAddresses.wanGateway || "10.0.0.1",
          dns: branch.ipAddresses.dns || ["8.8.8.8", "8.8.4.4"],
          provider: branch.ipAddresses.provider || "Ethio Telecom",
        };
      case "lanIp":
        return {
          ip: branch.ipAddresses.lanIp,
          subnet: branch.ipAddresses.lanSubnet || "255.255.255.0",
          dhcpRange:
            branch.ipAddresses.dhcpRange || "192.168.1.100 - 192.168.1.200",
          vlan: branch.ipAddresses.vlan || "VLAN 1 (Default)",
        };
      case "routerConfig":
        return {
          model: branch.networkDevices?.router?.model || "Cisco 2900 Series",
          firmware: branch.networkDevices?.router?.firmware || "15.7(3)M3",
          ip: branch.networkDevices?.router?.ip || "192.168.1.1",
          username: branch.networkDevices?.router?.username || "admin",
          accessMethod:
            branch.networkDevices?.router?.accessMethod || "SSH, HTTPS",
        };
      case "switchConfig":
        return {
          model: branch.networkDevices?.switch?.model || "Cisco Catalyst 2960",
          firmware: branch.networkDevices?.switch?.firmware || "15.2(2)E5",
          ip: branch.networkDevices?.switch?.ip || "192.168.1.2",
          ports: branch.networkDevices?.switch?.ports || "24",
          vlans: branch.networkDevices?.switch?.vlans || [
            "VLAN 1 (Default)",
            "VLAN 10 (Voice)",
            "VLAN 20 (Data)",
          ],
        };
      default:
        return {};
    }
  };

  const Icon = getIcon();
  const title = getTitle();
  const data = getData();

  return (
    <PageContainer>
      <SectionHeader icon={Icon} title={title} subtitle={branch.branchName} />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center">
              <Icon className="mr-2 h-4 w-4 text-primary" />
              {title} Details
            </div>
            <Badge variant="outline">
              {type === "wanIp" || type === "lanIp"
                ? "IP Config"
                : "Device Config"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* IP Address Details */}
            {(type === "wanIp" || type === "lanIp") && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">IP Address</div>
                  <div className="flex items-center">
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm mr-2">
                      {data.ip}
                    </code>
                    <button
                      onClick={() => copyToClipboard(data.ip)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Subnet Mask</div>
                  <div className="text-sm">{data.subnet}</div>
                </div>

                {type === "wanIp" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Gateway</div>
                      <div className="text-sm">{data.gateway}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">DNS Servers</div>
                      <div className="text-sm">{data.dns.join(", ")}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">
                        Service Provider
                      </div>
                      <div className="text-sm">{data.provider}</div>
                    </div>
                  </>
                )}

                {type === "lanIp" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">DHCP Range</div>
                      <div className="text-sm">{data.dhcpRange}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">VLAN</div>
                      <div className="text-sm">{data.vlan}</div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Router Configuration */}
            {type === "routerConfig" && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Model</div>
                  <div className="text-sm">{data.model}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Firmware Version</div>
                  <div className="text-sm">{data.firmware}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">IP Address</div>
                  <div className="text-sm">{data.ip}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Login Username</div>
                  <div className="text-sm">{data.username}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Access Methods</div>
                  <div className="text-sm">{data.accessMethod}</div>
                </div>
              </>
            )}

            {/* Switch Configuration */}
            {type === "switchConfig" && (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Model</div>
                  <div className="text-sm">{data.model}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Firmware Version</div>
                  <div className="text-sm">{data.firmware}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">IP Address</div>
                  <div className="text-sm">{data.ip}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Total Ports</div>
                  <div className="text-sm">{data.ports}</div>
                </div>

                <Separator className="my-2" />

                <div className="space-y-2">
                  <div className="text-sm font-medium">Configured VLANs</div>
                  <div className="space-y-1">
                    {data.vlans.map((vlan, index) => (
                      <div key={index} className="text-sm flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        {vlan}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
