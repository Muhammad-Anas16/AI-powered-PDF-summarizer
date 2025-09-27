"use client";

import { FaFacebookF, FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white shadow dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 cursor-pointer">
                        © created by {" "}
                        <a href="https://github.com/muhammad-anas16">
                            Muhammad Anas.
                        </a>
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
                        <a href="https://www.facebook.com/MuhammadAnasDev" className="text-gray-500">
                            <FaFacebookF size={18} />
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="https://wa.me/923182834203" target="_blank" className="text-gray-500">
                            <FaWhatsapp size={18} />
                            <span className="sr-only">WhatsApp chat</span>
                        </a>
                        <a href="https://github.com/Muhammad-Anas16" className="text-gray-500">
                            <FaGithub size={18} />
                            <span className="sr-only">GitHub account</span>
                        </a>
                        <a href="https://www.linkedin.com/in/muhammad-anas16/" className="text-gray-500">
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