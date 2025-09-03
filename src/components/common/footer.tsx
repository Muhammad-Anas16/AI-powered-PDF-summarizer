import { FaFacebookF, FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
            <a href="https://www.facebook.com/MuhammadAnasDev" className="text-gray-500 hover:text-blue-600">
              <FaFacebookF size={18} />
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="https://wa.me/923182834203" target="_blank" className="text-gray-500 hover:text-green-500">
              <FaWhatsapp size={18} />
              <span className="sr-only">WhatsApp chat</span>
            </a>
            <a href="https://github.com/Muhammad-Anas16" className="text-gray-500 hover:text-gray-300 dark:hover:text-gray-300">
              <FaGithub size={18} />
              <span className="sr-only">GitHub account</span>
            </a>
            <a href="https://www.linkedin.com/in/muhammad-anas16/" className="text-gray-500 hover:text-blue-500">
              <FaLinkedinIn size={18} />
              <span className="sr-only">LinkedIn profile</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;