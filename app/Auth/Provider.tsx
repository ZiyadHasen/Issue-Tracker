'use client';
import React, { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
//! this is the purpose of this component
// *Session Management: By wrapping your application with the SessionProvider from next-auth/react,
//*it ensures that user session data is available throughout your app. This is crucial for maintaining user authentication
// *state across different pages and components.
