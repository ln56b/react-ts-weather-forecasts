import { Link } from "react-router";

export default function Header() {
  return (
    <div className="my-4 text-center animate-slideI">
      <h1 className="italic text-md">
        Weather App - Find the weather for your city or travel to any other city
        to see the weather forecast...
      </h1>
      <nav className="px-4 py-2 mt-2 shadow-2xl">
        <ul className="flex justify-start gap-5 text-xl">
          <li className="hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:underline">
            <Link to="/history">History</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
