"use client";

import Link from "next/link";
import { useState } from "react";
import { slide as Menu } from 'react-burger-menu';
import { scrollToContact } from "@/lib/scroll";

export default function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state: { isOpen: boolean }) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const menuStyles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '20px',
      top: '140px',
      zIndex: '50'
    },
    bmBurgerBars: {
      background: 'var(--dark-forest)'
    },
    bmBurgerBarsHover: {
      background: 'var(--burnt-orange)'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: 'var(--cream-white)'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      top: '0',
      left: '0'
    },
    bmMenu: {
      background: 'var(--dark-forest)',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmItemList: {
      color: 'var(--cream-white)',
      padding: '0.8em'
    },
    bmItem: {
      display: 'block',
      padding: '10px 0',
      textDecoration: 'none',
      color: 'var(--cream-white)'
    },
    bmOverlay: {
      background: 'rgba(40, 54, 24, 0.6)'
    }
  };

  return (
    <div className="xl:hidden">
      <Menu
        isOpen={menuOpen}
        onStateChange={handleStateChange}
        styles={menuStyles}
      >
        <Link href="/" className="menu-item" onClick={closeMenu}>
          HOME
        </Link>
        <Link href="/categories" className="menu-item" onClick={closeMenu}>
          CATEGORIES
        </Link>
        <Link href="/products" className="menu-item" onClick={closeMenu}>
          PRODUCTS
        </Link>
        <Link href="/blogs" className="menu-item" onClick={closeMenu}>
          BLOGS
        </Link>
        <Link href="/about" className="menu-item" onClick={closeMenu}>
          ABOUT US
        </Link>
        <Link href="/founders-story" className="menu-item" onClick={closeMenu}>
          FOUNDER&apos;S STORY
        </Link>
        <button 
          className="menu-item w-full text-left" 
          onClick={() => { closeMenu(); scrollToContact(); }}
        >
          CONTACT US
        </button>
        <hr style={{borderColor: 'var(--warm-tan)', margin: '20px 0'}} />
        <Link href="/account" className="menu-item" onClick={closeMenu}>
          Account
        </Link>
        <Link href="/track-order" className="menu-item" onClick={closeMenu}>
          Track Order
        </Link>
        <Link href="/cart" className="menu-item" onClick={closeMenu}>
          Cart (0)
        </Link>
      </Menu>
    </div>
  );
}