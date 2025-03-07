// components/screens/contacts/overview.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/components/ui/page-container";
import SectionHeader from "@/components/ui/section-header";
import { Users, User, Phone, Mail, Calendar, Building } from "lucide-react";

export default function ContactsOverview({ branch }) {
  // Step 1: Set up component structure
  return (
    <PageContainer>
      {/* Step 2: Add the section header */}
      <SectionHeader
        icon={Users}
        title="Contact Personnel"
        subtitle={branch.branchName}
      />

      {/* Step 3: Create container for all cards */}
      <div className="space-y-6">
        {/* Step 4: Manager Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-primary" />
                Branch Manager
              </div>
              <Badge variant="outline">Primary</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 5: Manager Details - Two column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="font-medium">Name:</span>{" "}
                  {branch.contactPersons.manager.name}
                </div>
                <div className="text-sm flex items-center">
                  <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                  {branch.contactPersons.manager.phone}
                </div>
                <div className="text-sm flex items-center">
                  <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                  {branch.contactPersons.manager.email}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm flex items-center">
                  <Building className="h-3 w-3 mr-2 text-muted-foreground" />
                  <span className="font-medium mr-1">Office:</span>{" "}
                  {branch.contactPersons.manager.office ||
                    "Main Building, 1st Floor"}
                </div>
                <div className="text-sm flex items-center">
                  <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                  <span className="font-medium mr-1">Since:</span>{" "}
                  {branch.contactPersons.manager.since || "January 2022"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Extension:</span>{" "}
                  {branch.contactPersons.manager.extension || "101"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 6: Operation Manager Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-primary" />
                Operation Manager
              </div>
              <Badge variant="outline">Operations</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 7: Operation Manager Details - Two column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="font-medium">Name:</span>{" "}
                  {branch.contactPersons.operationManager.name}
                </div>
                <div className="text-sm flex items-center">
                  <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                  {branch.contactPersons.operationManager.phone}
                </div>
                <div className="text-sm flex items-center">
                  <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                  {branch.contactPersons.operationManager.email}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm flex items-center">
                  <Building className="h-3 w-3 mr-2 text-muted-foreground" />
                  <span className="font-medium mr-1">Office:</span>{" "}
                  {branch.contactPersons.operationManager.office ||
                    "Operations Area, Ground Floor"}
                </div>
                <div className="text-sm flex items-center">
                  <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                  <span className="font-medium mr-1">Since:</span>{" "}
                  {branch.contactPersons.operationManager.since || "March 2023"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Extension:</span>{" "}
                  {branch.contactPersons.operationManager.extension || "102"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 8: Branch Contact Information Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Phone className="mr-2 h-4 w-4 text-primary" />
              Branch Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 9: Branch contact details */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-sm">
                  <span className="font-medium">Main Phone:</span>{" "}
                  {branch.phone || "123-456-7890"}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Fax:</span>{" "}
                  {branch.fax || "123-456-7891"}
                </div>
              </div>

              <Separator className="my-2" />

              <div className="text-sm">
                <span className="font-medium">Email:</span>{" "}
                {branch.email || "branch@commercialbank.et"}
              </div>

              <div className="text-sm">
                <span className="font-medium">Working Hours:</span>{" "}
                {branch.workingHours ||
                  "Monday-Friday: 8:30 AM - 4:30 PM, Saturday: 8:30 AM - 12:30 PM"}
              </div>

              <div className="text-sm">
                <span className="font-medium">Emergency Contact:</span>{" "}
                {branch.emergencyContact || "123-456-7899"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
