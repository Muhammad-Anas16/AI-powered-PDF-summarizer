import { FileText } from "lucide-react";
import NavLink from "./navLink";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <nav className="flex justify-between items-center py-4 lg:px-8 px-4 ">
      <div>
        <NavLink
          href={"/"}
          className="flex items-center gap-1 lg:gap-2 shrink-0"
        >
          <FileText className="w-5 h-5 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-semibold lg:text-xl text-gray-900">Lubb</span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <NavLink href="/dashboard" className="capitalize">
          your summaries
        </NavLink>
      </div>
      <div className="flex lg:justify-end">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div className="capitalize">pro</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>

        <SignedOut>
          <NavLink href="/sign-in">Sign In</NavLink>
        </SignedOut>

      </div>
    </nav>
  );
};

export default Header;
