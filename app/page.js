'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('api/checkout_sessions', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!checkoutSession.ok) {
      console.error('Error fetching checkout session:', checkoutSession.statusText);
      // Handle the error gracefully (e.g., display an error message to the user)
      return;
    }

    try {
      const checkoutSessionJson = await checkoutSession.json();

      const stripe = await getStripe();
      const {error} = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      /*if(checkoutSession.statusCode === 500) {
        console.error(checkoutSession.message)
        return
      }*/

      if (error) {
        console.warn(error.message)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-screen">
    <Head>
      <title>AceCards</title>
      <meta
        name="description"
        content="Create relevant and comprehensive flashcards with one click."
      />
    </Head>

    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-semibold">AceCards</h1>
        <SignedOut>
          <Link href="/sign-in">
            <button className="text-white mx-2">Login</button>
          </Link>
          <Link href="/sign-up">
            <button className="text-white mx-2">Sign Up</button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>

    <div className="text-center my-16">
      <h2 className="text-4xl font-bold">Are you ready to ACE your grades?</h2>
      <p className="text-xl mt-4">Use AceCards to create flashcards from your notes in an instant!</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-6">
        Create Now
      </button>
    </div>

    <div className="my-12 text-center">
      <h2 className="text-2xl font-bold text-[rgb(var(--foreground-rgb))]">Pricing</h2>
      <div className="flex flex-wrap justify-center mt-6 -mx-4">
        <div className="w-full px-4 mb-8 md:w-1/3">
          <div className="p-6 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-[rgb(var(--foreground-rgb))]">Free Tier (0$)</h3>
            <p className="mb-4 text-[rgb(var(--foreground-rgb))]">
            - Limited uploads: 2 times a month
              <br />
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Choose Basic</button>
          </div>
        </div>
        <div className="w-full px-4 mb-8 md:w-1/3">
          <div className="p-6 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-[rgb(var(--foreground-rgb))]">Premium Tier (2$ / month)</h3>
            <p className="mb-4 text-[rgb(var(--foreground-rgb))]">
              - Unlimited flashcards and storage
              <br />
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Choose Premium</button>
          </div>
        </div>
      </div>
    </div>

  </div>

  );
}
