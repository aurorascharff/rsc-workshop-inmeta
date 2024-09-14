import { prisma } from '@/db';

export default async function ServerComponent() {
  console.log('ServerComponent');

  // Siden vi er på server, kan vi gjøre server ting som db kall
  const data = await prisma.contact.findMany();

  return (
    <div className="rounded border-2 border-blue-500 p-4">
      ServerComponent
      {data[0].first}
    </div>
  );
}
