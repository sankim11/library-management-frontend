export const getStoredUser = (): any => {
    const stored = localStorage.getItem('auth-storage');
    return stored ? JSON.parse(stored).state?.user : null;
  };
  
  export const clearStoredUser = (): void => {
    localStorage.removeItem('auth-storage');
  };
  