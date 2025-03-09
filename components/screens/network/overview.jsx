// components/screens/network/detail.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import PageContainer from "@/components/ui/page-container";
import SectionHeader from "@/components/ui/section-header";
import {
  Network,
  Copy,
  CheckCircle,
  Wifi,
  Globe,
  Terminal,
  Server,
  CreditCard,
  Edit,
  Save,
} from "lucide-react";

export default function NetworkDetail({ branch, onUpdateBranch }) {
  // Step 1: Create state variables
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState("");
  const [editConnectionOpen, setEditConnectionOpen] = useState(false);
  const [editTunnelOpen, setEditTunnelOpen] = useState(false);
  const [editedConnectionData, setEditedConnectionData] = useState({});
  const [editedTunnelData, setEditedTunnelData] = useState({});

  // Step 2: Function to copy text to clipboard
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopiedField(field);
    setTimeout(() => setCopied(false), 2000);
  };

  // Step 3: Define field configurations
  const leftColumnFields = [
    { label: "Connection Type", key: "Connection Type", icon: Wifi },
    { label: "Service Number", key: "Service No.", icon: Server },
    { label: "Account Number", key: "Account No", icon: CreditCard },
    { label: "WAN Address", key: "WAN Address", copyable: true, icon: Globe },
    { label: "LAN Address", key: "LAN Address", copyable: true, icon: Globe },
  ];

  const rightColumnFields = [
    {
      label: "Tunnel IP DR-ER11",
      key: "Tunnel IP DR-ER11",
      copyable: true,
      icon: Terminal,
    },
    {
      label: "Tunnel IP DR-ER12",
      key: "Tunnel IP DR-ER12",
      copyable: true,
      icon: Terminal,
    },
    {
      label: "Tunnel IP DC-ER21",
      key: "Tunnel IP DC-ER21",
      copyable: true,
      icon: Terminal,
    },
    {
      label: "Tunnel IP DC-ER22",
      key: "Tunnel IP DC-ER22",
      copyable: true,
      icon: Terminal,
    },
  ];

  // Step 4: Initialize edit data when dialog opens
  const handleEditConnection = () => {
    setEditedConnectionData({
      "Connection Type": branch["Connection Type"],
      "Service No.": branch["Service No."],
      "Account No": branch["Account No"],
      "WAN Address": branch["WAN Address"],
      "LAN Address": branch["LAN Address"],
    });
    setEditConnectionOpen(true);
  };

  const handleEditTunnel = () => {
    setEditedTunnelData({
      "Tunnel IP DR-ER11": branch["Tunnel IP DR-ER11"],
      "Tunnel IP DR-ER12": branch["Tunnel IP DR-ER12"],
      "Tunnel IP DC-ER21": branch["Tunnel IP DC-ER21"],
      "Tunnel IP DC-ER22": branch["Tunnel IP DC-ER22"],
    });
    setEditTunnelOpen(true);
  };

  // Step 5: Update functions
  const handleConnectionUpdate = () => {
    // Create updated branch data
    const updatedBranch = { ...branch, ...editedConnectionData };

    // Call the update function passed as prop
    if (onUpdateBranch) {
      onUpdateBranch(updatedBranch);
    }

    setEditConnectionOpen(false);
  };

  const handleTunnelUpdate = () => {
    // Create updated branch data
    const updatedBranch = { ...branch, ...editedTunnelData };

    // Call the update function passed as prop
    if (onUpdateBranch) {
      onUpdateBranch(updatedBranch);
    }

    setEditTunnelOpen(false);
  };

  // Step 6: Create a reusable field renderer
  const renderField = (field) => (
    <div
      key={field.key}
      className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-muted/30 px-2 rounded transition-colors"
    >
      <div className="flex items-center space-x-2">
        {field.icon && <field.icon className="h-4 w-4 text-primary" />}
        <span className="font-medium">{field.label}</span>
      </div>
      <div>
        {field.copyable ? (
          <div className="flex items-center space-x-2">
            <code className="bg-primary/5 text-primary px-2 py-1 rounded-md text-sm font-mono">
              {branch[field.key]}
            </code>
            <button
              onClick={() => copyToClipboard(branch[field.key], field.key)}
              className="text-muted-foreground hover:text-primary hover:scale-110 transition-all"
              aria-label={`Copy ${field.label}`}
            >
              {copied && copiedField === field.key ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        ) : (
          <span className="text-sm">{branch[field.key]}</span>
        )}
      </div>
    </div>
  );

  // Step 7: Render the component
  return (
    <PageContainer>
      <SectionHeader
        icon={Network}
        title="Network Configuration"
        subtitle={branch["Branch Name"]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Connection Details */}
        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2 border-b border-primary/10">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <Wifi className="mr-2 h-5 w-5 text-primary" />
                Connection Details
              </CardTitle>

              {/* Edit button for connection details */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditConnection}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Connection Details</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Primary connection information for this branch
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-1">{leftColumnFields.map(renderField)}</div>
          </CardContent>
        </Card>

        {/* Right Column - Tunnel Configuration */}
        <Card className="hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-2 border-b border-primary/10">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <Terminal className="mr-2 h-5 w-5 text-primary" />
                Tunnel Configuration
              </CardTitle>

              {/* Edit button for tunnel details */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditTunnel}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Tunnel Configuration</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Secure VPN tunnel endpoints for branch connectivity
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-1">
              {rightColumnFields.map(renderField)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection Edit Dialog */}
      <Dialog open={editConnectionOpen} onOpenChange={setEditConnectionOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Connection Details</DialogTitle>
            <DialogDescription>
              Update connection information for {branch["Branch Name"]}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {leftColumnFields.map((field) => (
              <div
                key={field.key}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor={field.key} className="text-right">
                  {field.label}
                </Label>
                <Input
                  id={field.key}
                  value={editedConnectionData[field.key] || ""}
                  onChange={(e) =>
                    setEditedConnectionData({
                      ...editedConnectionData,
                      [field.key]: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditConnectionOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConnectionUpdate}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tunnel Edit Dialog */}
      <Dialog open={editTunnelOpen} onOpenChange={setEditTunnelOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Tunnel Configuration</DialogTitle>
            <DialogDescription>
              Update tunnel settings for {branch["Branch Name"]}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {rightColumnFields.map((field) => (
              <div
                key={field.key}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor={field.key} className="text-right">
                  {field.label}
                </Label>
                <Input
                  id={field.key}
                  value={editedTunnelData[field.key] || ""}
                  onChange={(e) =>
                    setEditedTunnelData({
                      ...editedTunnelData,
                      [field.key]: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTunnelOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTunnelUpdate}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Additional information card */}
      <Card className="mt-6 hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2 border-b border-primary/10">
          <CardTitle className="text-lg flex items-center">
            <Server className="mr-2 h-5 w-5 text-primary" />
            Network Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">
            This branch uses a{" "}
            <Badge variant="outline">{branch["Connection Type"]}</Badge>{" "}
            connection provided through service number {branch["Service No."]}.
          </p>
          <div className="mt-4 p-3 bg-primary/5 rounded-md border border-primary/10">
            <p className="text-sm font-medium">Technical Notes</p>
            <p className="text-xs text-muted-foreground mt-1">
              Switch and router configuration are found inside the sub-item of
              the side bar
            </p>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
