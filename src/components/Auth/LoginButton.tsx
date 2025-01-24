import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { LoginDialog } from './LoginDialog';
import { useUserRole } from '../../hooks/useUserRole';

export function LoginButton() {
  const [showDialog, setShowDialog] = useState(false);
  const { role } = useUserRole();

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="p-1.5 sm:p-2 rounded-full transition-all bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm hover:bg-white"
      >
        <UserCircle className="h-5 w-5 sm:h-6 sm:w-6 text-condo-dark" />
      </button>

      {showDialog && <LoginDialog onClose={() => setShowDialog(false)} />}
    </>
  );
}