import React from 'react';
import { Link } from 'react-router-dom';
import { ImagePlus, Wand2, Brain, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Transform Your Images</span>
              <span className="block text-indigo-600">with AI Magic</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Upload your images and let our AI transform them into stunning variations. Perfect for creative projects and inspiration.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                to="/explorenft"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Explore NFTs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <ImagePlus className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Upload Images</h3>
              <p className="mt-2 text-gray-500">
                Easily upload your images in various formats
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Wand2 className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">AI Processing</h3>
              <p className="mt-2 text-gray-500">
                Advanced AI algorithms process your images
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <Brain className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Smart Analysis</h3>
              <p className="mt-2 text-gray-500">
                Get detailed insights about your processed images
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;