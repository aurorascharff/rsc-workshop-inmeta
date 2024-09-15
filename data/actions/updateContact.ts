'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import type { ContactSchemaErrorType, ContactSchemaType } from '@/validations/contactSchema';
import { contactSchema } from '@/validations/contactSchema';

type State = {
  errors?: ContactSchemaErrorType;
  data: ContactSchemaType;
};

export async function updateContact(contactId: string, _prevState: State, formData: FormData) {
  await slow();

  const data = Object.fromEntries(formData);
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      data: data as ContactSchemaType,
      errors: result.error.formErrors,
    };
  }

  await prisma.contact.update({
    data: result.data,
    where: {
      id: contactId,
    },
  });

  revalidatePath('/');
  redirect(`/contacts/${contactId}`);
}
