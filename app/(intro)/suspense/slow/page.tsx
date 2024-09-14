import React from 'react';
import { slow } from '@/utils/slow';

export default async function SlowPage() {
  await slow();

  return <div>SlowPage</div>;
}
