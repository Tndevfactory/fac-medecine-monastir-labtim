// components/events/EventsSection.tsx
'use client';

import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Events = () => {
  const events = [
    {
      id: 1,
      date: { day: '09', month: 'juin', year: '2025' },
      title: 'Soutenance de thèse : Nouveaux Horizons en Imagerie Cérébrale',
      // description: 'Removed description as per request', // Removed
      link: '/evenements/soutenance-these-ia'
    },
    {
      id: 2,
      date: { day: '13', month: 'juin', year: '2025' },
      title: 'Séminaire Lévésium 2025 : Innovations en Santé Connectée',
      // description: 'Removed description as per request', // Removed
      link: '/evenements/seminaire-levesium'
    },
    {
      id: 3,
      date: { day: '03', month: 'juillet', year: '2025' },
      title: 'Atelier pré-départ : Préparation à la Mobilité Internationale des Chercheurs',
      // description: 'Removed description as per request', // Removed
      link: '/evenements/atelier-mobilite-internationale'
    },
  ];

  return (
    // Changed section background to white, removed overflow-hidden (not strictly necessary here but often good for layout consistency)
    <section className={`py-16 bg-white min-h-[40vh] flex flex-col justify-center ${inter.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Événements</h2>
          <a
            href="/evenements"
            className="text-blue-600 flex items-center transition-all duration-300 group relative"
          >
            <span className="block transition-transform duration-300 group-hover:-translate-x-1 relative pb-0.5">
              Voir tous les événements
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
            <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>

        {/* Events List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            // Removed bg-gray-100, shadow-md, flex, rounded-lg and hover effects from card
            // Also removed "En savoir plus" button and its wrapping <a>
            <div key={event.id} className="p-4"> {/* Keep padding for internal spacing */}
              <div className="flex items-start"> {/* Align date and text to start */}
                <div className="text-blue-600 font-bold text-3xl mr-4 leading-none text-center"> {/* Centered day and month */}
                  {event.date.day}
                  <span className="block text-xl uppercase mt-1 text-gray-600">{event.date.month}</span> {/* Month color to grey */}
                </div>
                <div>
                  <a href={event.link} className="block group">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors duration-200">
                      {event.title}
                    </h3>
                  </a>
                  {/* Removed description <p> tag */}
                </div>
              </div>
              {/* Removed "En savoir plus" button */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;