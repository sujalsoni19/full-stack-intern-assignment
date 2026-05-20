import React from "react";
import fundScoutLogo from "../assets/fundscout-logo.svg";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";

function Header() {
  return (
    <header className="border-b py-2 border-slate-200 shadow-sm">
      <div className="sm:mx-35 flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img className="h-9 sm:h-12 w-auto" src={fundScoutLogo} alt="FundScout" />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/watchlist"
            className="sm:text-xl flex gap-2 items-center font-medium text-slate-700 transition hover:text-blue-600"
          >
            <Bookmark color="blue" />
            Watchlist
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
