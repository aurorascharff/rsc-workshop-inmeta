import { ErrorBoundary } from 'react-error-boundary';
import { getContact } from '@/data/services/getContact';
import ContactForm from './_components/ContactForm';

type PageProps = {
  params: {
    contactId: string;
  };
};

export default async function EditContactPage({ params }: PageProps) {
  const contact = await getContact(params.contactId);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ContactForm contact={contact} />;
    </ErrorBoundary>
  );
}
