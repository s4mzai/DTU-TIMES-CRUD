

import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function EditionDetails() {
  const { id } = useParams();
  const [edition, setEdition] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://dtu-times-backend.onrender.com/editions/${id}`)
      .then((res) => {
        setEdition(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching edition:", err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://dtu-times-backend.onrender.com/editions/${id}`);
      toast.success("Edition deleted successfully ✅");
      navigate("/editions");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting edition ❌");
    }
  };

  if (loading) return <p className="p-6 text-gray-600">Loading...</p>;
  if (!edition) return <p className="p-6 text-red-600">Edition not found</p>;

  const publishedDate = edition.published_at
    ? new Date(edition.published_at).toLocaleDateString("en-CA")
    : null;

  return (
    <div className="relative w-full min-h-screen flex justify-center pt-10 pb-10 overflow-auto">
      
      {edition.thumbnail && (
        <img
          src={edition.thumbnail}
          alt="Background Thumbnail"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-70 -z-10"
        />
      )}

      <div className="max-w-2xl w-full overflow-hidden bg-transparent mt-10 md:bg-white/70 md:backdrop-blur-xs md:border border-gray-200 rounded-xl shadow-sm p-6 relative z-10 flex flex-col gap-4">
        {edition.thumbnail && (
          <img
            src={edition.thumbnail}
            alt={edition.name}
            className="w-full max-h-[40vh] object-cover rounded-lg mb-2"
          />
        )}
        <div className="bg-white/10 backdrop-blur-xs p-2 rounded-lg md:bg-transparent md:backdrop-blur-none">
          <h1 className="text-3xl font-bold text-gray-900">{edition.name}</h1>
          <p className="text-black">Edition Id: #{edition.edition_id}</p>
          <p className="text-black">
            {publishedDate ? `Published: ${publishedDate}` : "Not published yet"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Link to={`/editions/edit/${edition._id}`}>
            <Button className="w-full h-12 bg-black text-white hover:bg-black/85">
              Edit
            </Button>
          </Link>


          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full h-12">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  edition <span className="font-semibold">{edition.name}</span>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDelete}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>


        {edition.published_at ? (
          <a
            href={edition.edition_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full h-12 bg-black text-white hover:bg-black/85">
              Read Edition
            </Button>
          </a>
        ) : (
          <Button
            className="w-full mt-4 bg-gray-900 text-white cursor-not-allowed"
            disabled
          >
            Not Published Yet
          </Button>
        )}
      </div>
    </div>
  );
}
