'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
};

export default function ClientComponent({ children, content }: Props) {
  // Uten "use client" kan vi ikke bruke browser-ting som state, effetcs, onclick, wind.location osv
  return (
    <div className="border-2 border-red-500 p-4">
      {children}
      {content}
      <button
        onClick={() => {
          return alert('Hello');
        }}
      >
        Click me
      </button>
    </div>
  );
}
