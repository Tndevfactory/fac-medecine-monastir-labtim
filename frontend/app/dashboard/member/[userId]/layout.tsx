// frontend/app/dashboard/member/[userId]/layout.tsx
'use client';

import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import MemberSidebar from '@/components/member/MemberSidebar'; // Import the new sidebar
import { Loader2 } from 'lucide-react'; // For loading state

interface MemberDashboardLayoutProps {
  children: ReactNode;
  params: {
    userId: string; // The userId from the URL parameter
  };
}

const MemberDashboardLayout: React.FC<MemberDashboardLayoutProps> = ({ children, params }) => {
  console.log('MemberDashboardLayout: Component rendering...');
  const { userId: routeUserId } = params; // FIX: Destructure userId from params here
  const { isAuthenticated, isLoading: isAuthLoading, userRole, userId: loggedInUserId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('MemberDashboardLayout useEffect: Running...');
    console.log('  isAuthenticated:', isAuthenticated);
    console.log('  isAuthLoading:', isAuthLoading);
    console.log('  userRole:', userRole);
    console.log('  loggedInUserId:', loggedInUserId);
    console.log('  routeUserId (from params):', routeUserId); // Use routeUserId here

    // Redirect if not authenticated after auth loading completes
    if (!isAuthLoading && !isAuthenticated) {
      console.log('MemberDashboardLayout: Not authenticated, redirecting to /connexion');
      router.replace('/connexion');
      return;
    }

    // Ensure routeUserId is available before using it in the check
    if (routeUserId && isAuthenticated && userRole !== 'admin' && loggedInUserId !== routeUserId) {
      console.log('MemberDashboardLayout: Authenticated but unauthorized, redirecting to /dashboard');
      router.replace('/dashboard');
      return;
    }
    console.log('MemberDashboardLayout useEffect: Authentication/Authorization checks passed.');

  }, [isAuthenticated, isAuthLoading, userRole, loggedInUserId, routeUserId, router]); // FIX: Use routeUserId in dependencies

  // Show a full-page loading indicator while auth is loading
  if (isAuthLoading) {
    console.log('MemberDashboardLayout: Showing auth loading state.');
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <span className="ml-3 text-lg text-gray-700">Chargement de l'espace membre...</span>
      </div>
    );
  }

  // If not authenticated or not authorized (after auth loading), return null
  // The useEffect above will handle the redirection.
  // Ensure routeUserId is available before using it in the final check
  if (!isAuthenticated || (routeUserId && userRole !== 'admin' && loggedInUserId !== routeUserId)) {
    console.log('MemberDashboardLayout: Returning null due to failed auth/authz check.');
    return null;
  }         

  console.log('MemberDashboardLayout: Rendering main layout structure.');
  return (
    <div className="flex min-h-screen bg-white">
      <MemberSidebar /> {/* The member-specific sidebar */}
      <main className="flex-1"> {/* Main content area */}
        {children} {/* This will render the content from page.tsx or nested routes */}
      </main>
    </div>
  );
};

export default MemberDashboardLayout;
