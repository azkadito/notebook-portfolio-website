import { useEffect } from 'react';
import { useRouter } from 'next/router';

// This page is now redirected to the main page with the new layout
export default function ExplorationPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  return null;
}
