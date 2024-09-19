'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
  const currentPath = usePathname();
  type Link = {
    label: string;
    href: string;
  };

  const links: Link[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];
  return (
    <div className='flex gap-x-5 border-b mb-5 px-5 h-14 items-center'>
      <AiFillBug />
      <ul className='flex gap-x-5'>
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames({
              'text-zinc-900': currentPath == link.href,
              'text-zinc-500': currentPath != link.href,
              'hover:text-zinc-800 transition-colors': true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
  (' hover:text-zinc-800 transition-colors');
};

export default NavBar;
