import React from 'react';
import { prisma } from '@/db';
import ClientComponent from './_components/ClientComponent';
import ServerComponent from './_components/ServerComponent';

export default function ClientServerPage() {
  // Denne funksjonen får et skjult API-endepunkt generert pga "use server"
  async function mutateData(): Promise<string> {
    'use server';

    const data = await prisma.contact.findMany();
    return data[0].first ?? '';
  }

  return (
    <div>
      <ClientComponent mutateData={mutateData} content={<ServerComponent />}>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
