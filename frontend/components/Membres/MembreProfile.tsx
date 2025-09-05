'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import { ExternalLink } from 'lucide-react';
import { User } from '@/types/index'; // Import the User type

const inter = Inter({ subsets: ['latin'] });

interface MembreProfileProps {
  member: User; // Now expects a User object
}

const avatarPlaceholder = '/images/avatar-placeholder.png';

const MembreProfile = ({ member }: MembreProfileProps) => {
  if (!member) {
    return <div className="text-center py-12 text-gray-600">Membre introuvable.</div>;
  }

  // FIX: Simplified image path resolution.
  // Assuming member.image already contains the correct relative path (e.g., '/uploads/filename.jpg')
  // or a full URL from the backend API.
  // If member.image is null or empty, it will fall back to avatarPlaceholder.
  const memberImage = member.image || avatarPlaceholder;


  return (
    <div className={`min-h-screen bg-white ${inter.className}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header with Name and ORCID */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 uppercase tracking-wider">
            {member.name || 'Nom Inconnu'}
          </h1>
          <div className="w-16 h-0.5 bg-gray-400 mx-auto mb-4"></div>
          {member.orcid && (
            <div className="text-right">
              <a
                href={member.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                ORCID <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Left Column */}
          <div>
            {/* Profile Image */}
            <div className="mb-6 flex justify-center">
              <img
                src={memberImage}
                alt={member.name || 'Member'}
                className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-white"
              />
            </div>

            {/* Expertises Section */}
            {member.expertises && member.expertises.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Expertises</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  {member.expertises.map((expertise, index) => (
                    <li key={index}>• {expertise}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Contact Info */}
            <div className="text-sm">
              {member.phone && (
                <div className="mb-2">
                  <span className="font-semibold text-gray-900">Téléphone</span>
                  <div className="text-gray-700">{member.phone}</div>
                </div>
              )}
              {member.email && (
                <div>
                  <span className="font-semibold text-gray-900">Courriel</span>
                  <div>
                    <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                      {member.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Biography */}
            {member.biography && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Biographie</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {member.biography}
                </p>
              </div>
            )}

            {/* Research Interests */}
            {member.researchInterests && member.researchInterests.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Intérêts de recherche</h2>
                <ul className="space-y-3 text-sm text-gray-700">
                  {member.researchInterests.map((interest, index) => (
                    <li key={index}>• {interest}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* University Education */}
            {member.universityEducation && member.universityEducation.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Formation universitaire</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  {member.universityEducation.map((edu, index) => (
                    <li key={index}>• {edu}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Publications Section - Placeholder */}
        <div className="border-t border-gray-300 pt-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Publications</h2>
              {member.orcid && (
                <a
                  href={member.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                >
                  ORCID <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6 text-xs text-gray-700 leading-relaxed">
            <p className="text-center text-gray-500">
              Les publications de ce membre seront affichées ici.
              (Implémentation future : appel API pour les publications liées à l'ID du membre)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembreProfile;
