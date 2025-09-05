// app/reinitialiser-mot-de-passe/[token]/page.tsx
'use client'; // This page is a client component

import React, { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import ResetPasswordPage from '@/components/Auth/ResetPasswordPage'; // We'll create this next

interface ResetPasswordRootPageProps {
  params: {
    token: string; // The dynamic token from the URL
  };
}

const ResetPasswordRootPage: React.FC<ResetPasswordRootPageProps> = ({ params }) => {
  const router = useRouter();


  const token = params.token;

  if (!token) {
    // Handle case where token is missing (e.g., direct access without token)
    // You might want to redirect to a generic error page or login
    useEffect(() => {
      router.replace('/connexion'); // Redirect to login if token is missing
    }, [router]);
    return null; // Or render a placeholder
  }

  return <ResetPasswordPage token={token} />;
};

export default ResetPasswordRootPage;
