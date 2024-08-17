import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <div className="text-center my-16">
      <h1 className="text-4xl font-bold">Welcome to AceCards</h1>
      <p className="text-xl mt-4">Create and manage your flashcards with ease!</p>
      
      <SignedOut>
        <div className="mt-6">
          <Link href="/sign-in">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mx-2">Login</button>
          </Link>
          <Link href="/sign-up">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mx-2">Sign Up</button>
          </Link>
        </div>
      </SignedOut>
      
      <SignedIn>
        <p className="mt-6">You are already logged in.</p>
      </SignedIn>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold">Features</h2>
        <ul className="list-disc list-inside mt-4">
          <li>Easy creation of flashcards</li>
          <li>Organize your notes efficiently</li>
          <li>Track your progress</li>
        </ul>
      </div>
    </div>
  );
}