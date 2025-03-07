// components/home/add-branch-modal.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AddBranchModal() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Branch added!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" /> Add Branch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Branch</DialogTitle>
          <DialogDescription>
            Enter the details for the new branch. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="branchName">Branch Name</Label>
                <Input
                  id="branchName"
                  placeholder="e.g., Hawassa Main Branch"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchCode">Branch Code</Label>
                <Input id="branchCode" placeholder="e.g., HW001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Physical address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Main contact number" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wanIp">WAN IP</Label>
                <Input id="wanIp" placeholder="e.g., 192.168.1.1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lanIp">LAN IP</Label>
                <Input id="lanIp" placeholder="e.g., 10.0.0.1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="routerModel">Router Model</Label>
                <Input id="routerModel" placeholder="e.g., Cisco 2900" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="switchModel">Switch Model</Label>
                <Input
                  id="switchModel"
                  placeholder="e.g., Cisco Catalyst 2960"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="managerName">Branch Manager</Label>
                <Input id="managerName" placeholder="Full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="managerPhone">Manager Phone</Label>
                <Input id="managerPhone" placeholder="Contact number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="opManagerName">Operations Manager</Label>
                <Input id="opManagerName" placeholder="Full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="opManagerPhone">Operations Manager Phone</Label>
                <Input id="opManagerPhone" placeholder="Contact number" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save Branch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
