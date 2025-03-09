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
  Wifi,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import { useBankContext } from "@/app/context/bank-context";

export default function NetworkDetail({ branch, type }) {
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  // Helper function to copy text to clipboard
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopiedField(field);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get icon based on detail type
  const getIcon = () => {
    switch (type) {
      case "wanIp":
        return Globe;
      case "lanIp":
        return Laptop;
      case "tunnel":
        return Terminal;
      case "connection":
        return Wifi;
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
      case "tunnel":
        return "Tunnel Configuration";
      case "connection":
        return "Connection Details";
      default:
        return "Network Configuration";
    }
  };

  // Helper function to render a copyable field
  const renderCopyableField = (label, value, field) => {
    if (!value) return null;

    return (
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{label}</div>
        <div className="flex items-center">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm mr-2">
            {value}
          </code>
          <button
            onClick={() => copyToClipboard(value, field)}
            className="text-muted-foreground hover:text-foreground"
          >
            {copied && copiedField === field ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    );
  };

  // Helper function to render a simple field
  const renderField = (label, value) => {
    if (!value) return null;

    return (
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-sm">{value}</div>
      </div>
    );
  };

  const Icon = getIcon();
  const title = getTitle();

  return (
    <PageContainer>
      <SectionHeader
        icon={Icon}
        title={title}
        subtitle={branch["Branch Name"]}
      />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center">
              <Icon className="mr-2 h-4 w-4 text-primary" />
              {title}
            </div>
            <Badge variant="outline">
              {type === "wanIp" || type === "lanIp"
                ? "IP Config"
                : type === "tunnel"
                ? "Tunnel Config"
                : "Connection Details"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* WAN IP Configuration */}
            {type === "wanIp" && (
              <>
                {renderCopyableField(
                  "WAN IP Address",
                  branch["WAN Address"],
                  "wan"
                )}
                {renderField("Branch SN", branch["SN"])}
                {renderField("District", branch["District"])}
              </>
            )}

            {/* LAN IP Configuration */}
            {type === "lanIp" && (
              <>
                {renderCopyableField(
                  "LAN IP Address",
                  branch["LAN Address"],
                  "lan"
                )}
                {renderField("Branch SN", branch["SN"])}
                {renderField("District", branch["District"])}
              </>
            )}

            {/* Tunnel Configuration */}
            {type === "tunnel" && (
              <>
                {renderCopyableField(
                  "Tunnel IP DR-ER11",
                  branch["Tunnel IP DR-ER11"],
                  "dr-er11"
                )}
                {renderCopyableField(
                  "Tunnel IP DR-ER12",
                  branch["Tunnel IP DR-ER12"],
                  "dr-er12"
                )}
                {renderCopyableField(
                  "Tunnel IP DC-ER21",
                  branch["Tunnel IP DC-ER21"],
                  "dc-er21"
                )}
                {renderCopyableField(
                  "Tunnel IP DC-ER22",
                  branch["Tunnel IP DC-ER22"],
                  "dc-er22"
                )}

                <Separator className="my-2" />

                <div className="text-sm text-muted-foreground">
                  <p>
                    These tunnel IPs are used for secure VPN connections between
                    branch locations and data centers.
                  </p>
                </div>
              </>
            )}

            {/* Connection Details */}
            {type === "connection" && (
              <>
                {renderField("Connection Type", branch["Connection Type"])}
                {renderField("Service Number", branch["Service No."])}
                {renderField("Account Number", branch["Account No"])}

                <Separator className="my-2" />

                <div className="space-y-2">
                  <div className="text-sm font-medium">IP Addresses</div>
                  <div className="space-y-1">
                    <div className="text-sm flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      WAN: {branch["WAN Address"]}
                    </div>
                    <div className="text-sm flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      LAN: {branch["LAN Address"]}
                    </div>
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
