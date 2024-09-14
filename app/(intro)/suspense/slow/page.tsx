import React, { Suspense } from 'react';
import { slow } from '@/utils/slow';

async function SlowComponent() {
  await slow();

  return <div>SlowComponent</div>;
}

export default async function SlowPage() {
  // Mens vi venter på denne, rendres loading.tsx som fallback
  await slow();

  return (
    <div>
      SlowPage
      <Suspense fallback={<div>Loading slow component...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
