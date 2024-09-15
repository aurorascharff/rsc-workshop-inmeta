'use client';

import React, { useTransition } from 'react';
import SubmitButton from '@/components/ui/SubmitButton';
import { deleteContact } from '@/data/actions/deleteContact';

export default function DeleteContactButton({ contactId }: { contactId: string }) {
  const [, startTransition] = useTransition();
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
      <SubmitButton theme="destroy">Delete</SubmitButton>
    </form>
  );
}
