import React, { useEffect, useState } from "react";

const MyNFT = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await fetch("https://memify-8ao8.onrender.com/mynfts", {
          method: "GET",
          credentials: "include", // Ensure cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        });
        //  getting thet cors as response what coulr dbe the reason
        console.log(response)
        if (!response.ok) throw new Error("Failed to fetch memes");

        const data = await response.json();
        setMemes(data);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My NFTs</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : memes.length === 0 ? (
        <p className="text-center">No NFTs created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme) => (
            <div key={meme._id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={meme.template.startsWith("http") ? meme.template : `https://memify-8ao8.onrender.com${meme.template}`}
                alt={meme.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h3 className="text-lg font-bold">{meme.title}</h3>
              <p className="text-gray-600">{meme.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyNFT;
