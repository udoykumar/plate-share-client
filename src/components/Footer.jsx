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
import { motion } from "framer-motion";
import logo from "/logo.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.footer
      className="relative mt-[0px] bg-black font-popins"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform"></div>
      <div className="pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* Main footer content */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12"
            variants={staggerContainer}
          >
            {/* About */}
            <motion.div
              className="col-span-1 md:col-span-5"
              variants={fadeInUp}
            >
              <div className="flex items-center mb-5">
                <GiCookingPot className="text-3xl text-orange-500 mr-2" />
                <h3 className="text-2xl font-bold text-white dark:text-white">
                  Plate <span className="text-purple-500">Share</span>
                </h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Connecting hearts through food — donate, share, and make a
                difference one meal at a time.
              </p>
              <div className="flex space-x-3">
                {[
                  {
                    icon: <FaFacebook size={18} />,
                    href: "https://www.facebook.com",
                    color: "bg-orange-500 hover:bg-orange-600",
                  },
                  {
                    icon: <FaGithub size={18} />,
                    href: "https://github.com",
                    color: "bg-gray-700 hover:bg-gray-800",
                  },
                  {
                    icon: <FaInstagram size={18} />,
                    href: "https://www.instagram.com",
                    color:
                      "bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600",
                  },
                  {
                    icon: <FaLinkedin size={18} />,
                    href: "https://www.linkedin.com/",
                    color: "bg-orange-600 hover:bg-orange-700",
                  },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${item.color} text-white p-2.5 rounded-lg transition-all transform flex items-center justify-center w-10 h-10 shadow-md`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="col-span-1 md:col-span-3 md:pl-4"
              variants={fadeInUp}
            >
              <h3 className="text-lg font-bold text-white mb-5 pb-2 border-b border-orange-500/30">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  { name: "Home", path: "/" },
                  { name: "Available Food", path: "/availableFood" },
                  { name: "Add Food", path: "/add-food" },
                  { name: "Manage My Foods", path: "/manage-food" },
                  { name: "My Food Request", path: "/food-request" },
                  { name: "Login", path: "/login" },
                  { name: "Sign Up", path: "/register" },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-orange-400 transition-colors flex items-center"
                    >
                      <FaChevronRight className="text-xs mr-2 text-orange-500" />{" "}
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              className="col-span-1 md:col-span-4 md:pl-4"
              variants={fadeInUp}
            >
              <h3 className="text-lg font-bold text-white mb-5 pb-2 border-b border-orange-500/30">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <motion.li className="flex items-start" whileHover={{ x: 4 }}>
                  <div className="bg-orange-500 p-2 rounded-lg mt-1 mr-3 shadow-lg">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-200 text-sm mb-1">Email</h4>
                    <a
                      href="mailto:dev.webbyudoy@gmail.com"
                      className="text-gray-300 hover:text-orange-400 transition-colors"
                    >
                      dev.webbyudoy@gmail.com
                    </a>
                  </div>
                </motion.li>
                <motion.li className="flex items-start" whileHover={{ x: 4 }}>
                  <div className="bg-orange-500 p-2 rounded-lg mt-1 mr-3 shadow-lg">
                    <FaPhone className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-200 text-sm mb-1">Phone</h4>
                    <span className="text-gray-300">+8801873**</span>
                  </div>
                </motion.li>
                <motion.li className="flex items-start" whileHover={{ x: 4 }}>
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
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Bottom */}
          <motion.div
            className="border-t border-orange-500/20 pt-8"
            variants={fadeInUp}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear}{" "}
                <span className="text-orange-400">Plate Share</span>. All rights
                reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-4 md:mt-0">
                {["Terms of Service", "Privacy Policy", "FAQ", "Contact"].map(
                  (link, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ y: -2 }}
                      className="text-gray-400 text-sm hover:text-orange-400 transition-colors cursor-pointer"
                    >
                      {link}
                    </motion.a>
                  )
                )}
              </div>
            </div>
            <motion.div
              className="text-center mt-6 text-xs text-gray-400"
              whileHover={{ scale: 1.05 }}
            >
              Developed <span className="text-orange-500">♥</span> by{" "}
              <a
                className="underline text-orange-400 hover:text-orange-300"
                href="https://rijoan.com"
              >
                Udoy Kumar Pal
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
