// components/dashboard/DashboardOverview.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, ChartNoAxesCombined ,Book, FileText, GraduationCap, Loader2 } from 'lucide-react'; // Icons for dashboard stats
import { Inter } from 'next/font/google'; // Assuming Inter is the primary font

// Import the new dashboard API services
import { getMemberCount, getPublicationCount, getThesisCount, getMasterPFECoount } from '@/services/dashboardApi';

const inter = Inter({ subsets: ['latin'] });

interface StatCardProps {
  title: string;
  count: number | null;
  icon: React.ElementType; // LucideReact icon component
  loading: boolean;
  error: string | null;
  iconBgColorClass: string; // New prop for background color of icon circle
  iconTextColorClass: string; // New prop for text color of icon
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon: Icon, loading, error, iconBgColorClass, iconTextColorClass }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center space-x-4"> {/* Increased rounded corners, softer shadow and border */}
      <div className={`flex-shrink-0 p-3 rounded-full ${iconBgColorClass} ${iconTextColorClass}`}> {/* Dynamic background and text color */}
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p> {/* Adjusted margin-bottom */}
        {loading ? (
          <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
        ) : error ? (
          <p className="text-red-500 text-xs">{error}</p>
        ) : (
          <p className="text-3xl font-semibold text-gray-900">{count !== null ? count : 'N/A'}</p>
        )}
      </div>
    </div>
  );
};


const DashboardOverview: React.FC = () => {
  const { isAuthenticated, userRole, token, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [memberCount, setMemberCount] = useState<number | null>(null);
  const [publicationCount, setPublicationCount] = useState<number | null>(null);
  const [thesisCount, setThesisCount] = useState<number | null>(null);
  const [masterPFECount, setMasterPFECount] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    // Only attempt to fetch data if authenticated, isAuthLoading is false, and token is available
    if (!isAuthLoading && !isAuthenticated) {
      router.push('/connexion'); // Redirect if not authenticated
      return;
    }

    if (isAuthenticated && token) {
      const fetchCounts = async () => {
        setLoading(true);
        setErrors({}); // Clear previous errors

        try {
          // Use Promise.all to fetch all counts in parallel
          const [members, publications, theses, masterPFEs] = await Promise.all([
            getMemberCount(token),
            getPublicationCount(token),
            getThesisCount(token),
            getMasterPFECoount(token),
          ]);

          setMemberCount(members);
          setPublicationCount(publications);
          setThesisCount(theses);
          setMasterPFECount(masterPFEs);

        } catch (err: any) {
          console.error('Failed to fetch dashboard counts:', err);
          // Set specific errors for each count if possible, or a general error
          setErrors({ general: err.message || 'Failed to load some dashboard data.' });
        } finally {
          setLoading(false);
        }
      };

      fetchCounts();
    }
  }, [isAuthenticated, isAuthLoading, token, router]); // Depend on auth state and token

  // Show a full-page loading indicator while auth is loading or data is being fetched
  if (isAuthLoading || loading) {
    return (
      <div className={`flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 ${inter.className}`}> {/* Lighter background */}
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
        <p className="ml-4 text-lg text-gray-700">Chargement des statistiques...</p>
      </div>
    );
  }

  // Handle general error if any
  if (errors.general) {
    return (
      <div className={`flex min-h-[calc(100vh-80px)] items-center justify-center bg-red-100 text-red-700 p-8 ${inter.className}`}>
        <p className="text-lg">Erreur: {errors.general}</p>
      </div>
    );
  }

  // Display the dashboard overview for authenticated admins
  // You might want to add role-specific content here
  if (isAuthenticated && userRole === 'admin') {
    return (

      
      <div className={`p-8 bg-gray-50 min-h-screen ${inter.className}`}> {/* Lighter background */}

      <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-xl shadow-lg mb-8">
        <ChartNoAxesCombined className="w-10 h-10 flex-shrink-0" /> {/* Larger, prominent Users icon */}
        <h1 className="text-4xl font-extrabold tracking-tight">Statistiques</h1> {/* Larger, bolder text */}
      </div>

                {/* You can add more sections/widgets here */}
        <div className=" p-6 bg-white rounded-xl shadow-md border border-gray-100"> {/* Increased rounded corners, softer shadow and border */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center ">Vue d'ensemble rapide</h2>
          <p className="text-gray-700 text-center ">
            Bienvenue sur le tableau de bord de LABTIM. Utilisez les options du menu latéral pour gérer les utilisateurs, les publications, les actualités et d'autres contenus du site.
          </p>
        </div>
        
        <div className=" mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Adjusted grid for better responsiveness */}
          <StatCard
            title="Nombre d'Utilisateurs"
            count={memberCount}
            icon={User}
            loading={loading}
            error={errors.memberCount}
            iconBgColorClass="bg-blue-200" // Light blue background
            iconTextColorClass="text-blue-600" // Darker blue icon
          />
          <StatCard
            title="Nombre des Publications"
            count={publicationCount}
            icon={Book}
            loading={loading}
            error={errors.publicationCount}
            iconBgColorClass="bg-green-100" // Light green background
            iconTextColorClass="text-green-600" // Darker green icon
          />
          <StatCard
            title="Nombre des Thèses"
            count={thesisCount}
            icon={FileText}
            loading={loading}
            error={errors.thesisCount}
            iconBgColorClass="bg-purple-100" // Light purple background
            iconTextColorClass="text-purple-600" // Darker purple icon
          />
          <StatCard
            title="Nombres des Masters / PFEs"
            count={masterPFECount}
            icon={GraduationCap}
            loading={loading}
            error={errors.masterPFECount}
            iconBgColorClass="bg-yellow-100" // Light yellow background
            iconTextColorClass="text-yellow-600" // Darker yellow icon
          />
        </div>
        
      </div>
    );
  }

  // If authenticated but not admin (e.g., a regular member), redirect to a non-admin dashboard or show limited view
  if (isAuthenticated && userRole === 'member') {
      router.push(`/dashboard/member/${router.query.id}`); // Redirect to their personal member dashboard
      return null; // Or render a simplified member view
  }

  return null; // Fallback if logic is not fully covered
};

export default DashboardOverview;
