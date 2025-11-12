import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      image: "/banner1.jpg",
      title: "Discover Delicious Foods Near You",
      desc: "Explore thousands of meals from top restaurants and home chefs. Order your favorite food anytime, anywhere.",
    },
    {
      id: 2,
      image: "/banner2.jpg",
      title: "Share Love with Food Donations",
      desc: "Help others by sharing your extra meals. Every donation can bring a smile to someone's face.",
    },
    {
      id: 3,
      image: "/banner3.jpg",
      title: "Taste Happiness Every Day",
      desc: "Find fresh, homemade, and restaurant-quality meals at your fingertips. Enjoy food, share joy.",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      className="w-full h-[80vh]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <section
            className="relative w-full h-[80vh] bg-cover bg-center mt-20"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-white leading-tight font-bebas"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {slide.title}
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-200 mt-4 max-w-2xl font-popins"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              >
                {slide.desc}
              </motion.p>

              <motion.div
                className="mt-8 w-full max-w-xl flex bg-white rounded-full overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <input
                  type="text"
                  placeholder="Search your favourite food..."
                  className="flex-1 px-6 py-3 outline-none text-gray-700"
                />
                <button className="px-6 py-3 bg-purple-500 text-white font-semibold hover:bg-purple-600 transition">
                  Search
                </button>
              </motion.div>

              <motion.div
                className="mt-6 flex gap-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <button className="px-6 py-3 btn-primary rounded-full text-lg font-semibold transition">
                  Search Food
                </button>
                <button className="px-6 py-3 btn-secendary rounded-full text-lg font-semibold transition">
                  View All Foods
                </button>
              </motion.div>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
