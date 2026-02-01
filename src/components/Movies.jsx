import SingleMovie from "./SingleMovie";
import LoadingSpinner from "./LoadingSpinner";

export const Movies = ({
  movies,
  totalResults,
  token,
  loading,
  count,
  totalPages,
}) => {
  return (
    <>
      <header className="movies__header">
        {loading ? (
          <LoadingSpinner />
        ) : Number.isNaN(totalResults) ? null : totalPages === 1 ? (
          <h1>Total results: {count}</h1>
        ) : (
          <h1>Total Results: {totalResults}</h1>
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
