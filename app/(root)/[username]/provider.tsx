'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserData } from '@/types';
import { getUserDataByUsername } from '@/actions/user-data';
import { ThemeProvider } from './theme-provider';

type ProfileContextType = {
  userData: UserData | null;
  loading: boolean;
};

const ProfileContext = createContext<ProfileContextType>({
  userData: null,
  loading: true,
});

export const useProfile = () => useContext(ProfileContext);

export default function Provider({ 
  children,
  username 
}: { 
  children: React.ReactNode;
  username: string;
}) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (username) {
        const data = await getUserDataByUsername(username);
        setUserData(data[0] as UserData);
      }
      setLoading(false);
    }
    fetchData();
  }, [username]);

  return (
    <ProfileContext.Provider value={{ userData, loading }}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ProfileContext.Provider>
  );
}