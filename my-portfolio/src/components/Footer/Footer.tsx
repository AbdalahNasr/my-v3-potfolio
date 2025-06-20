import './Footer.module.scss';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="logo text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-600 dark:from-primary-dark dark:to-purple-400 mb-4 md:mb-0">
            Dev.Portfolio
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://example.com/cv" target="_blank" rel="noopener noreferrer"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition duration-300">
              <span className="mr-2">My CV</span>
              <i className="fas fa-file-alt"></i>
            </a>
            <div className="relative w-16 h-16 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md">
              <img src="/QR_Code.png" alt="CV QR Code" className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
          © 2025 All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
