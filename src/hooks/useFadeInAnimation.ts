
import { useState, useEffect } from "react";

export const useFadeInAnimation = (delay: number = 100) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Small delay for animation to trigger properly
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return isLoaded;
};
