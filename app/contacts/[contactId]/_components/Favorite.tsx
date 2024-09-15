'use client';

import React, { useOptimistic, useTransition } from 'react';
import { favoriteContact } from '@/data/actions/favoriteContact';
import { cn } from '@/utils/cn';
import type { Contact } from '@prisma/client';

export default function FavoritePessimistic({ contact }: { contact: Contact }) {
  const favorite = contact.favorite;
  const favoriteContactById = favoriteContact.bind(null, contact.id, favorite);
  const [optimisticFavorite, addOptimisticFavorite] = useOptimistic(favorite);
  const [, startTransition] = useTransition();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        startTransition(async () => {
          addOptimisticFavorite(!optimisticFavorite);
          await favoriteContactById();
        });
      }}
      action={favoriteContactById}
    >
      <button
        type="submit"
        className={cn(
          optimisticFavorite ? 'text-yellow-500' : 'text-gray-dark',
          'flex text-2xl font-normal shadow-none hover:text-yellow-400 hover:shadow-none',
        )}
        aria-label={optimisticFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {optimisticFavorite ? '★' : '☆'}
      </button>
    </form>
  );
}
