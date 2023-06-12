import React from 'react';
import { BsGlobe } from 'react-icons/bs';
import { IoChevronUpOutline } from 'react-icons/io5';

const Footer = () => {
  return (
    <div className="footer-container mt-8">
      <hr />
      <div className="bg-gray-100 py-4 flex justify-between items-center">
        <div>
          <a href="#" className="text-gray-500 mr-4">© 2023 HomeHive, Inc.</a>
          <a href="#" className="text-gray-500 mr-4">&nbsp;·&nbsp;&nbsp;Terms</a>
          <a href="#" className="text-gray-500 mr-4">&nbsp;·&nbsp;&nbsp;Sitemap</a>
          <a href="#" className="text-gray-500 mr-4">&nbsp;·&nbsp;&nbsp;Company details</a>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <BsGlobe size={12} className="mr-1" />
            <a href="#" className="text-gray-500">English (IN)</a>
          </div>
          <a href="#" className="text-gray-500">₹&nbsp;&nbsp; INR</a>
          <div className="flex items-center ml-4">
            <a href="#" className="text-gray-500">Support & resources</a>
            <IoChevronUpOutline size={20} className="ml-1" />
          </div>
        </div>
      </div>
      <hr className="mb-0" />
    </div>
  );
};

export default Footer;
