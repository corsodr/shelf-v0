'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { SignOut } from './SignOut';

export default function UserAvatar() {
  // is this destructuring or typescript? 
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const userInitial = session?.user?.name?.[0] || '';

  // review this 
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsModalOpen(!isModalOpen)}
        className={`w-10 h-10 rounded-full ${
          isModalOpen ? 'bg-slate-700' : 'bg-slate-500 hover:bg-slate-700'
        } text-white flex items-center justify-center font-semibold text-lg transition-colors duration-200`}
      >
        {userInitial}
      </button>
      {isModalOpen && (
        <div ref={modalRef} className="absolute right-0 mt-2 w-48 bg-white border border-slate-300 rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-2 border-b border-slate-200">
            <p className="font-semibold text-slate-800">{session?.user?.name}</p>
          </div>
          <SignOut />
        </div>
      )}
    </div>
  );
}