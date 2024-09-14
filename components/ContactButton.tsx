'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { cn } from '@/utils/cn';
import type { Contact } from '@prisma/client';

export default function ContactButton({ contact }: { contact: Contact }) {
  const pathname = usePathname();
  const isActive = pathname.includes(`/contacts/${contact.id}`);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Link
      className={cn(
        isPending ? 'pending' : '',
        isActive ? 'bg-primary text-white' : 'hover:bg-gray',
        'flex w-full items-center justify-between gap-4 overflow-hidden whitespace-pre rounded-lg p-2 hover:no-underline',
      )}
      onClick={e => {
        e.preventDefault();
        startTransition(() => {
          router.push(`/contacts/${contact.id}`);
        });
      }}
      href={`/contacts/${contact.id}`}
    >
      {contact.first || contact.last ? (
        <>
          {contact.first} {contact.last}
        </>
      ) : (
        <i className={cn(isActive ? 'text-white' : 'text-gray-500')}>No Name</i>
      )}
      {contact.favorite ? (
        <span className={cn('float-right', isActive ? 'text-white' : 'text-yellow-500')}>★</span>
      ) : null}
    </Link>
  );
}
