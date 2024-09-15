import 'server-only';

import { notFound } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

// without cache, this function would be called twice for [contactId]/page.tsx render
export const getContact = cache(async (contactId: string) => {
  console.log('getContact', contactId);
  await slow();

  const contact = await prisma.contact.findUnique({
    where: {
      id: contactId,
    },
  });
  if (!contact) {
    notFound();
  }

  return contact;
});
