import SingleMovie from "./SingleMovie";
import LoadingSpinner from "./LoadingSpinner";

export const Movies = ({ movies, totalResults, token, loading }) => {
  return (
    <>
      <header className="movies__header">
        {loading ? (
          <LoadingSpinner />
        ) : Number.isNaN(totalResults) ? null : totalResults > 0 ? (
          <h1>Total results: {totalResults}</h1>
        ) : (
          <h1>No matches found!</h1>
        )}
      </header>

      <section className="movies">
        <ul className="movies__grid">
          {movies.map((movie) => (
            <SingleMovie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              rating={movie.rating}
              token={token}
            />
          ))}
        </ul>
      </section>
    </>
  );
};
