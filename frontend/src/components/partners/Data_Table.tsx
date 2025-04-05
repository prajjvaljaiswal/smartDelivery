import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { apiRequest } from "@/hooks/apiRequest";
import { addPartner, deletePartner } from "@/store/partnerSlice";

const Data_Table = () => {
  const [filter, setFilter] = useState("All");
  const dispatch = useDispatch();
  const partners = useSelector((state: RootState) => state.partner.partners);

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiRequest(
        "http://localhost:3000/api/partner",
        "GET",
        null
      );
      dispatch(addPartner(data));
    };
    fetchData();

    return () => {
      dispatch(deletePartner());
    };
  }, []);

  // Filtering Logic
  const filteredPartners = partners.filter((partner) => {
    if (filter === "All") return true;
    if (filter === "Active") return partner.status === "active";
    // else if (filter === "Inactive") return partner.status === "inactive";
    return false;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Workers</h2>

        {/* Dropdown Menu for Filtering */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{filter}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilter("All")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("Active")}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("Inactive")}>
              Inactive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPartners.length > 0 ? (
            filteredPartners.map((partner, i) => (
              <TableRow key={i}>
                <TableCell>{partner.name}</TableCell>
                <TableCell>{partner.email}</TableCell>
                <TableCell>{partner.phone}</TableCell>
                <TableCell>{partner.area || "N/A"}</TableCell>
                <TableCell>{partner.status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No workers found...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Data_Table;
