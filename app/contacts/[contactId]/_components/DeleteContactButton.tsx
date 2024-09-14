'use client';

import React, { useTransition } from 'react';
import Button from '@/components/ui/Button';
import { deleteContact } from '@/data/actions/deleteContact';

export default function DeleteContactButton({ contactId }: { contactId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      type="submit"
      onClick={() => {
        const response = confirm('Please confirm you want to delete this record.');
        if (!response) {
          return;
        }
        startTransition(async () => {
          await deleteContact(contactId);
        });
      }}
      theme="destroy"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
