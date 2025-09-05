// frontend/app/dashboard/member/[userId]/masters-stages/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import MemberMasterSIManagement from '@/components/member/MemberMasterSIManagement'; // Import the new component
import ErrorModal from '@/components/ui/ErrorModal'; // Import ErrorModal

interface MemberMasterSIsPageProps {
  params: {
    userId: string; // The userId from the URL parameter
  };
}

const MemberMasterSIsPage: React.FC<MemberMasterSIsPageProps> = ({ params }) => {
  const { userId: routeUserId } = params; // Destructure userId from params to avoid warning
  const { isAuthenticated, isLoading: isAuthLoading, userRole, userId: loggedInUserId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated after auth loading completes
    if (!isAuthLoading && !isAuthenticated) {
      router.replace('/connexion');
      return;
    }

    // Ensure the logged-in user is trying to access their OWN Master/PFE page
    if (userRole === 'member' && loggedInUserId !== routeUserId) {
      // If a member tries to access another member's Master/PFE page, redirect to their own
      router.replace(`/dashboard/member/${loggedInUserId}/masters-stages`); // Redirect to their own Master/PFE page
      return;
    }
    // If user is an admin, they should not be on this page. Redirect them to the admin dashboard.
    if (userRole === 'admin') {
      router.replace('/dashboard'); // Redirect to general admin dashboard
      return;
    }
  }, [isAuthenticated, isAuthLoading, userRole, loggedInUserId, routeUserId, router]);

  // Show a full-page loading indicator while auth is loading or redirecting
  if (isAuthLoading || !isAuthenticated || (userRole === 'member' && loggedInUserId !== routeUserId) || userRole === 'admin') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <span className="ml-3 text-lg text-gray-700">Chargement de la gestion des Masters / PFEs...</span>
      </div>
    );
  }

  // If we reach here, it means the user is a member and is accessing their own Master/PFE page.
  return (
    <div className="min-h-screen bg-white">
      {/* The MemberMasterSIManagement component will handle its own loading and error states for data */}
      <MemberMasterSIManagement />
    </div>
  );
};

export default MemberMasterSIsPage;
