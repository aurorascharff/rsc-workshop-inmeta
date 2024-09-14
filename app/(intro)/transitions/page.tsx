'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

function SlowComponent() {
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms to emulate slow code
  }

  return <div>Slow component</div>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const items: any[] = [];
for (let i = 0; i < 500; i++) {
  items.push(<SlowComponent />);
}

export default function TransitionsPage() {
  const [tab, setTab] = useState(1);

  return (
    <>
      <h1>Transitions</h1>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            return setTab(1);
          }}
        >
          Tab 1 {tab === 1 && '👈'}
        </Button>
        <Button
          onClick={() => {
            return setTab(2);
          }}
        >
          Tab 2 {tab === 2 && '👈'}
        </Button>
        <Button
          onClick={() => {
            return setTab(3);
          }}
        >
          Tab 3 {tab === 3 && '👈'}
        </Button>
      </div>
      {tab === 1 && <div>Tab 1</div>}
      {tab === 2 && <div>Tab 2</div>}
      {tab === 3 && <div>Tab 3{items}</div>}
    </>
  );
}
