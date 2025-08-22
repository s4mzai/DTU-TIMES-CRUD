
import { useEffect, useState } from "react";
import axios from "axios";
import EditionCard from "../components/EditionCard";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

function Editions() {
  const [editions, setEditions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); 
  const [statusFilter, setStatusFilter] = useState("all"); 

  const fetchEditions = () => {
    axios
      .get("https://dtu-times-backend.onrender.com/editions")
      .then((res) => setEditions(res.data))
      .catch((err) => console.error("Error fetching editions:", err));
  };

  useEffect(() => {
    fetchEditions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this edition?")) {
      try {
        await axios.delete(`https://dtu-times-backend.onrender.com/editions/${id}`);
        toast.success("Edition deleted ✅");
        fetchEditions();
      } catch (err) {
        console.error(err);
        toast.error("Error deleting edition ❌");
      }
    }
  };

  const filteredEditions = editions
    .filter((e) => {

      const matchesSearch =
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.edition_id.toString().includes(search);


      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "published"
          ? e.status === 1
          : e.status !== 1;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.published_at);
      const dateB = new Date(b.published_at);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-3 sm:px-5 xl:px-20 py-10">
      <h1 className="text-3xl font-bold text-white mb-6">All Editions</h1>


      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center w-full">

        <Input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2"
        />


        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort Order</SelectLabel>
              <SelectItem value="desc">Newest First</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>


        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 justify-items-center w-full">
        {filteredEditions.map((edition) => (
          <EditionCard
            key={edition._id}
            edition={edition}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Editions;
