'use client';

import React from "react";
import { SignUp } from "@clerk/nextjs";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export default function SignUpPage() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-base-100"
      data-theme="synthwave"
      style={{
        backgroundImage: `url('/bgmain.jpg')`, // Background image for the entire screen
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative flex flex-col md:flex-row w-full max-w-6xl mx-auto p-8 space-y-8 md:space-y-0">
        {/* MacBookScroll Component */}
        <div className="flex flex-col items-center md:items-start space-y-4 md:mr-8 md:mb-0 mb-8">
          <MacbookScroll
            src="/mac.jpeg" // Ensure this is the correct path
            showGradient={true}
            title="Generate AI Flashcards."
            badge="Your Badge"
            className="w-[300px] h-[200px] md:w-[500px] md:h-[350px]"
          />
        </div>

        {/* Sign-Up Form */}
        <div
          className="flex-1 max-w-md ml-auto rounded-lg p-8"
          style={{
            backgroundImage: `url('/bgmain.jpg')`, // Apply the same background image to the form container
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay', // Overlay effect for better text visibility
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for better contrast
          }}
        >
          <SignUp
            appearance={{
              elements: {
                card: "shadow-none", // Removed shadow
                title: "text-2xl font-bold text-base-content",
                button:
                  "bg-primary text-primary-content font-semibold rounded-md px-4 py-2 mt-4",
                input:
                  "border-base-300 rounded-md focus:border-primary focus:ring focus:ring-primary-focus",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
