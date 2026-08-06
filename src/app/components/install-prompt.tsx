"use client";

import Image from "next/image";
import { PlusSquare, Share, X } from "lucide-react";
import { useEffect, useState } from "react";

const DISMISSED_KEY = "jedaii-ios-install-dismissed";

export default function InstallPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isStandalone = navigatorWithStandalone.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
    const dismissed = window.localStorage.getItem(DISMISSED_KEY) === "1";
    if (!isIOS || isStandalone || dismissed) return;
    const timer = window.setTimeout(() => setVisible(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="ios-install" role="dialog" aria-labelledby="ios-install-title" aria-describedby="ios-install-description">
      <button className="ios-install-close" onClick={dismiss} aria-label="Fermer la suggestion d’installation"><X size={18} /></button>
      <div className="ios-install-brand">
        <Image src="/images/logojapanforge.png" width={52} height={52} alt="" />
        <div><span>Application Je’Daii</span><strong id="ios-install-title">Installer sur votre iPhone</strong></div>
      </div>
      <p id="ios-install-description">Ajoutez le Hub à votre écran d’accueil pour y accéder comme une application.</p>
      <ol>
        <li><span><Share size={17} /></span> Touchez <b>Partager</b> dans Safari</li>
        <li><span><PlusSquare size={17} /></span> Puis <b>Sur l’écran d’accueil</b></li>
      </ol>
      <span className="ios-install-pointer" aria-hidden="true" />
    </aside>
  );
}
