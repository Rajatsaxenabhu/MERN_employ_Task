const Header = () => {
  return (
    <header className="bg-fuchsia-600 text-white shadow-md py-4 w-full min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-12">
        <div className="text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-bold">Demo Project</h1>
          <p className="mt-4 text-2xl md:text-3xl">Built by <span className="font-bold">Rajat Saxena</span></p>
        </div>
        <nav className="mt-6 md:mt-0">
          <a
            href="https://www.linkedin.com/in/rajat-saxena/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-800 text-white rounded-full hover:bg-blue-700 transition"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/rajatsaxena"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block ml-6 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
