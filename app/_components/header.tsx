import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./ThemeToggler";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center p-4">
        <h1>LOGO</h1>
      </Link>
      <div className="flex items-center px-4 gap-4">
        {/* Theme toggler */}
        <ModeToggle />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
