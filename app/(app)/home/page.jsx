'use client';
import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { firestore, collection, doc, getDoc, updateDoc } from '@/utils/firebase';
import { Stack, Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { AuroraBackground } from '@/components/ui/aurora-background';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Dashboard() {
  const { user } = useUser();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
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

      if (selectedPlan === 'premium') {
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
          stripe.redirectToCheckout({ sessionId: session.id }).then((result) => {
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

  return (
    <AuroraBackground>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <SignedIn>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#000', fontWeight: 'bold' }}>
            Welcome Back!
          </Typography>
          <UserButton />

          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              color={plan === 'basic' ? 'success' : 'primary'}
              sx={{
                width: 220,
                marginRight: 3,
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#000', // Black text color for button
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
              }}
              onClick={() => handlePlanSelect('basic')}
            >
              SELECT BASIC PLAN
            </Button>
            <Button
              variant="contained"
              color={plan === 'premium' ? 'success' : 'primary'}
              sx={{
                width: 220,
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#000', // Black text color for button
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
              }}
              onClick={() => handlePlanSelect('premium')}
            >
              SELECT PREMIUM PLAN
            </Button>
          </Box>

          <Typography variant="h5" component="p" mt={4} sx={{ color: '#000' }}>
            Current plan: {plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : 'N/A'}
          </Typography>

          <Stack
            direction="row"
            spacing={4}
            justifyContent="center"
            alignItems="center" // Align items vertically in the center
            sx={{ mt: 4, width: '100%' }} // Set width to 100% for proper alignment
          >
            <Box textAlign="center"> {/* Center text within each box */}
              <Typography variant="h4" component="h2" sx={{ color: '#000' }}>
                My Flashcards
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#000',
                  mt: 2,
                  width: '220px', // Ensure consistent width with other buttons
                }}
              >
                <Link href="/home/flashcard">VIEW ALL</Link>
              </Button>
            </Box>

            <Box textAlign="center"> {/* Center text within each box */}
              <Typography variant="h4" component="h2" sx={{ color: '#000' }}>
                Create Flashcards
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#000',
                  mt: 2,
                  width: '220px', // Ensure consistent width with other buttons
                }}
              >
                <Link href="/home/flashcard">CREATE NOW</Link>
              </Button>
            </Box>
          </Stack>

        </SignedIn>

        <SignedOut>
          {/* ... signed out content ... */}
        </SignedOut>
      </Box>
      <style jsx>{`
        * {
          font-size: 20px; /* Increased font size */
          font-weight: bold;
          color: #000; /* Black color for all text */
        }
        h1, h2, h3, h4, h5, h6 {
          color: #000; /* Black color for headings */
        }
        p, span, button {
          color: #000; /* Black color for text and buttons */
        }
      `}</style>
    </AuroraBackground>
  );
}
