'use client';

import React from 'react';
import { favoriteContact } from '@/data/actions/favoriteContact';
import { cn } from '@/utils/cn';
import type { Contact } from '@prisma/client';

export default function FavoritePessimistic({ contact }: { contact: Contact }) {
  const favorite = contact.favorite;
  const favoriteContactById = favoriteContact.bind(null, contact.id, favorite);

  return (
    <form action={favoriteContactById}>
      <button
        type="submit"
        className={cn(
          favorite ? 'text-yellow-500' : 'text-gray-dark',
          'flex text-2xl font-normal shadow-none hover:text-yellow-400 hover:shadow-none',
        )}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </form>
  );
}
