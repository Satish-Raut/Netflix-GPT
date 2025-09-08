export const Home = () => {
  return (
      <main className="flex-grow flex items-center justify-center text-center text-white px-6 border-8 border-red-500">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unlimited movies, TV shows and more
          </h1>
          <p className="text-lg mb-2">Starts at ₹149. Cancel at any time.</p>
          <p className="mb-6">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          {/* Email input & button */}
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Email address"
              className="p-3 rounded-md text-black flex-grow sm:w-2/3"
              required
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md font-semibold text-white"
            >
              Get Started &gt;
            </button>
          </form>
        </div>
      </main> 
  );
};
