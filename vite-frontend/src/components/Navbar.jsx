import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImagePlus, Home, Brain, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link className="flex items-center" to="/landing">
            <Brain className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">AI Image Processor</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
          {/* <Link to="/mynft" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600">
              <Home className="h-5 w-5 mr-1" />
              View all NFTs
            </Link> */}
            <Link to="/mynft" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600">
              <Home className="h-5 w-5 mr-1" />
              My NFTs
            </Link>
            <Link to="/process" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600">
              <ImagePlus className="h-5 w-5 mr-1" />
              Process Image
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Compact Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden absolute right-4 top-16 bg-white shadow-md rounded-md py-1 w-40">
            <Link
              to="/mynft"
              className="flex items-center px-3 py-1 text-gray-700 hover:bg-indigo-100"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-4 w-4 mr-2" />
              My NFTs
            </Link>
            <Link
              to="/process"
              className="flex items-center px-3 py-1 text-gray-700 hover:bg-indigo-100"
              onClick={() => setIsOpen(false)}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Process Image
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
