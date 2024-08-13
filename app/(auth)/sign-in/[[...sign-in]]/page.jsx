import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" data-theme="dark">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <SignIn
          appearance={{
            elements: {
              card: "shadow-none", // Remove extra shadow if needed
              title: "text-2xl font-bold text-gray-800",
              button: "bg-blue-500 text-white font-semibold rounded-md px-4 py-2 mt-4",
              input: "border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200",
            },
          }}
        />
      </div>
    </div>
  );
}
