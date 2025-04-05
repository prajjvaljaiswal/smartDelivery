
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useState } from "react"

const Data_Table = () => {
    const [filter, setfilter] = useState("filter")
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
                <DropdownMenuItem onClick={()=>{setfilter("All")}}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>{setfilter("Online")}}>Online</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>{setfilter("Offline")}}>Offline</DropdownMenuItem>
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
                <TableHead>Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {filteredWorkers.length > 0 ? (
                filteredWorkers.map((worker) => (
                  <TableRow key={worker._id}>
                    <TableCell>{worker.name}</TableCell>
                    <TableCell>{worker.email}</TableCell>
                    <TableCell>{worker.phone}</TableCell>
                    <TableCell>{worker.location || "N/A"}</TableCell>
                    <TableCell>{worker.status}</TableCell>
                    <TableCell>{worker.active}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6" className="text-center">No workers found...</TableCell>
                </TableRow>
              )} */}
              <TableRow >
                    <TableCell>name</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>phone</TableCell>
                    <TableCell>location || "N/A"</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell>active</TableCell>
                  </TableRow>
            </TableBody>
          </Table>
        </div>
  )
}

export default Data_Table