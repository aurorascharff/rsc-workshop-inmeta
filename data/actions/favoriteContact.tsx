'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function favoriteContact(contactId: string, isFavorite: boolean) {
  await slow();

  await prisma.contact.update({
    data: {
      favorite: !isFavorite,
    },
    where: {
      id: contactId,
    },
  });

  revalidatePath('/');
}
