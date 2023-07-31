import React from "react";
import { Link } from "react-router-dom";
type Props = {};
import { FcPaid } from "react-icons/fc";
const Header = (props: Props) => {
  return (
    <header className="header_container bg-slate-400">
      <nav className="p-4  flex justify-between">
        <ul className="flex justify-center space-x-4">
          <li className="bg-slate-500 p-2 rounded-lg text-2xl">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="bg-slate-500 p-2 rounded-lg text-2xl">
            <Link to={"products"}>Product</Link>
          </li>
        </ul>
        <div className="text-4xl">
          <Link to={"cart"}>
            <FcPaid />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
