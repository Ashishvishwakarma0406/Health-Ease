import React from 'react';
import aboutImage1 from '../images/aboutusimages0.jpg';
import aboutImage2 from '../images/imageaboutus1.webp';

function AboutUs() {
  return (
    <section className="min-h-screen bg-white text-gray-800 px-8 lg:px-32 py-12 flex flex-col items-center">
      {/* Heading Section */}
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600 mt-24">
        About Us
      </h1>

      {/* Introduction Text */}
      <p className="text-lg text-center max-w-5xl mx-auto mb-16">
        Welcome to <span className="font-bold">HealthEase</span>, your one-stop solution for comprehensive healthcare services. 
        At HealthEase, we are dedicated to making healthcare more accessible, efficient, and user-friendly by leveraging the 
        latest technology and personalized support.
      </p>

      {/* First Section: Image and Text */}
      <div className="flex flex-col lg:flex-row items-center gap-8 mb-16 max-w-5xl mx-auto">
        {/* Image 1 with fixed height */}
        <div className="flex-1 flex justify-center max-w-md">
          <img
            src={aboutImage1}
            alt="About Us Healthcare 1"
            className="w-full h-80 object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 text-lg text-justify">
          <h2 className="text-3xl font-semibold text-blue-500 mb-6">
            Our Mission
          </h2>
          <p className="mb-4 leading-relaxed">
            At HealthEase, we aim to simplify healthcare journeys by providing tailored solutions. 
            From consultations to advanced treatments, we ensure that every patient receives the care they deserve.
          </p>
          <p className="leading-relaxed">
            Our team is committed to innovation, making use of cutting-edge tools to offer precise diagnostics, efficient 
            services, and seamless experiences.
          </p>
        </div>
      </div>

      {/* Second Section: Reversed Layout */}
      <div className="flex flex-col lg:flex-row-reverse items-center gap-8 max-w-5xl mx-auto">
        {/* Image 2 with fixed height */}
        <div className="flex-1 flex justify-center max-w-md">
          <img
            src={aboutImage2}
            alt="About Us Healthcare 2"
            className="w-full h-80 object-cover rounded-3xl shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="flex-1 text-lg text-justify">
          <h2 className="text-3xl font-semibold text-blue-500 mb-6">
            Our Vision
          </h2>
          <p className="mb-4 leading-relaxed">
            HealthEase envisions a world where quality healthcare is a fundamental right. 
            By bridging the gap between technology and medical expertise, we are working towards building healthier communities.
          </p>
          <p className="leading-relaxed">
            Together, we strive to empower individuals with knowledge, tools, and resources that make healthcare more effective 
            and affordable.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
