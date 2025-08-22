"use client";

import Link from "next/link";
import { useState } from "react";
import { slide as Menu } from 'react-burger-menu';

export default function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state: any) => {
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
      top: '90px',
      zIndex: 50
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      top: 0,
      left: 0
    },
    bmMenu: {
      background: '#373a47',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'block',
      padding: '10px 0',
      textDecoration: 'none',
      color: '#b8b7ad'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
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
          FOUNDER'S STORY
        </Link>
        <Link href="/contact" className="menu-item" onClick={closeMenu}>
          CONTACT US
        </Link>
        <hr style={{borderColor: '#b8b7ad', margin: '20px 0'}} />
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