'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Text } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NavBar = () => {
  return (
    <nav className=' border-b mb-5  py-5 '>
      <Container>
        <div className='flex items-center justify-between'>
          <div className='flex px-3 gap-x-5  items-center '>
            <Link href='/'>
              {' '}
              <AiFillBug />
            </Link>
            <NavLinks />
          </div>
          <AuthStatus />
        </div>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  type Link = {
    label: string;
    href: string;
  };

  const links: Link[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];
  return (
    <ul className='flex gap-x-5'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              'text-zinc-900': currentPath == link.href,
              'text-zinc-500': currentPath != link.href,
              'hover:text-zinc-800 transition-colors': true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === 'loading') return <Skeleton className='w-12 h-6' />;
  if (status === 'unauthenticated')
    return (
      <Link href='/api/auth/signin' className='text-zinc-500'>
        Login
      </Link>
    );
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user?.image!}
            fallback='?'
            size='2'
            radius='full'
            className='cursor-pointer'
            referrerPolicy='no-referrer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text className='text-gray-5 00' size='2'>
              {session!.user!.email!}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href='/api/auth/signout'>Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
