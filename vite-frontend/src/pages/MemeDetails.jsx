import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MemeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [forkTitle, setForkTitle] = useState("");
  const [forkDescription, setForkDescription] = useState("");
  const [forking, setForking] = useState(false);

  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const response = await fetch(`https://memifygateway.vercel.app/memes/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Meme not found.");

        const data = await response.json();
        console.log("data: ", data);
        setMeme(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeme();
  }, [id]);

  const handleForkSubmit = async (e) => {
    e.preventDefault();
    if (!forkTitle) {
      alert("Title is required!");
      return;
    }

    setForking(true);

    try {
      const response = await fetch("https://memifygateway.vercel.app/fork", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          memeId: id,
          newTitle: forkTitle,
          newDescription: forkDescription || meme.description,
        }),
      });

      const data = await response.json();
      console.log("data: ", data);

      if (!response.ok) throw new Error("Failed to fork meme.");

      setShowForm(false);

      // Redirect to /mynft after successful forking
      navigate("/mynft");
    } catch (error) {
      alert(error.message);
    } finally {
      setForking(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></p>
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 text-center">
      <h1 className="text-3xl font-bold">{meme.title}</h1>

      <img
        src={`https://memifygateway.vercel.app${meme.template}`}
        alt={meme.title}
        className="w-1/2 mx-auto my-4 rounded-lg"
      />

      <div className="text-lg text-gray-300">
        <p><strong>Description:</strong> {meme.description}</p>
        <p><strong>Template Name:</strong> {meme.templateName}</p>
        <p><strong>Is NFT:</strong> {meme.isNFT ? "Yes" : "No"}</p>
        <p><strong>Creator ID:</strong> {meme.creator?._id || "Unknown"}</p>
        <p><strong>Created At:</strong> {new Date(meme.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(meme.updatedAt).toLocaleString()}</p>
        <p><strong>Meme ID:</strong> {meme._id}</p>
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Fork Meme
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Fork Meme</h2>
            <form onSubmit={handleForkSubmit}>
              <label className="block text-left">
                <span className="text-gray-300">New Title:</span>
                <input
                  type="text"
                  className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded text-white"
                  value={forkTitle}
                  onChange={(e) => setForkTitle(e.target.value)}
                  required
                />
              </label>
              
              <label className="block text-left mt-3">
                <span className="text-gray-300">New Description (Optional):</span>
                <textarea
                  className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded text-white"
                  value={forkDescription}
                  onChange={(e) => setForkDescription(e.target.value)}
                />
              </label>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
                  disabled={forking}
                >
                  {forking ? (
                    <>
                      <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-white rounded-full"></span>
                      Forking...
                    </>
                  ) : (
                    "Fork"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  disabled={forking}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemeDetails;
