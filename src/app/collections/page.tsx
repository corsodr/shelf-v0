import { redirect } from 'next/navigation';
import { getCollections } from '@/app/lib/collections';
import { auth } from "@/auth";

export default async function CollectionsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  const collections = await getCollections();

  if (collections.length === 0) {
    redirect('/collections/new');
  } else {
    redirect(`/collections/${collections[0].id}`);
  }
}