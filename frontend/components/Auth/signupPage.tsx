// frontend/components/Auth/signupPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Changed to next/navigation for App Router
import { checkUsersExist, initialAdminSignup } from "@/services/authApi";
import { useAuth } from "@/context/AuthContext";
import { Loader2, User, Mail, Lock, Info } from "lucide-react";
import Toast from "@/components/ui/Toast";
import ErrorModal from "@/components/ui/ErrorModal";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"], // Specify subsets (e.g., 'latin', 'cyrillic')
  variable: "--font-inter", // Optional: CSS variable name
});

const SignupPage: React.FC = () => {
  // Renamed from InitialSignupPage to SignupPage
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
  } | null>(null);
  const [errorModal, setErrorModal] = useState<{
    title: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const verifyUserExistence = async () => {
      try {
        const { usersExist } = await checkUsersExist();
        if (usersExist) {
          // If users already exist, redirect to login page
          router.replace("/login");
        } else {
          setIsLoading(false); // No users, show signup form
        }
      } catch (error: any) {
        console.error("Error verifying user existence:", error);
        setErrorModal({
          title: "Erreur de Connexion",
          message: `Impossible de vérifier l'existence des utilisateurs. Veuillez réessayer plus tard. Détails: ${error.message}`,
        });
        setIsLoading(false); // Stop loading, but show error
      }
    };

    verifyUserExistence();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setToast({
        message: "Les mots de passe ne correspondent pas.",
        type: "error",
      });
      return;
    }
    setIsSubmitting(true);
    setToast(null);
    setErrorModal(null);

    try {
      const response = await initialAdminSignup({ name, email, password });
      if (response.success) {
        setToast({
          message: response.message || "Admin créé avec succès !",
          type: "success",
        });
        login(response.token, response.user);
        router.push("/dashboard");
      } else {
        throw new Error(
          response.message ||
            "Échec de la création de l'administrateur initial."
        );
      }
    } catch (error: any) {
      console.error("Initial admin signup failed:", error);
      setErrorModal({
        title: "Erreur d'Inscription",
        message:
          error.message ||
          "Une erreur inattendue est survenue lors de l'inscription de l'administrateur initial.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center bg-gray-100 ${inter.variable}`}
      >
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
        <p className="ml-3 text-gray-700">Chargement...</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gray-100 p-4 ${inter.variable}`}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Première Inscription Admin
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Bienvenue ! Il semble qu'aucun utilisateur ne soit encore enregistré.
          Veuillez créer le premier compte administrateur.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nom Complet
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Votre nom complet"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="votre@email.com"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="********"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmer le mot de passe
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="********"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
            ) : (
              <Info className="h-5 w-5 mr-2" /> // Using Info icon for setup
            )}
            {isSubmitting ? "Inscription..." : "Créer le compte Admin"}
          </button>
        </form>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {errorModal && (
        <ErrorModal
          title={errorModal.title}
          message={errorModal.message}
          onClose={() => setErrorModal(null)}
        />
      )}
    </div>
  );
};

export default SignupPage;
