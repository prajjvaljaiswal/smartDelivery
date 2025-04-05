import { OrdersOverview } from "@/components/order/dashboard"
import { apiRequest } from "@/hooks/apiRequest"
import { RootState } from "@/store/appStore"
import { addOrders, deleteOrders } from "@/store/orderSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


const Orders = () => {
  const orders = useSelector((store: RootState) => store.order.orders) 
    const dispatch = useDispatch()
  
    useEffect(()=>{
      const fetchOrder = async () => {
          const data = await apiRequest("http://localhost:3000/api/order/",'GET',null)
          dispatch(addOrders(data))
      }
      fetchOrder()
  
      return(()=>{
          dispatch(deleteOrders())
      })
    },[])
  
  return (
    <div>
      <OrdersOverview orders={orders}/>
    </div>
  )
}

export default Orders

