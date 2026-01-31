import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Movies } from "./components/Movies";

function App() {
  const [token, setToken] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isSearchComplete, setIsSearchComplete] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(NaN);

  const genreList = [
    { value: "Select Genre", label: "Select Genre" },
    { value: "Action", label: "Action" },
    { value: "Adventure", label: "Adventure" },
    { value: "Animation", label: "Animation" },
    { value: "Biography", label: "Biography" },
    { value: "Comedy", label: "Comedy" },
    { value: "Crime", label: "Crime" },
    { value: "Documentary", label: "Documentary" },
    { value: "Drama", label: "Drama" },
    { value: "Family", label: "Family" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Film-Noir", label: "Film-Noir" },
    { value: "History", label: "History" },
    { value: "Horror", label: "Horror" },
    { value: "Music", label: "Music" },
    { value: "Musical", label: "Musical" },
    { value: "Mystery", label: "Mystery" },
    { value: "Romance", label: "Romance" },
    { value: "Sci-Fi", label: "Sci-Fi" },
    { value: "Short", label: "Short" },
    { value: "Sport", label: "Sport" },
    { value: "Thriller", label: "Thriller" },
    { value: "War", label: "War" },
    { value: "Western", label: "Western" },
  ];

  useEffect(() => {
    async function fetchAuthToken() {
      let response = await axios.get(
        "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/auth/token",
      );
      setToken(response.data.token);
    }
    fetchAuthToken();
  }, []);

  useEffect(() => {
    if (token) {
      async function fetchAllMovies() {
        setLoading(true);
        try {
          let response = await axios.get(
            `https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/movies?page=${currentPage}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setMovies(response.data.data);
          setTotalPages(response.data.totalPages);
          setCount(response.data.data.length);
          setLoading(false);
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
        }
      }
      fetchAllMovies();
    }
  }, [token, currentPage]);

  useEffect(() => {
    if (token) {
      const totalResults = async () => {
        try {
          let itemsOnLastPage = 0;

          if (totalPages > 0) {
            const response = await axios.get(
              `https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/movies?page=${totalPages}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            itemsOnLastPage = response.data.data.length;

            setTotalResults((totalPages - 1) * 25 + itemsOnLastPage);
          } else {
            setTotalResults(0);
          }
        } catch (error) {
          console.error(error);
        }
      };
      totalResults();
    }
  }, [token, totalPages]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (token) {
      const fetchSearchedMovies = async () => {
        setLoading(true);
        try {
          let response = await axios.get(
            `https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/movies?search=${query}&page=${currentPage}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setTotalPages(response.data.totalPages);
          setCount(response.data.data.length);
          setMovies(response.data.data);
          setIsSearchComplete(query === "");
          setLoading(false);
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
        }
      };
      fetchSearchedMovies();
    }
  }, [currentPage, query, token]);

  const handleChange = async (e) => {
    setSelectedGenre(e.target.value);
  };

  useEffect(() => {
    if (token) {
      const getGenre = async () => {
        setLoading(true);
        try {
          let response = await axios.get(
            `https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/movies?&search=${query}&genre=${selectedGenre}&page=${currentPage}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setMovies(response.data.data);
          setCount(response.data.data.length);
          setLoading(false);
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
        }
      };
      getGenre();
    }
  }, [selectedGenre, currentPage, query, token]);

  return (
    <div>
      <div className="input-container">
        <input
          name="search movies"
          type="text"
          placeholder="Search for movies"
          className="search-input"
          onChange={handleSearchChange}
          value={query}
          aria-label="search movies"
        />
      </div>
      <select
        disabled={isSearchComplete}
        value={selectedGenre}
        onChange={handleChange}
      >
        {genreList.map((option) => (
          <option key={option.label} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <div>
        <Movies
          movies={movies}
          totalPages={totalPages}
          count={count}
          loading={loading}
          token={token}
          totalResults={totalResults}
        />
      </div>
      {totalPages === 0 ? (
        <div></div>
      ) : (
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>
            {" "}
            Page {currentPage} of {totalPages}{" "}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
