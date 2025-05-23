import { AssignmentHistory } from "@/components/AssignmentHistory";
import { apiRequest } from "@/hooks/apiRequest";
import { RootState } from "@/store/appStore";
import { addAssignment, deleteAssignment } from "@/store/assignmentSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const baseURL = import.meta.env.VITE_API_URL

const Assignments = () => {
  const assignments = useSelector(
    (state: RootState) => state.assignment.assignments
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAssignment = async () => {
      const data = await apiRequest(
        baseURL+"/api/assignment",
        "GET",
        null
      );
      dispatch(addAssignment(data));
    };
    // if(!assignments)
    fetchAssignment();

    return () => {
      dispatch(deleteAssignment());
    };
  }, []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Assignment History</h2>
      <AssignmentHistory assignments={assignments} />
    </div>
  );
};

export default Assignments;
