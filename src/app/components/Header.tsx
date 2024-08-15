'use client'
import { useRouter } from 'next/router';
import { SignOut } from "@/app/components/SignOut";

export default function Header() {
    const router = useRouter();
    return (
    <header className="border-b px-4 py-4 flex items-center justify-between">
        <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push('/collections/new')}
         >
          Create
        </button>
        <SignOut />
      </header>
    )
}