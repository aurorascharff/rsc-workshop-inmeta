'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
  content: React.ReactNode;
  mutateData: () => Promise<string>;
};

export default function ClientComponent({ children, content, mutateData }: Props) {
  // Uten "use client" kan vi ikke bruke browser-ting som state, effetcs, onclick, wind.location osv
  return (
    <div className="border-2 border-red-500 p-4">
      {children}
      {content}
      <button
        onClick={async () => {
          // Uten "use server" i mutateData kan vi ikke bruke denne
          const data = await mutateData();
          return alert(data);
        }}
      >
        Click me
      </button>
    </div>
  );
}
