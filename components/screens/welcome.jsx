// components/home/welcome-screen.jsx
import { useState } from "react";
import {
  Plus,
  Building,
  Server,
  CreditCard,
  Users,
  Info,
  ArrowRight,
  Activity,
  BarChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

// Main Welcome Screen Component
export default function WelcomeScreen() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* 1. Header Section */}
      <HeaderSection />

      {/* 2. Stats Overview */}
      <StatsOverview />

      {/* 3. Add New Branch Card */}
      <AddBranchCard />

      {/* 4. Quick Access Grid */}
      <QuickAccessSection />

      {/* 5. Recent Activity Section */}
      <RecentActivitySection />
    </div>
  );
}

// 1. Header Section Component
function HeaderSection() {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold tracking-tight">
        Branch Information Repository
      </h1>
      <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
        Manage and access information about Hawassa District bank branches,
        ATMs, and network infrastructure.
      </p>
    </div>
  );
}

// 2. Stats Overview Component
function StatsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Total Branches"
        value="12"
        change="+2 from last month"
        icon={Building}
      />
      <StatCard
        title="ATMs"
        value="24"
        change="+5 from last month"
        icon={CreditCard}
      />
      <StatCard
        title="Network Status"
        value="98%"
        change="Uptime this month"
        icon={Server}
      />
      <StatCard
        title="Updates Pending"
        value="7"
        change="Require attention"
        icon={Activity}
      />
    </div>
  );
}

// Individual Stat Card Component
function StatCard({ title, value, change, icon: Icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}

// 3. Add Branch Card Component
function AddBranchCard() {
  return (
    <Card className="mb-8 border-dashed border-2 hover:border-primary/50 transition-colors group cursor-pointer add-branch-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Add New Branch</CardTitle>
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Plus className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Create a new branch with complete information including network
          details, contact persons, and ATMs.
        </p>
      </CardContent>
      <CardFooter>
        <AddBranchModal />
      </CardFooter>
    </Card>
  );
}

// Add Branch Modal Component
function AddBranchModal() {
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

// 4. Quick Access Section Component
function QuickAccessSection() {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <QuickAccessCard
          title="Branch Overview"
          description="View all branches and their status at a glance"
          icon={Building}
          color="bg-blue-500/10"
          textColor="text-blue-500"
        />
        <QuickAccessCard
          title="Network Infrastructure"
          description="Access WAN/LAN configurations and IP addresses"
          icon={Server}
          color="bg-amber-500/10"
          textColor="text-amber-500"
        />
        <QuickAccessCard
          title="ATM Management"
          description="Monitor and manage ATM locations and status"
          icon={CreditCard}
          color="bg-green-500/10"
          textColor="text-green-500"
        />
        <QuickAccessCard
          title="Contact Directory"
          description="Find branch managers and operation staff contacts"
          icon={Users}
          color="bg-purple-500/10"
          textColor="text-purple-500"
        />
        <QuickAccessCard
          title="Reports"
          description="Generate reports on branch performance and status"
          icon={BarChart}
          color="bg-red-500/10"
          textColor="text-red-500"
        />
        <QuickAccessCard
          title="Documentation"
          description="Access guides and procedures for branch operations"
          icon={Info}
          color="bg-indigo-500/10"
          textColor="text-indigo-500"
        />
      </div>
    </>
  );
}

// Quick Access Card Component
function QuickAccessCard({ title, description, icon: Icon, color, textColor }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer quick-access-card">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div
          className={`h-12 w-12 rounded-full ${color} flex items-center justify-center`}
        >
          <Icon className={`h-6 w-6 ${textColor}`} />
        </div>
      </CardHeader>
      <CardFooter>
        <Button
          variant="ghost"
          className="w-full justify-start pl-0 hover:pl-2 transition-all"
        >
          Access <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

// 5. Recent Activity Section Component
function RecentActivitySection() {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Recent changes and updates to branch information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ActivityItem
              action="Updated Router Config"
              branch="Hawassa Piassa Branch"
              time="2 hours ago"
              user="Admin"
            />
            <ActivityItem
              action="Added New ATM"
              branch="Hawassa Menaharia Branch"
              time="Yesterday"
              user="Network Team"
            />
            <ActivityItem
              action="Updated Contact Information"
              branch="Hawassa Tabor Branch"
              time="3 days ago"
              user="HR Department"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Activity
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

// Activity Item Component
function ActivityItem({ action, branch, time, user }) {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-3">
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{action}</p>
        <p className="text-sm text-muted-foreground">{branch}</p>
      </div>
      <div className="text-xs text-right">
        <p className="text-muted-foreground">{time}</p>
        <p className="font-medium">{user}</p>
      </div>
    </div>
  );
}
