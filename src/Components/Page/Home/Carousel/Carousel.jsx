import React, { useState, useEffect } from "react";
import med1 from "../../../../assets/me-1.jpg"; // Image 1
import med2 from "../../../../assets/me-2.jpg"; // Image 2
import med3 from "../../../../assets/me-3.jpg"; // Image 3
import med4 from "../../../../assets/me-4.jpg"; // Image 4

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0); // Track current slide

    // Slide data
    const slides = [
        {
            image: med1,
            title: "Trusted Medicine for Better Health",
            description: "Your partner in healthcare, delivering quality medicines.",
        },
        {
            image: med2,
            title: "Quality Medicines Delivered to Your Doorstep",
            description: "Ensuring your health with safe and timely deliveries.",
        },
        {
            image: med3,
            title: "Reliable Health Solutions for You",
            description: "Providing medicines with care and precision.",
        },
        {
            image: med4,
            title: "Pharmaceuticals You Can Trust",
            description: "Bringing the best of healthcare to your home.",
        },
    ];

    // Go to the next slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length); // Loop back to 0 after last slide
    };

    // Go to the previous slide
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); // Loop back to the last slide
    };

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 3000); // Change slide every 5 seconds
        return () => clearInterval(interval); // Clear interval when component unmounts
    }, []);

    return (
        <div className="max-w-7xl w-11/12 mx-auto relative mt-10">
            {/* Carousel Container */}
            <div className="relative rounded-lg overflow-hidden shadow-lg">
                {/* Carousel Items */}
                <div className="relative md:h-[500px]">
                    {/* Current Item */}
                    <div className="relative duration-700 ease-in-out flex">
                        <img
                            src={slides[currentSlide].image}
                            alt="Medicine"
                            className="object-cover w-full h-[400px] md:h-[500px]"
                        />
                        <div className="absolute top-32 md:top-52 md:left-20 text-left text-black font-bold px-4 md:px-8">
                            <h2 className="text-3xl md:text-5xl font-semibold text-shadow-lg mb-4">
                                {slides[currentSlide].title}
                            </h2>
                            <p className="text-lg md:text-2xl opacity-90 ">
                                {slides[currentSlide].description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute top-1/2 left-3 z-30 flex items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 transition"
                >
                    <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        ></path>
                    </svg>
                </button>

                <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute top-1/2 right-3 z-30 flex items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 transition"
                >
                    <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
