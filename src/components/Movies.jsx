import SingleMovie from "./SingleMovie";
import LoadingSpinner from "./LoadingSpinner";

export const Movies = ({ movies, totalResults, token, loading }) => {
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : Number.isNaN(totalResults) ? null : totalResults > 0 ? (
        <h1>Total results: {totalResults}</h1>
      ) : (
        <h1>No matches found!</h1>
      )}

      <div>
        <ul>
          {movies.map((movie) => {
            return (
              <SingleMovie
                title={movie.title}
                posterUrl={movie.posterUrl}
                rating={movie.rating}
                id={movie.id}
                key={movie.id}
                token={token}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};
