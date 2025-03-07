// components/screens/contacts/detail.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageContainer from "@/components/ui/page-container";
import SectionHeader from "@/components/ui/section-header";
import {
  User,
  Phone,
  Mail,
  Building,
  Calendar,
  Clock,
  FileText,
  MapPin,
} from "lucide-react";

export default function ContactDetail({ branch, type }) {
  // Step 1: Get the appropriate contact data based on type
  const getContactData = () => {
    if (type === "manager") {
      return {
        title: "Branch Manager",
        data: branch.contactPersons.manager,
        badge: "Primary",
        role: "Oversees all branch operations and staff",
      };
    } else if (type === "operationManager") {
      return {
        title: "Operation Manager",
        data: branch.contactPersons.operationManager,
        badge: "Operations",
        role: "Manages day-to-day banking operations",
      };
    }
    // Default fallback
    return { title: "Contact", data: {}, badge: "Staff" };
  };

  // Step 2: Extract the contact information
  const { title, data, badge, role } = getContactData();

  // Step 3: Return the component JSX
  return (
    <PageContainer>
      {/* Step 4: Add section header with user icon */}
      <SectionHeader icon={User} title={title} subtitle={branch.branchName} />

      {/* Step 5: Create main contact information card */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-primary" />
              Personal Information
            </div>
            <Badge variant="outline">{badge}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step 6: Display basic contact information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Full Name</div>
                <div className="text-base">{data.name}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Position</div>
                <div className="text-base">{title}</div>
              </div>
            </div>

            <Separator />

            {/* Step 7: Contact details section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="text-sm">{data.phone}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="text-sm">{data.email}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Office</div>
                    <div className="text-sm">
                      {data.office || "Main Building, 1st Floor"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Extension
                    </div>
                    <div className="text-sm">{data.extension || "101"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 8: Additional information card */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <FileText className="mr-2 h-4 w-4 text-primary" />
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step 9: Display work-related information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Working Since
                    </div>
                    <div className="text-sm">
                      {data.since || "January 2022"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Work Hours
                    </div>
                    <div className="text-sm">
                      {data.workHours || "Monday-Friday: 8:30 AM - 4:30 PM"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Step 10: Role description */}
            <div className="space-y-2">
              <div className="text-sm font-medium">Role & Responsibilities</div>
              <p className="text-sm text-muted-foreground">
                {role}.{" "}
                {data.responsibilities ||
                  "Responsible for ensuring efficient operation of the branch, managing staff, and ensuring customer satisfaction."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 11: Availability schedule card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-primary" />
            Availability Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step 12: Display weekly schedule */}
          <div className="space-y-2">
            <div className="grid grid-cols-7 gap-1">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, i) => (
                  <div key={day} className="text-center">
                    <div className="text-xs font-medium mb-1">{day}</div>
                    <div
                      className={`h-2 rounded-full ${
                        i < 5
                          ? "bg-green-500"
                          : i === 5
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                  </div>
                )
              )}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                <span>Half Day</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                <span>Unavailable</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
