import { KeyMetrics } from "@/components/dashboard/KeyMatrics"
import { apiRequest } from "@/hooks/apiRequest";
import { RootState } from "@/store/appStore";
import { addPartner, deletePartner } from "@/store/partnerSlice";
// import { ActiveOrdersMap } from "@/components/active-orders-map"
import { PartnerAvailability } from "@/components/dashboard/partner-availability"
import { RecentAssignments } from "@/components/dashboard/RecentAssignments"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, addAssignmentMetrics, deleteAssignment, deleteAssignmentMetrics } from "@/store/assignmentSlice";
import OrderHeatmap from "@/components/dashboard/HeatMap";

export default function Dashboard() {

  const dispatch = useDispatch();
  const partners = useSelector((state: RootState) => state.partner.partners)
  const assignments = useSelector((state: RootState) => state.assignment.assignments)
  const metrics = useSelector((state: RootState) => state.assignment.assignmentMetrics) 

  useEffect(() => {
      const fetchData = async () => {
        const data = await apiRequest("http://localhost:3000/api/partner", "GET", null);
        dispatch(addPartner(data));
      };
      fetchData();

      const fetchAssignment = async ()=>{
        const data = await apiRequest("http://localhost:3000/api/assignment", "GET", null);
        dispatch(addAssignment(data));
      }
      fetchAssignment()

      const fetchAssignmentMetrics = async()=>{
        const data = await apiRequest("http://localhost:3000/api/assignment/metrics", "GET", null);
        dispatch(addAssignmentMetrics(data));
      }
      fetchAssignmentMetrics()
      return(()=>{
        dispatch(deleteAssignmentMetrics())
        dispatch(deletePartner())
        dispatch(deleteAssignment())
      })
    }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Key Metrics */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
        {metrics && <KeyMetrics metrics={metrics} />}
      </section>

      {/* Map and Partner Availability */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-1">
        <OrderHeatmap/>
        <PartnerAvailability partners={partners} />
      </section>

      {/* Recent Assignments */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <RecentAssignments assignments={assignments} />
      </section>
    </div>
  )
}

