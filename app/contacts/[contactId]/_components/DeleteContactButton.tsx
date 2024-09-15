'use client';

import React, { useTransition } from 'react';
import Button from '@/components/ui/Button';
import { deleteContact } from '@/data/actions/deleteContact';

export default function DeleteContactButton({ contactId }: { contactId: string }) {
  const [isPending, startTransition] = useTransition();
  const deleteContactById = deleteContact.bind(null, contactId);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const response = confirm('Please confirm you want to delete this record.');
        if (!response) {
          return;
        }
        startTransition(async () => {
          await deleteContact(contactId);
        });
      }}
      action={deleteContactById}
    >
      <Button disabled={isPending} type="submit" theme="destroy">
        {isPending ? 'Deleting...' : 'Delete'}
      </Button>
    </form>
  );
}
