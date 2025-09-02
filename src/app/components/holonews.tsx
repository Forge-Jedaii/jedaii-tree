'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  color: string;
  image: string;
  buttonText: string;
  buttonColor: string;
  newsMessages: string[];
  newsTag: string;
}

interface UpcomingEventsProps {
  events?: Event[];
  title?: string;
  className?: string;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ 
  events, 
  title = "Événements à Venir", 
  className = "" 
}) => {
  const [currentMessageIndexes, setCurrentMessageIndexes] = useState<number[]>([0, 0, 0, 0]);
  const [buttonStates, setButtonStates] = useState<Record<number, string | null>>({});

  const defaultEvents: Event[] = [
    {
      id: 1,
      title: "Cinéma Pathé Lingostière",
      description: "Inauguration et ouverture pour ce weekend au cinéma Pathé Lingostière en mode SAMURAI, Vendredi show sur scène, samedi, démonstrations, stands, initiations et bien plus",
      date: "19-20 Septembre 2025",
      color: "from-blue-500 to-purple-600",
      image: "/images/both.png",
      buttonText: "はい",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
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
      buttonText: "Massilia",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
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
      buttonText: "Ici c'est Paris",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
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
      buttonText: "PAF",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
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
      buttonText: "La Force ?",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      newsMessages: ["L'appel de la Forge", "Tournoi officiel", "Je'daii Life"],
      newsTag: "FJ-20"
    },
    
  ];

  const eventsData = events || defaultEvents;

  useEffect(() => {
    const intervals = eventsData.map((event, index) => {
      return setInterval(() => {
        setCurrentMessageIndexes(prev => {
          const newIndexes = [...prev];
          newIndexes[index] = (newIndexes[index] + 1) % event.newsMessages.length;
          return newIndexes;
        });
      }, 4000 + (index * 1000));
    });

    return () => intervals.forEach(clearInterval);
  }, [eventsData]);

  const handleButtonClick = (eventId: number) => {
    setButtonStates(prev => ({ ...prev, [eventId]: 'clicked' }));
    
    setTimeout(() => {
      setButtonStates(prev => ({ ...prev, [eventId]: 'success' }));
    }, 150);

    setTimeout(() => {
      setButtonStates(prev => ({ ...prev, [eventId]: null }));
    }, 2000);
  };

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">{title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {eventsData.map((event, index) => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            {/* Bannière de news */}
            <div 
              className="h-10 overflow-hidden relative flex items-center justify-center"
              style={{
                background: "linear-gradient(to right, #000000, #051525, #000000)",
                borderRadius: 4,
                boxShadow: "0 0 10px rgba(0, 100, 200, 0.3)",
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="whitespace-nowrap text-center flex items-center gap-x-4 animate-pulse">
                  <span className="text-yellow-500 font-medium text-sm tracking-wider animate-pulse font-[Aurebesh]">
                    Holonews
                  </span>
                  <span className="text-cyan-400 font-medium text-sm tracking-wider">
                    {event.newsMessages[currentMessageIndexes[index]]}
                  </span>
                  <span className="text-yellow-500 font-medium text-sm tracking-wider animate-pulse font-[Aurebesh]">
                    {event.newsTag}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Image de l'événement */}
<div className={`h-48 w-full bg-gradient-to-br ${event.color} flex items-center justify-center overflow-hidden rounded-t-lg`}>
  <Image 
    src={event.image} 
    alt={event.title} 
    width={280}        // largeur adaptée à la vignette
    height={120}       // hauteur adaptée
    className="object-contain" // <-- l'image s'adapte sans déformer le fond
  />
</div>

            
            {/* Contenu */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📅 {event.date}</span>
                <button 
                  className={`text-white px-4 py-2 rounded-lg transition-all duration-200 ${
                    buttonStates[event.id] === 'success' ? 'bg-green-500' : event.buttonColor
                  } ${buttonStates[event.id] === 'clicked' ? 'transform scale-95' : ''}`}
                  onClick={() => handleButtonClick(event.id)}
                >
                  {buttonStates[event.id] === 'success' ? '✓ Fait !' : event.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
