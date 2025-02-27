import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon, Loader } from 'lucide-react';

const ImageProcessing = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [templateName,setTemplateName]=useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMintNFT = async () => {
    if (!selectedImage || !title) return;
  
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("templateName",templateName)
    formData.append("isNFT", true);
    formData.append("template", selectedImage);
  
    try {
      const response = await fetch("http://localhost:4000/create", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to mint NFT");
  
      const memeData = await response.json(); // ✅ Get response data
  
      navigate("/result", { state: { meme: memeData } }); // ✅ Pass data to ResultPage
    } catch (error) {
      console.error("Error minting NFT:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Mint Meme as NFT</h1>
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="flex flex-col items-center">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="max-w-xs rounded mb-4" />
            ) : (
              <ImageIcon className="h-12 w-12 text-gray-400" />
            )}
            <label className="mt-4 cursor-pointer">
              <span className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                <Upload className="h-5 w-5 mr-2" /> Upload Image
              </span>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
        </div>
        <input
          type="text"
          placeholder="Meme Title"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Template Name"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          required
        />
        <textarea
          placeholder="Meme Description"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handleMintNFT}
          disabled={!selectedImage || loading}
          className="w-full px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? <Loader className="animate-spin h-5 w-5 mr-2" /> : 'Mint Meme as NFT'}
        </button>
      </div>
    </div>
  );
};

export default ImageProcessing;
