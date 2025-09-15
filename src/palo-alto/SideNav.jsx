import { Link } from "react-router";

export function SideNav() {
  return (
    <div className=" border border-indigo-700 p-4 flex flex-col justify-center ">
      <Link to="/palo-alto/" className="text-2xl underline text-indigo-500">
        Home
      </Link>
      <Link
        to="/palo-alto/about"
        className="text-2xl underline  text-indigo-500 my-4"
      >
        About
      </Link>
      <Link
        to="/palo-alto/settings"
        className="text-2xl underline  text-indigo-500"
      >
        Settings
      </Link>
    </div>
  );
}
