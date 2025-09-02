'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  color: string;
  image: string;
  newsMessages: string[];
  newsTag: string;
}

interface UpcomingEventsProps {
  events?: Event[];
  title?: string;
  className?: string;
}

// DEFAULT EVENTS hors du composant pour éviter le warning ESLint
const defaultEvents: Event[] = [
  {
    id: 1,
    title: "Cinéma Pathé Lingostière",
    description: "Inauguration et ouverture pour ce weekend au cinéma Pathé Lingostière en mode SAMURAI, Vendredi show sur scène, samedi, démonstrations, stands, initiations et bien plus",
    date: "19-20 Septembre 2025",
    color: "from-blue-500 to-purple-600",
    image: "/images/both.png",
    newsMessages: ["Princess Mononoke IMAX | vendredi soir", "Demon Slayer | Samedi", "Un héritage vivant"],
    newsTag: "FJ-20"
  },
  {
    id: 2,
    title: "Marseille",
    description: "Stand Codatech x Forge Je'daii. Retrouver nous pour des initiations, démonstrations côté FJ, et rentrez dans l'arène avec Battle Sword pour être le meilleur combattant !",
    date: "27,28 février, 1er mars 2026",
    color: "from-blue-500 to-purple-600",
    image: "/images/both.png",
    newsMessages: ["Japan Expo Marseille", "Codatech x Forge Je'daii", "Stand à venir !"],
    newsTag: "FJ-20"
  },
  {
    id: 3,
    title: "Paris",
    description: "Stand Codatech x Forge Je'daii. Retrouver nous pour des initiations, démonstrations côté FJ, et rentrez dans l'arène avec Battle Sword pour être le meilleur combattant !",
    date: "du 9 au 12 juillet 2026",
    color: "from-blue-500 to-purple-600",
    image: "/images/both.png",
    newsMessages: ["Japan Expo 25 ans", "Codatech x Forge Je'daii", "Japan Expo Paris"],
    newsTag: "FJ-20"
  },
  {
    id: 4,
    title: "Nice",
    description: "Stand Codatech x Forge Je'daii. Retrouver nous pour des initiations, démonstrations côté FJ, et rentrez dans l'arène avec Battle Sword pour être le meilleur combattant !",
    date: "25-26 avril 2026",
    color: "from-blue-500 to-purple-600",
    image: "/images/both.png",
    newsMessages: ["Play Azur Festival", "Codatech x Forge Je'daii", "Riviera"],
    newsTag: "FJ-20"
  },
  {
    id: 5,
    title: "Nice",
    description: "1er tournoi de combat réaliste au sabre laser avec le réglement officiel Forge Je'daii, ce n'est pas qu'un tournoi, il y aura des animations, des partenaires et bien plus !",
    date: "Mai 2026 (date à confirmer)",
    color: "from-blue-500 to-purple-600",
    image: "/images/both.png",
    newsMessages: ["L'appel de la Forge", "Tournoi officiel", "Je'daii Life"],
    newsTag: "FJ-20"
  },
];

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  events,
  title = "Événements à Venir",
  className = ""
}) => {

  const [expandedStates, setExpandedStates] = useState<Record<number, boolean>>({});

  // Memoisation pour stabiliser les données
  const eventsData = useMemo(() => events || defaultEvents, [events]);

  const [currentMessageIndexes, setCurrentMessageIndexes] = useState(
    Array(eventsData.length).fill(0)
  );

  // Alternance des newsMessages pour tous les événements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndexes(prev =>
        prev.map((idx, i) => (idx + 1) % eventsData[i].newsMessages.length)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [eventsData]);

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
        {title}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {eventsData.map((event, index) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Bannière Holonews */}
            <div
              className="h-8 sm:h-10 overflow-hidden relative flex items-center"
              style={{
                background: "linear-gradient(to right, #000000, #051525, #000000)",
                borderRadius: 4,
                boxShadow: "0 0 10px rgba(0, 100, 200, 0.3)",
              }}
            >
              <div className="absolute whitespace-nowrap flex items-center gap-x-2 sm:gap-x-4 marquee">
                <span className="text-yellow-500 font-medium text-xs sm:text-sm tracking-wider font-[Aurebesh]">
                  Holonews
                </span>
                <span className="text-cyan-400 font-medium text-xs sm:text-sm tracking-wider">
                  {event.newsMessages[currentMessageIndexes[index]]}
                </span>
                <span className="text-yellow-500 font-medium text-xs sm:text-sm tracking-wider font-[Aurebesh]">
                  {event.newsTag}
                </span>
              </div>
            </div>

            {/* Image de l'événement */}
            <div className={`h-32 sm:h-40 md:h-48 w-full bg-gradient-to-br ${event.color} flex items-center justify-center overflow-hidden`}>
              <Image
                src={event.image}
                alt={event.title}
                width={280}
                height={120}
                className="object-contain w-auto h-auto max-w-full max-h-full"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            {/* Contenu */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                {event.title}
              </h3>

              <p className={`text-sm sm:text-base text-gray-600 mb-2 flex-1 ${
                expandedStates[event.id] ? '' : 'line-clamp-3 sm:line-clamp-4'
              }`}>
                {event.description}
              </p>

              {event.description.length > 100 && (
                <button
                  className="text-blue-500 text-sm underline mt-1 self-start"
                  onClick={() => setExpandedStates(prev => ({ ...prev, [event.id]: !prev[event.id] }))}
                >
                  {expandedStates[event.id] ? 'Lire moins' : 'Lire plus'}
                </button>
              )}

              <span className="text-xs sm:text-sm text-gray-500 flex items-center mt-auto">
                <span className="mr-1">📅</span>
                <span className="break-words">{event.date}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee {
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .marquee {
            animation: scroll 15s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default UpcomingEvents;
