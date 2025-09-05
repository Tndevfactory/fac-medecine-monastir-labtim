// app/actualites/[id]/page.tsx
// This file is now a Server Component (no 'use client')

import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google"; // Only Inter is needed here

// Corrected import path for the client component
import ActuDetailClient from "@/components/Actualites/ActuDetailClient";

// Import your actualités data
import { allActualites } from "@/data/allActualites";

const inter = Inter({
  subsets: ["latin"], // Specify subsets (e.g., 'latin', 'cyrillic')
  variable: "--font-inter", // Optional: CSS variable name
});

// Define the props type for the page component
interface ActuDetailPageProps {
  params: {
    id: string; // The ID from the URL, e.g., 'actu1'
  };
}

// REQUIRED for 'output: "export"' with dynamic routes
// This function tells Next.js which paths to pre-render at build time.
export async function generateStaticParams() {
  // Map over your allActualites data to return an array of { id: string } objects
  // For each actualité, we need to generate a static page based on its 'id'.
  return allActualites.map((actu) => ({
    id: actu.id,
  }));
}

// This component is now a Server Component
const ActuDetailPage = (params: any) => {
  const { id } = params; // Get the 'id' from the URL parameters

  // Find the actualité using the ID from the URL
  // This operation happens on the server side during build or request
  const actualite = allActualites.find((actu) => actu.id === id);

  // If no actualité is found, display a not-found message
  if (!actualite) {
    return (
      <div
        className={`bg-white text-gray-800 py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center ${inter.variable}`}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Actualité non trouvée
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Désolé, l'actualité que vous recherchez n'existe pas ou a été
            déplacée.
          </p>
          <Link
            href="/actualites"
            className="text-blue-600 hover:underline text-lg"
          >
            &larr; Retour aux actualités
          </Link>
        </div>
      </div>
    );
  }

  // Pass the fetched actualité data to the client component
  return <ActuDetailClient actualite={actualite} />;
};

export default ActuDetailPage;
