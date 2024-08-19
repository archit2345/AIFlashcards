'use client';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { firestore, collection, doc, getDoc, updateDoc } from '@/utils/firebase';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Dashboard() {
  const { user } = useUser();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(()=> {
    const fetchUserPlan = async () => {
      if (user) {
        try {
          const userRef = doc(collection(firestore, 'users'), user.id);
          const userDoc = await getDoc(userRef);
          setPlan(userDoc.data()?.plan || 'basic');
        } catch (error) {
          console.error("Error fetching user plan: ", error);
        }
      }
    };
    fetchUserPlan();
  }, [user]);

  const handlePlanSelect = async (selectedPlan) => {
    try {
      setLoading(true);

      if(selectedPlan === 'premium') {
        const stripe = await stripePromise;

        const response = await fetch('/api/checkout_sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: selectedPlan,
            userEmail: user.email,
          }),
        });

        const session = await response.json();
        if (session.id) {
          stripe.redirectToCheckout({sessionId: session.id}).then((result)=>{
            setLoading(false);
            if (result.error) {
              console.error(result.error.message);
            }
          });
        } else {
          console.error("Error creating Stripe session: ", session.error);
          setLoading(false);
        }

      } else {
        if (user) {
          const userRef = doc(collection(firestore, 'users'), user.id);
          await updateDoc(userRef, { plan: selectedPlan });
          setPlan(selectedPlan);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating plan:", error);
      setLoading(false);
    }
  };

  // function createNewFlashcard() {
  //   const navigate = useNavigate();

  const handleRedirect = () => {
    router.push('/home/flashcard');
  };


  return (
    <div className="text-center my-16">
      <SignedIn>
        <h1 className="text-4xl font-bold">Welcome Back!</h1>
        <UserButton />

        <div className="mt-12">
          <button 
            className={`px-4 py-2 rounded mx-2 ${plan === 'basic' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
            onClick={()=> handlePlanSelect('basic')}
          >
            Select Basic Plan
          </button>
          <button 
            className={`px-4 py-2 rounded mx-2 ${plan === 'premium' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
            onClick={()=> handlePlanSelect('premium')}
          >
            Select Premium Plan
          </button>
        </div>

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white">
            <div className="text-black">Loading...</div>
          </div>
        )}

        {/*display current plan*/}
        {plan && <p className="mt-4 text-xl text-black">Current plan: {plan.charAt(0).toUpperCase() + plan.slice(1)}</p>}

        <Stack direction="row" spacing={10} justifyContent="center" sx={{ mt: 10 }}>
          <div className="mt-12">
            <h2 className="text-2xl font-bold">My Flashcards</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-6">
              View All
            </button>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold">Create Flashcards</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-6" onClick={handleRedirect}>
              Create Now
            </button>
            {/* <createNewFlashcard></createNewFlashcard> */}
          </div>

        </Stack>
      </SignedIn>

      <SignedOut>
        <p className="mt-6">Please log in to access the dashboard.</p>
      </SignedOut>
    </div>
  );
}


