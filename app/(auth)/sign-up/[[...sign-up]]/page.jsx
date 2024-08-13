import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-base-100"
      data-theme="dark"
      style={{
        backgroundImage: `url('/bgmain
        .jpg')`, // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex w-full max-w-4xl mx-auto p-8">
        {/* Left Content Area */}
        <div className="flex-1 flex items-center justify-center">
          
        </div>

        {/* Sign-Up Form */}
        <div className="flex-1 max-w-md bg-base-200 bg-opacity-80 rounded-lg shadow-lg">
          <SignUp
            appearance={{
              elements: {
                card: "shadow-none",
                title: "text-2xl font-bold text-base-content",
                button: "bg-primary text-primary-content font-semibold rounded-md px-4 py-2 mt-4",
                input: "border-base-300 rounded-md focus:border-primary focus:ring focus:ring-primary-focus",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
