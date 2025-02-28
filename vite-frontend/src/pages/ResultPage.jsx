import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const meme = location.state?.meme; // ✅ Get meme data from state

  if (!meme) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-4">No Meme Data Found</h2>
        <button
          onClick={() => navigate("/process")}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Processing
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/process")}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Processing
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Meme Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`https://memifygateway.vercel.app${meme.template}`} // ✅ Show uploaded meme
                alt="Meme"
                className="rounded-lg shadow-md"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Title</h3>
                <p className="text-gray-600">{meme.title}</p>
              </div>

              {meme.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{meme.description}</p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-2">Template Name</h3>
                <p className="text-gray-600">{meme.templateName || "Unknown"}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Created At</h3>
                <p className="text-gray-600">{new Date(meme.createdAt).toLocaleString()}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Creator</h3>
                <p className="text-gray-600">{meme.creator.address || "Anonymous"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
