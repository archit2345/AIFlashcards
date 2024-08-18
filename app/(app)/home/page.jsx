'use client';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { auth, firestore } from '@/utils/firebase'; // Adjusted import
import { doc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Dashboard() {
  const [plan, setPlan] = useState(null);
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handlePlanSelect = async (selectedPlan) => {
    if (user) {
      try {
        // Update user's plan in Firestore
        const userDocRef = doc(firestore, 'users', user.uid);
        await updateDoc(userDocRef, {
          plan: selectedPlan,
        });
        setPlan(selectedPlan);
      } catch (error) {
        console.error('Error updating plan:', error);
      }
    }
  };

  return (
    <div className="text-center my-16">
      <SignedIn>
        <h1 className="text-4xl font-bold">Welcome Back!</h1>
        <UserButton />

        <div className="mt-12">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mx-2" onClick={() => handlePlanSelect('basic')}>
            Select Basic Plan
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mx-2" onClick={() => handlePlanSelect('premium')}>
            Select Premium Plan
          </button>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold">Create Flashcards</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-6">
            Create Now
          </button>
        </div>
      </SignedIn>

      <SignedOut>
        <p className="mt-6">Please log in to access the dashboard.</p>
      </SignedOut>
    </div>
  );
}
