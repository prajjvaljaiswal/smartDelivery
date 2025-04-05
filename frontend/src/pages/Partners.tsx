import Data_Table from "@/components/partners/Data_Table";
import PartnerForm from "@/components/partners/Form";
import UpdateForm from "@/components/partners/UpdateForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Partners() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Partners</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-[500px] grid-cols-3 bg-gray-300 ">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Add Partner</TabsTrigger>
          <TabsTrigger value="reports">Update Partner</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Data_Table />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="container mx-auto py-10">
            <PartnerForm />
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <div className="container mx-auto py-10">
            <UpdateForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
