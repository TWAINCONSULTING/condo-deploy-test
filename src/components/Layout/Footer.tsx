import React, { useState } from 'react';
import { Mail, Building2, AlertTriangle, Lightbulb } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AboutDialog } from '../ui/AboutDialog';

export function Footer() {
  const [email, setEmail] = useState('');
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Email submitted:', email);
      setEmail('');
      navigate('/takk');
    }
  };

  return (
    <footer className="bg-condo-dark text-white w-full">
      <div className="max-w-screen-sm mx-auto px-4 sm:max-w-7xl sm:px-6 lg:px-8 py-6 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h1 className="text-lg sm:text-2xl font-bold text-condo-light font-logo uppercase tracking-[0.05em]">
                  CONDO
                </h1>
              </div>
              <p className="text-sm text-primary-main">
                Vi digitaliserer og forenkler hverdagen for borettslag og sameier
              </p>
            </div>

            <div className="mt-6 sm:mt-auto mb-4">
              <h2 className="text-condo-light font-semibold mb-3">Gi tilbakemelding</h2>
              <div className="space-y-2 text-sm">
                <a 
                  href="mailto:kontakt@condo.no" 
                  className="block text-base-light0 hover:text-condo-med transition-colors"
                >
                  kontakt@mincondo.no
                </a>
                <Link
                  to="/rapporter"
                  className="block text-base-light0 hover:text-condo-med transition-colors"
                >
                  Rapporter et problem med nettsiden
                </Link>
                <Link
                  to="/produktutvikling"
                  className="block text-base-light0 hover:text-condo-med transition-colors"
                >
                  Hjelp oss å bli bedre
                </Link>
              </div>
            </div>
          </div>

          {/* Demo Version Contact */}
          <div className="bg-condo-light p-4 sm:p-6 rounded-lg">
            <h3 className="text-condo-dark sm:text-xl font-semibold mb-2">
              Liker du også demoversjonen?
            </h3>
            <p className="text-xs sm:text-sm text-condo-dark mb-4">
              Ta kontakt i dag for et uforpliktet tilbud på hvordan Condo kan digitalisere ditt borettslag eller sameie.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Din e-postadresse"
                className="bg-base-light0 w-full px-3 py-2 text-sm rounded-lg text-condo-dark placeholder-condo-dark border border-condo-med p-2"
                required
              />
              <button
                type="submit"
                className="w-full px-3 py-2 text-sm text-base-light0 rounded-lg font-medium hover:bg-condo-med bg-condo-dark transition-colors "
              >
                Ta kontakt
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom links */}
      <div className="border-t border-primary-500 w-full">
        <div className="max-w-screen-sm mx-auto px-4 sm:max-w-7xl sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-primary-200">
            <div className="text-center sm:text-left">
              © 2025 Condo. Alle rettigheter forbeholdt.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <a href="/personvern" className="hover:text-white transition-colors">
                Personvern
              </a>
              <a href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </a>
              <a href="/vilkar" className="hover:text-white transition-colors">
                Vilkår
              </a>
              <button
                onClick={() => setShowAboutDialog(true)}
                className="hover:text-white transition-colors"
              >
                Om oss
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAboutDialog && (
        <AboutDialog onClose={() => setShowAboutDialog(false)} />
      )}
    </footer>
  );
}