import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useState } from "react";
import { Forecast } from "./types/forecast";
import useFetch from "./hooks/useFetch";

function App() {
  const [location, setLocation] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const isValidLocation = (location: string): boolean => {
    return /^[a-zA-Z\s]*$/.test(location);
  };
  const url =
    location && isValidLocation(location)
      ? `${apiUrl}forecast.json?key=${apiKey}&q=${location}`
      : "";

  const { data, loading, error } = useFetch<Forecast>(url);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              location={location}
              setLocation={setLocation}
              loading={loading}
              error={error}
              data={data}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
