import React from 'react';
import { Instagram, Facebook, Youtube, Joystick, Globe, BookOpen, Swords, PawPrint, MessageSquareMore, House } from 'lucide-react';
import Image from 'next/image';

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
}

// Composants
const Header = () => (
  <header className="text-center mb-8 relative">
    <div className="relative inline-block">
      <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto border-2 border-cyan-400/30 shadow-lg shadow-cyan-400/20 overflow-hidden bg-slate-900/50">
        <Image
      src="/images/logojapanforge.png"
      width={200}
      height={200}
      alt="Logo de la Forge Je'daii"
    />
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

const ProjectLinks = () => {
  const projectLinks: ProjectLink[] = [
    {
      title: 'Site principal',
      description: 'Toutes les informations regroupées en un site.',
      url: 'https://www.forgejedaii.fr/',
      icon: <House size={24} />,
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
      title: 'Contact',
      description: 'Pour toutes animations, interventions ou techniques',
      url: 'https://wa.me/+33667420774',
      icon: <MessageSquareMore size={24} />,
      category: 'community'
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
      default:
        return 'from-slate-500/20 to-slate-600/20 border-slate-400/30 hover:border-slate-400/50';
        case 'animalflow':
        return 'from-purple-500/20 to-pink-500/20 border-purple-400/30 hover:border-purple-400/50';
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
            href={link.url}
            className={`group relative p-6 rounded-2xl bg-gradient-to-br ${getCategoryColor(link.category)} border backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Éléments de fond décoratifs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Lignes décoratives */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <Header />
        <Description />
        <SocialLinks />
        <ProjectLinks />
        <Footer />
      </div>
    </div>
  );
};

export default DojoProfilePage;