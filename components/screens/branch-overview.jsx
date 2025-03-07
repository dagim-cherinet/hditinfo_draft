// components/screens/branch-overview.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageContainer from "@/components/ui/page-container";
import SectionHeader from "@/components/ui/section-header";
import {
  Building,
  Network,
  Users,
  CreditCard,
  MapPin,
  Phone,
} from "lucide-react";

export default function BranchOverview({ branch }) {
  return (
    <PageContainer>
      {/* Branch Header */}
      <SectionHeader
        icon={Building}
        title={branch.branchName}
        subtitle={`Branch Code: ${branch.branchId}`}
      />

      {/* Branch Overview Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {/* Network Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Network className="mr-2 h-4 w-4 text-primary" />
                  Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">WAN IP:</span>{" "}
                    {branch.ipAddresses.wanIp}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">LAN IP:</span>{" "}
                    {branch.ipAddresses.lanIp}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contacts Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Manager:</span>{" "}
                    {branch.contactPersons.manager.name}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Operation:</span>{" "}
                    {branch.contactPersons.operationManager.name}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ATMs Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-primary" />
                  ATMs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Total ATMs:</span>{" "}
                    {branch.atms.length}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Active:</span>{" "}
                    {
                      branch.atms.filter((atm) => atm.status === "active")
                        .length
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Location Tab */}
        <TabsContent value="location">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-primary" />
                Branch Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">
                  <span className="font-medium">Address:</span> {branch.address}
                </div>
                <div className="text-sm">
                  <span className="font-medium">City:</span> {branch.city}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Region:</span> {branch.region}
                </div>
                {branch.locationCoordinates && (
                  <div className="text-sm">
                    <span className="font-medium">Coordinates:</span>
                    {branch.locationCoordinates.latitude},{" "}
                    {branch.locationCoordinates.longitude}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contacts Tab */}
        <TabsContent value="contacts">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">
                  <span className="font-medium">Main Phone:</span>{" "}
                  {branch.phone}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Email:</span> {branch.email}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Working Hours:</span>{" "}
                  {branch.workingHours}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
