import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 md:px-16 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl gap-8 items-center">

        {/* Left Side */}
        <div className="flex flex-col justify-between h-full py-6 space-y-10">
          
          {/* Logo */}
          <div>
            <a href="/" className="text-3xl font-extrabold text-black tracking-wide">
              Uber
            </a>
            {/* Or use image: <img src="/uber-logo.png" alt="Uber Logo" className="h-8" /> */}
          </div>

          {/* Center content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Your ride, <br className="hidden md:block" />
              on demand.
            </h1>

            <p className="text-gray-600 text-lg max-w-md">
              Fast, reliable, and affordable rides right at your doorstep. Ride the future with Uber — anytime, anywhere.
            </p>

            {/* Offer Badge */}
            <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full w-fit font-semibold">
              🎉 50% OFF on your first 3 rides!
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <Link to="/login"><button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-all text-lg font-medium">
                Get Started
              </button>
              </Link>
              <button className="border border-gray-400 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all text-lg font-medium">
                Learn More
              </button>
            </div>

            {/* Social Proof */}
            <p className="text-sm text-gray-400 pt-2">
              ✅ Trusted by over 20 million riders worldwide
            </p>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="w-full">
          <img
            src="/taxi1.png"
            alt="Taxi Illustration"
            className="rounded-2xl w-full object-cover shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
