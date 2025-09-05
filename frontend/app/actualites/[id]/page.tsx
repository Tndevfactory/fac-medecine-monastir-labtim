// app/actualites/[id]/page.tsx
// This is a Server Component that handles the dynamic route for individual actualités.

import ActuDetailClient from "@/components/Actualites/ActuDetailClient";
import { Metadata } from "next"; // Import Metadata type for SEO

// Define the props interface for the page component
interface ActuDetailPageProps {
  params: {
    id: string; // The dynamic segment from the URL, e.g., /actualites/123 -> id is '123'
  };
  searchParams?: { [key: string]: string | string[] | undefined }; // Optional search params
}

// Optional: Generate static params if you're using static site generation (SSG)
// export async function generateStaticParams() {
//   // Fetch all actu IDs from your API to pre-render pages at build time
//   // This is an example, adjust based on your actual API call
//   const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/actus`);
//   const data = await response.json();
//   const actus = data.data || []; // Assuming your API returns { data: [...] }

//   return actus.map((actu: { id: string }) => ({
//     id: actu.id,
//   }));
// }

// Optional: Generate dynamic metadata for SEO
export async function generateMetadata({ params }: any) {
  // You might want to fetch the actu title/description here for better SEO
  // For now, a generic title:
  return {
    title: `Actualité - `,
    description: `Détails de l'actualité avec l'ID `,
  };
}

// This is your Server Component for the dynamic route
const ActuDetailPage = ({ params }: any) => {
  // Access the id from params. It's automatically awaited by Next.js when passed as a prop.
  const actuId = params.id;

  // Render the client component, passing the actuId as a prop
  return <ActuDetailClient actuId={actuId} />;
};

export default ActuDetailPage;
