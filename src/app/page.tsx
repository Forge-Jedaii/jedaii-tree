"use client";

import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, Cctv, Gamepad, Joystick, Globe, BookOpen, Swords, PawPrint, MessageSquareMore, Home, X } from 'lucide-react';
import Image from 'next/image';
import UpcomingEvents from './components/holonews';

// Types
interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

interface ProjectLink {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  category: 'site officiel' | 'community' | 'resources' | 'animalflow';
  isModal?: boolean;
  isPdf?: boolean;
}

// Logo placeholder component
const Logo = () => (
  <Image
    src="/images/logojapanforge.png"
    width={200}
    height={200}
    alt="Logo de la Forge Je'daii"
  />
);

// Modal Component (Holonews)
const HolonewsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl max-h-[95vh] sm:max-h-[90vh] md:max-h-[85vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-white transition-colors duration-200 p-1 sm:p-2"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="pr-8 sm:pr-10">
          <div className="flex items-center mb-4 sm:mb-6">
            <Cctv className="text-cyan-400 mr-2 sm:mr-3" size={24} />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Holonews</h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <UpcomingEvents />
          </div>

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-700/50">
            <div className="flex justify-center items-center space-x-2 sm:space-x-4">
              <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
              <div className="text-cyan-400 text-xs sm:text-sm font-semibold">心・技・体</div>
              <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-l from-transparent to-cyan-400"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal PDF avec solution mobile-friendly
const PdfModal = ({ isOpen, onClose, pdfPath }: { isOpen: boolean; onClose: () => void; pdfPath: string }) => {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isOpen) return null;

  const pdfUrl = `${window.location.origin}${pdfPath}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-4xl lg:max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-white transition-colors duration-200 p-1 sm:p-2 z-10"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="flex items-center mb-4 sm:mb-6">
          <BookOpen className="text-green-400 mr-2 sm:mr-3" size={24} />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            Règlements officiels combat FJ
          </h2>
        </div>

        {/* Contenu PDF adaptatif */}
        <div className="w-full h-[60vh] sm:h-[70vh] bg-slate-800/50 rounded-lg overflow-hidden">
          {isMobile ? (
            // Version mobile : lien direct vers le PDF
            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-white text-lg font-semibold mb-2">
                Visualisation PDF
              </h3>
              <p className="text-slate-300 text-sm mb-6 max-w-xs">
                Pour une meilleure expérience sur mobile, le PDF s&apos;ouvrira dans votre navigateur ou application PDF.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <BookOpen size={18} />
                  <span>Ouvrir le PDF</span>
                </a>
                <a
                  href={pdfUrl}
                  download
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  <span>⬇️</span>
                  <span>Télécharger</span>
                </a>
              </div>
            </div>
          ) : (
            // Version desktop : embed avec iframe
            <>
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full rounded-lg border-0"
                title="Règlements officiels combat FJ"
                loading="lazy"
              />
              {/* Fallback si iframe ne fonctionne pas */}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-slate-900/90 p-4 rounded-lg pointer-events-auto">
                  <p className="text-white text-sm mb-3">Problème d&apos;affichage ?</p>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors"
                  >
                    <BookOpen size={14} />
                    <span>Ouvrir dans un nouvel onglet</span>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Liens de téléchargement pour desktop */}
        {!isMobile && (
          <div className="mt-4 text-center">
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
            >
              <span>⬇️</span>
              <span>Télécharger le PDF</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const Header = () => (
  <header className="text-center mb-8 relative">
    <div className="relative inline-block">
      <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto border-2 border-cyan-400/30 shadow-lg shadow-cyan-400/20 overflow-hidden bg-slate-900/50">
        <Logo />
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
      <div className="absolute top-1 -right-5 w-4 h-4 bg-orange-500 rounded-full animate-pulse delay-300 shadow-lg shadow-purple-400/50"></div>
    </div>
    <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
      道場 Forge <span className="text-cyan-400">Je&apos;daii</span>
    </h1>
    <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
  </header>
);

const Description = () => (
  <section className="text-center mb-12 max-w-2xl mx-auto">
    <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-xl">
      <p className="text-slate-300 text-lg leading-relaxed mb-4">
        Bienvenue dans notre dojo moderne où <span className="text-cyan-400 font-semibold">l&apos;art martial ancestral</span>{' '}
        <span className="text-cyan-400 font-semibold">rencontre la technologie d&apos;aujourd&apos;hui</span>.
      </p>

      <p className="text-slate-400 text-base">
        Forger votre esprit, votre corps et votre art de vivre.
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse delay-150"></div>
        <div className="w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
  </section>
);

const SocialLinks = () => {
  const socialLinks: SocialLink[] = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/laforgejedaii/',
      icon: <Instagram size={24} />,
      color: 'from-pink-500 to-purple-600'
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/AjKM9vduNS',
      icon: <Joystick size={24} />,
      color: 'from-slate-800 to-slate-900'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/laforgejedaii?locale=fr_FR',
      icon: <Facebook size={24} />,
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@ForgeJedaii',
      icon: <Youtube size={24} />,
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-white text-center mb-6">
        Suivez notre <span className="text-cyan-400">communauté</span>
      </h2>
      <div className="flex justify-center space-x-4 flex-wrap gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            className={`group relative p-4 rounded-2xl bg-gradient-to-br ${link.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}
          >
            <div className="text-white group-hover:scale-110 transition-transform duration-300">
              {link.icon}
            </div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
          </a>
        ))}
      </div>
    </section>
  );
};

const ProjectLinks = ({ onOpenModal }: { onOpenModal: (type: 'holonews' | 'pdf', pdfPath?: string) => void }) => {
  const projectLinks: ProjectLink[] = [
    {
      title: 'Site principal',
      description: 'Toutes les informations regroupées en un site.',
      url: 'https://www.forgejedaii.fr/',
      icon: <Home size={24} />,
      category: 'site officiel'
    },
    {
      title: 'Animal Flow',
      description: 'Tout sur la pratique et le mouvement',
      url: 'https://www.animalflow-jedaii.fr/',
      icon: <PawPrint size={24} />,
      category: 'animalflow'
    },
    {
      title: 'Boutique digitale',
      description: 'Réserver un cours, équipements & tenues, adhésions...',
      url: 'https://www.helloasso.com/associations/forge-je-daii',
      icon: <BookOpen size={24} />,
      category: 'resources'
    },
    {
      title: 'Battle Royale',
      description: 'Prochainement.',
      url: '#',
      icon: <Swords size={24} />,
      category: 'community'
    },
    {
      title: 'Codatech',
      description: 'Technologie BattleSword et O.ARK',
      url: 'https://oark.io/',
      icon: <Globe size={24} />,
      category: 'resources'
    },
    {
      title: 'Contact via whatsapp',
      description: 'Pour toutes animations, interventions ou techniques',
      url: 'https://wa.me/+33667420774',
      icon: <MessageSquareMore size={24} />,
      category: 'community'
    },
    {
      title: 'Holonews',
      description: 'Nos prochains événements et actualités',
      url: '',
      icon: <Cctv size={24} />,
      category: 'resources',
      isModal: true
    },
    {
      title: 'CSC- Combat Sensei Compagnon',
      description: 'Le compagnon idéal pour l arbitrage et suivi d événements, un guide pour les grades est inclus',
      url: 'https://combat-sensei-compagnon-csc-next-js.vercel.app/',
      icon: <Gamepad size={24} />,
      category: 'animalflow',
    },
    {
      title: 'Règlements officiels combat FJ',
      description: 'Consulter les règlements officiels en format PDF',
      url: '/documents/ReglementsFJ.pdf',
      icon: <BookOpen size={24} />,
      category: 'resources',
      isPdf: true
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'site officiel':
        return 'from-cyan-500/20 to-blue-500/20 border-cyan-400/30 hover:border-cyan-400/50';
      case 'community':
        return 'from-purple-500/20 to-pink-500/20 border-purple-400/30 hover:border-purple-400/50';
      case 'resources':
        return 'from-green-500/20 to-emerald-500/20 border-green-400/30 hover:border-green-400/50';
      case 'animalflow':
        return 'from-purple-500/20 to-pink-500/20 border-purple-400/30 hover:border-purple-400/50';
      default:
        return 'from-slate-500/20 to-slate-600/20 border-slate-400/30 hover:border-slate-400/50';
    }
  };

  const handleClick = (link: ProjectLink, e: React.MouseEvent) => {
    if (link.isModal) {
      e.preventDefault();
      onOpenModal('holonews');
    } else if (link.isPdf) {
      e.preventDefault();
      onOpenModal('pdf', link.url);
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-white text-center mb-8">
        Un besoin <span className="text-cyan-400">spécifique ?</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectLinks.map((link) => (
          <a
            key={link.title}
            href={link.isModal || link.isPdf ? '#' : link.url}
            onClick={(e) => handleClick(link, e)}
            className={`group relative p-6 rounded-2xl bg-gradient-to-br ${getCategoryColor(link.category)} border backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer`}
          >
            <div className="flex items-center mb-4">
              <div className="text-cyan-400 mr-3 group-hover:scale-110 transition-transform duration-300">
                {link.icon}
              </div>
              <h3 className="text-white font-semibold text-lg">{link.title}</h3>
            </div>
            <p className="text-slate-300 text-sm">{link.description}</p>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="text-center pt-8 border-t border-slate-700/50">
    <div className="flex justify-center items-center space-x-4 mb-4">
      <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
      <div className="text-cyan-400 text-sm font-semibold">心・技・体</div>
      <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-cyan-400"></div>
    </div>
    <p className="text-xs text-slate-400 animate-pulse px-2 text-center">
      © 2025 Forge Je&apos;daii - Développé avec ❤️ par{" "}
      <a
        href="https://www.linkedin.com/in/lococoanthony/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        @jedaiidev
      </a>
    </p>
  </footer>
);

// Composant principal
const DojoProfilePage = () => {
  const [isHolonewsOpen, setIsHolonewsOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [pdfSrc, setPdfSrc] = useState<string>('/documents/ReglementsFJ.pdf');

  const handleOpenModal = (type: 'holonews' | 'pdf', src?: string) => {
    if (type === 'holonews') {
      setIsHolonewsOpen(true);
    } else {
      if (src) setPdfSrc(src);
      setIsPdfOpen(true);
    }
  };

  const closeHolonews = () => setIsHolonewsOpen(false);
  const closePdf = () => setIsPdfOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <Header />
        <Description />
        <SocialLinks />
        <ProjectLinks onOpenModal={handleOpenModal} />
        <Footer />
      </div>

      <HolonewsModal isOpen={isHolonewsOpen} onClose={closeHolonews} />
      <PdfModal isOpen={isPdfOpen} onClose={closePdf} pdfPath={pdfSrc} />
    </div>
  );
};

export default DojoProfilePage;