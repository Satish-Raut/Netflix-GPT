export const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-70 text-gray-300 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Netflix Clone. All rights reserved.
        </p>
        <div className="mt-2 flex justify-center space-x-6 text-sm">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Help Center
          </a>
        </div>
      </div>
    </footer>
  );
};
