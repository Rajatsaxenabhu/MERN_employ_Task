

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <p className="text-xl text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
        <p className="text-md text-gray-500 mt-4">It might have been moved, or you might have mistyped the URL.</p>
        <div className="mt-6">
          <a
            href="/"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-all duration-200"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
