'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useFacilityType() {
  const searchParams = useSearchParams();
  const [isPublic, setIsPublic] = useState<boolean>(false);

  useEffect(() => {
    const queryParam = searchParams.get('isPublic');
    setIsPublic(queryParam === 'true');
  }, [searchParams]);

  return { isPublic };
}