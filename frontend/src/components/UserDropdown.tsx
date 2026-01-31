import { useState, useRef, useEffect } from "react";
import {LogOut} from 'lucide-react';
import Avatar from "./Avatar";
import { useUser } from "../contexts/UserContext";
import s from '../styles/UserDropdown.module.css';

type UserMenuProps = {
  onLogout: () => void;
}

export default function UserMenu({onLogout}: UserMenuProps){
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {user, logout} = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
        setIsOpen(false);
      }
    };

    if(isOpen){
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    onLogout();
  }

  return(
    <div ref={dropdownRef}>
      <button 
      onClick={() => {setIsOpen(prev => !prev)}}
      className={s.dropdownBtn}
      aria-haspopup= 'true'
      aria-expanded='true'>
        <Avatar/>
      </button>

      {isOpen && (
        <div className={s.dropdownMenu}>
          {user?.username}
          <button className={s.dropdownSection} onClick={handleLogout}>
            <LogOut /> Logout
          </button>
        </div>
      )}
    </div>
  )
}