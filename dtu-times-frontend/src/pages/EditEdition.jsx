

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";

export default function EditEdition() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    edition_id: "",
    status: 1,
    edition_link: "",
    thumbnail: "",
    time: "10:30:00",
  });

  const [date, setDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);


  useEffect(() => {
    axios
      .get(`https://dtu-times-backend.onrender.com/editions/${id}`)
      .then((res) => {
        const edition = res.data;

        let editionDate = null;
        let editionTime = "10:30:00";

        if (edition.published_at) {
          const dt = new Date(edition.published_at);
          editionDate = dt;
          editionTime = dt.toTimeString().split(" ")[0]; 
        }

        setFormData({
          name: edition.name,
          edition_id: edition.edition_id,
          status: edition.status,
          edition_link: edition.edition_link,
          thumbnail: edition.thumbnail,
          time: editionTime,
        });

        setDate(editionDate);
      })
      .catch((err) => console.error("Error fetching edition:", err));
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleStatusChange = (value) =>
    setFormData({ ...formData, status: Number(value) });

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setCalendarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let publishedAtValue;

    if (formData.status === 1) {
    
      if (!date) {
        toast.error("Please select a published date");
        return;
      }
      const [hours, minutes, seconds] = formData.time.split(":");
      const finalDate = new Date(date);
      finalDate.setHours(hours, minutes, seconds || 0);
      publishedAtValue = finalDate.toISOString();
    }

    const updatedEdition = {
      ...formData,
      ...(formData.status === 1 && { published_at: publishedAtValue }),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await axios.put(
        `https://dtu-times-backend.onrender.com/editions/${id}`,
        updatedEdition
      );
      if (res.status === 200) {
        toast.success("Edition updated successfully ✅");
        navigate("/editions");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating edition ❌");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black py-10 px-4 sm:px-6 md:px-20 overflow-auto flex justify-center">
      
      {formData.thumbnail && (
        <img
          src={formData.thumbnail}
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40 -z-10"
        />
      )}

      
      <div className="w-full max-w-2xl bg-white backdrop-blur-sm border mt-10 border-gray-200 rounded-xl shadow-lg p-6 flex flex-col gap-4 relative z-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Edit Edition</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          
          <div className="flex flex-col gap-2">
            <Label htmlFor="edition_id">Edition ID</Label>
            <Input
              id="edition_id"
              type="number"
              name="edition_id"
              value={formData.edition_id}
              onChange={handleChange}
              required
            />
          </div>

          
          <div className="flex flex-col gap-2 w-full">
            <Label>Status</Label>
            <Select
              value={String(formData.status)}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="1">Published</SelectItem>
                  <SelectItem value="0">Draft</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="edition_link">Edition Link</Label>
            <Input
              id="edition_link"
              type="text"
              name="edition_link"
              value={formData.edition_link}
              onChange={handleChange}
              required
            />
          </div>


          {formData.status === 1 && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-2">
                <Label>Published Date</Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-40 justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  step="1"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
            />
          </div>


          {formData.thumbnail && (
            <img
              src={formData.thumbnail}
              alt="Preview"
              className="mt-4 h-40 w-full object-cover rounded-lg border"
            />
          )}


          <Button type="submit" className="w-full mt-4">
            Update Edition
          </Button>
        </form>
      </div>
    </div>
  );
}
