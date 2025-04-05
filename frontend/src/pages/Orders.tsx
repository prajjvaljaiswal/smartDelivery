import { OrdersOverview } from "@/components/order/dashboard";
import { apiRequest } from "@/hooks/apiRequest";
import { RootState } from "@/store/appStore";
import {
  addAssignmentMetrics,
  deleteAssignmentMetrics,
} from "@/store/assignmentSlice";
import { addOrders, deleteOrders } from "@/store/orderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const baseURL = import.meta.env.VITE_API_URL

const Orders = () => {
  const orders = useSelector((store: RootState) => store.order.orders);
  const metrics = useSelector(
    (store: RootState) => store.assignment.assignmentMetrics
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await apiRequest(
        baseURL+"/api/order/",
        "GET",
        null
      );
      dispatch(addOrders(data));
    };
    fetchOrder();
    const fetchAssignmentMetrics = async () => {
      const data = await apiRequest(
        baseURL+"/api/assignment/metrics",
        "GET",
        null
      );
      dispatch(addAssignmentMetrics(data));
    };
    fetchAssignmentMetrics();

    return () => {
      dispatch(deleteOrders());
      dispatch(deleteAssignmentMetrics());
    };
  }, []);

  return (
    <div>{metrics && <OrdersOverview orders={orders} metrics={metrics} />}</div>
  );
};

export default Orders;
