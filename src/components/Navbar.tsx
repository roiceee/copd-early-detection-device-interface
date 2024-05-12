import { HistoryIcon, HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 border-b  ">
      <div className="flex-1 md:max-w-[700px] mx-auto">
        <div className="flex-1 justify-between">
          <a className="sm:none btn btn-ghost text-sm md:text-xl">
            COPD Early Detection
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/"}>
                <HomeIcon />
              </Link>
            </li>
            <li>
              <Link to={"/records"}>
                <HistoryIcon />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
