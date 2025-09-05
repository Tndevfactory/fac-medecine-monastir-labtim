// frontend/app/dashboard/member/[userId]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User as UserType } from '@/types/index';
import { getUserById } from '@/services/dashboardApi'; // API to fetch user details
import { Loader2, User as UserIcon } from 'lucide-react';
import MemberProfileEdit from '@/components/member/profile/MemberProfileEdit'; // Import the NEW editable component
import ErrorModal from '@/components/ui/ErrorModal'; // Import ErrorModal

interface MemberDashboardPageProps {
  params: {
    userId: string; // The userId from the URL parameter
  };
}

const MemberDashboardPage: React.FC<MemberDashboardPageProps> = ({ params }) => {
  // Destructure userId from params directly at the component top
  const { userId: routeUserId } = params; 

  const { isAuthenticated, isLoading: isAuthLoading, token, userId: loggedInUserId, userRole } = useAuth();
  const router = useRouter();

  const [memberData, setMemberData] = useState<UserType | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [errorModal, setErrorModal] = useState<{ title: string; briefDescription: string; detailedError?: string } | null>(null);

  useEffect(() => {
    // Only proceed if auth state is settled and authenticated
    if (isAuthLoading || !isAuthenticated) {
      if (!isAuthLoading && !isAuthenticated) {
        router.replace('/connexion');
      }
      return; // Stop execution if still loading auth or not authenticated
    }

    // Authorization check: User can only view their own profile unless admin
    if (userRole === 'member' && loggedInUserId !== routeUserId) {
      setErrorModal({
        title: 'Accès non autorisé',
        briefDescription: 'Vous n\'êtes pas autorisé à voir ce profil.',
        detailedError: `Tentative d\'accès au profil de ${routeUserId} par l'utilisateur ${loggedInUserId} avec le rôle ${userRole}.`
      });
      // Optionally redirect after showing error modal for unauthorized access
      router.replace('/dashboard'); 
      setIsLoadingData(false); // Stop loading if unauthorized
      return;
    }

    const fetchMemberProfile = async () => {
      setIsLoadingData(true);
      setErrorModal(null); // Clear any previous errors before new fetch
      try {
        const response = await getUserById(routeUserId); // Use routeUserId here
        if (response.success && response.user) {
          setMemberData(response.user);
        } else {
          // API call was successful but backend returned success: false
          setErrorModal({
            title: 'Échec du chargement du profil',
            briefDescription: response.message || 'Une erreur inconnue est survenue lors du chargement du profil membre.',
            detailedError: response.message || 'La réponse du serveur n\'indique pas de succès.'
          });
        }
      } catch (err: any) {
        console.error('Error fetching member profile:', err);
        // Catch network errors or errors thrown by getUserById
        setErrorModal({
          title: 'Erreur réseau ou serveur',
          briefDescription: 'Impossible de récupérer les données du profil. Veuillez vérifier votre connexion ou réessayer plus tard.',
          detailedError: err.message || 'Une erreur inattendue est survenue lors du chargement du profil.'
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    // Only fetch if authenticated and auth loading is complete
    fetchMemberProfile();

  }, [isAuthenticated, isAuthLoading, token, routeUserId, loggedInUserId, userRole, router]); // Use routeUserId in dependencies

  // Render ErrorModal if an error occurred
  if (errorModal) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 p-8">
        <ErrorModal
          title={errorModal.title}
          briefDescription={errorModal.briefDescription}
          detailedError={errorModal.detailedError}
          onClose={() => {
            setErrorModal(null); // Clear modal state
            // Optionally redirect after closing error if it's a critical error
            if (errorModal.title === 'Accès non autorisé') {
              router.replace('/dashboard');
            }
          }}
        />
      </div>
    );
  }

  // Show loading state if still loading auth or data
  if (isAuthLoading || isLoadingData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <span className="ml-3 text-lg text-gray-700">Chargement du profil membre...</span>
      </div>
    );
  }

  // If no member data after loading (and no error modal was triggered), display a fallback message
  if (!memberData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 bg-gray-50 p-8">
        <p className="text-lg">Aucune donnée de profil disponible pour le moment.</p>
      </div>
    );
  }

  // Determine if the current profile should be editable
  const shouldBeEditable = userRole === 'admin' || loggedInUserId === routeUserId;

  // Finally, render the profile edit component if data is available
  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-xl shadow-lg mb-8">
        <UserIcon className="w-10 h-10 flex-shrink-0" />
        <h1 className="text-4xl font-extrabold tracking-tight">Mon Profil</h1>
      </div>

      {/* Render the MemberProfileEdit component, passing the fetched data and editability */}
      <MemberProfileEdit
        initialUser={memberData}
        isEditable={shouldBeEditable}
        onProfileUpdated={(updatedUser, newToken) => {
          // Callback from MemberProfileEdit when save is successful
          setMemberData(updatedUser); // Update the page's state with the new data
          // AuthContext login should handle token update if provided
        }}
      />
    </div>
  );
};

export default MemberDashboardPage;
