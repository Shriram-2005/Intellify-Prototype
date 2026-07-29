import React from 'react';
import StaggeredMenu from './StaggeredMenu';
import './Navbar.css';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Pricing', ariaLabel: 'View pricing', link: '/pricing' },
  { label: 'Blog', ariaLabel: 'Read our blog', link: '/blog' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
  { label: 'Login', ariaLabel: 'Login to your account', link: '/auth/login' },
  { label: 'Get Started', ariaLabel: 'Sign up for free', link: '/auth/signup' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export const Navbar: React.FC = () => {
  return (
    <>
      <StaggeredMenu
        position="right"
        // @ts-expect-error - StaggeredMenu.jsx infers never[] from default empty array
        items={menuItems}
        // @ts-expect-error - StaggeredMenu.jsx infers never[] from default empty array
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        menuButtonColor="var(--pure-black)"
        openMenuButtonColor="var(--pure-white)"
        changeMenuColorOnOpen={true}
        colors={['#C0392B', '#96281B']}
        logoUrl="/logo.svg"
        accentColor="#C0392B"
        isFixed={true}
      />
    </>
  );
};
