import React from 'react';
import { Link } from 'react-router-dom';
import { ImagePlus, Home, Brain } from 'lucide-react';

const Navbar = ({address}) => {
  {console.log("address: ",address)}
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">AI Image Processor</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/mynft" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600">
              {/* <Home className="h-5 w-5 mr-1" /> */}
              My NFTs
            </Link>
            <Link to="/process" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600">
              <ImagePlus className="h-5 w-5 mr-1" />
              Process Image
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;