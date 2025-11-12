import React from "react";
import { Link } from "react-router";
import {
  FaUtensils,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaChevronRight,
} from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-[0px] bg-black">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform"></div>
      <div className={`pt-16 pb-8`}>
        <div className="container mx-auto px-4">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* About */}
            <div className="col-span-1 md:col-span-5">
              <div className="flex items-center mb-5">
                <GiCookingPot className="text-3xl text-orange-500 mr-2" />
                <h3 className="text-2xl font-bold text-white dark:text-white">
                  Plate <span className="text-purple-500">Share</span>
                </h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed"></p>
              <div className="flex space-x-3">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-lg transition-all transform hover:scale-110 flex items-center justify-center w-10 h-10 shadow-md"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-800 text-white p-2.5 rounded-lg transition-all transform hover:scale-110 flex items-center justify-center w-10 h-10 shadow-md"
                  aria-label="GitHub"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white p-2.5 rounded-lg transition-all transform hover:scale-110 flex items-center justify-center w-10 h-10 shadow-md"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 hover:bg-orange-700 text-white p-2.5 rounded-lg transition-all transform hover:scale-110 flex items-center justify-center w-10 h-10 shadow-md"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1 md:col-span-3 md:pl-4">
              <h3 className="text-lg font-bold text-white mb-5 pb-2 border-b border-orange-500/30">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li className="transform hover:translate-x-2 transition-transform duration-300">
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-orange-400 transition-colors flex items-center"
                  >
                    <FaChevronRight className="text-xs mr-2 text-orange-500" />{" "}
                    Home
                  </Link>
                </li>
                <li className="transform hover:translate-x-2 transition-transform duration-300">
                  <Link
                    to="/availableFood"
                    className="text-gray-300 hover:text-orange-400 transition-colors flex items-center"
                  >
                    <FaChevronRight className="text-xs mr-2 text-orange-500" />{" "}
                    Available Food
                  </Link>
                </li>
                <li className="transform hover:translate-x-2 transition-transform duration-300">
                  <Link
                    to="/add-food"
                    className="text-gray-300 hover:text-orange-400 transition-colors flex items-center"
                  >
                    <FaChevronRight className="text-xs mr-2 text-orange-500" />
                    Add Food
                  </Link>
                </li>
                <li className="transform hover:translate-x-2 transition-transform duration-300">
                  <Link
                    to="/manage-food"
                    className="text-gray-300 hover:text-orange-400 transition-colors flex items-center"
                  >
                    <FaChevronRight className="text-xs mr-2 text-orange-500" />{" "}
                    Manage My Foods
                  </Link>
                </li>
                <li className="transform hover:translate-x-2 transition-transform duration-300">
                  <Link
                    to="/food-request"
                    className="text-gray-300 hover:text-orange-400 transition-colors flex items-center"
                  >
                    <FaChevronRight className="text-xs mr-2 text-orange-500" />{" "}
                    My Food Request
                  </Link>
                </li>

                <li className="transform hover:translate-x-2 transition-transform duration-300">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-orange-400 transition-colors flex items-center"
                  >
                    <FaChevronRight className="text-xs mr-2 text-orange-500" />{" "}
                    Login
                  </Link>
                </li>
                <li className="transform hover:translate-x-2 transition-transform duration-300">
                  <Link
                    to="/register"
                    className="text-gray-300 hover:text-orange-400 transition-colors flex items-center"
                  >
                    <FaChevronRight className="text-xs mr-2 text-orange-500" />{" "}
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-1 md:col-span-4 md:pl-4">
              <h3 className="text-lg font-bold text-white mb-5 pb-2 border-b border-orange-500/30">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-orange-500 p-2 rounded-lg mt-1 mr-3 shadow-lg">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-200 text-sm mb-1">Email</h4>
                    <a
                      href=""
                      className="text-gray-300 hover:text-orange-400 transition-colors"
                    >
                      dev.webbyudoy@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-orange-500 p-2 rounded-lg mt-1 mr-3 shadow-lg">
                    <FaPhone className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-200 text-sm mb-1">Phone</h4>
                    <span className="text-gray-300">+8801873**</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-orange-500 p-2 rounded-lg mt-1 mr-3 shadow-lg">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-200 text-sm mb-1">Address</h4>
                    <p className="text-gray-300">
                      Road-7, Block-C
                      <br />
                      Bashundhara-R/A
                      <br />
                      Dhaka
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-orange-500/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear}{" "}
                <span className="text-orange-400">Plate Share</span>. All rights
                reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-4 md:mt-0">
                <Link className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
                <Link className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                  FAQ
                </Link>
                <Link className="text-gray-400 text-sm hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <div className="text-center mt-6 text-xs text-gray-400">
              Developed <span className="text-orange-500">♥</span> by{" "}
              <a
                className="underline text-orange-400 hover:text-orange-300"
                href="https://rijoan.com"
              >
                Udoy Kumar Pal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
