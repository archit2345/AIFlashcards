import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center p-8">
      <h1 className="text-5xl font-extrabold mb-4">Welcome to AceCards</h1>
      <p className="text-2xl mb-8">Create and manage your flashcards with ease!</p>
      
      <SignedOut>
        <div className="flex space-x-4 mb-8">
          <Link href="/sign-in">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
              Login
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </SignedOut>
      
      <SignedIn>
        <p className="text-lg">You are already logged in.</p>
      </SignedIn>
      
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-4">Features</h2>
        <ul className="text-left space-y-2 text-xl">
          <li>✅ Easy creation of flashcards</li>
          <li>✅ Organize your notes efficiently</li>
          <li>✅ Track your progress</li>
        </ul>
      </div>
    </div>
  );
}
