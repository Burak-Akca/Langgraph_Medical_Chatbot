// contexts/UserImageContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserImageContextType {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
}

const UserImageContext = createContext<UserImageContextType>({
  imageUrl: null,
  setImageUrl: () => {},
});

export const useUserImage = () => useContext(UserImageContext);

export const UserImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [imageUrl, setImageUrlState] = useState<string | null>(() => {
    // Initialize from sessionStorage on mount
    return sessionStorage.getItem('userImageUrl');
  });

  // Update sessionStorage when imageUrl changes
  useEffect(() => {
    if (imageUrl) {
      sessionStorage.setItem('userImageUrl', imageUrl);
    } else {
      sessionStorage.removeItem('userImageUrl');
    }
  }, [imageUrl]);

  const setImageUrl = (url: string | null) => {
    setImageUrlState(url);
  };

  return (
    <UserImageContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </UserImageContext.Provider>
  );
};
