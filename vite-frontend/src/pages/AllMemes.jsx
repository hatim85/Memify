import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllMemes = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch("https://memifygateway.vercel.app/viewnft", {
          method: "GET",
          credentials: "include"
        }
        ); // Adjust URL as needed
        if (!response.ok) throw new Error("Failed to fetch memes.");

        console.log("response: ", response)
        const data = await response.json();
        console.log("data: ", data)
        setMemes(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching memes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🔥 All Memes 🔥</h1>

      {loading && <p className="text-center">Loading memes...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memes.map((meme) => (
          <div
            key={meme._id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate(`/meme/${meme._id}`)}
          >
            <img
              src={meme.template.startsWith("http") ? meme.template : `https://memifygateway.vercel.app${meme.template}`}
              alt={meme.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mt-3">{meme.title}</h2>
            <p className="text-sm text-gray-400">{meme.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMemes;
