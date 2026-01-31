import "./SingleMovie.css";

const SingleMovie = ({ title, rating, posterUrl }) => {
  return (
    <li className="movie-card">
      <div className="movie-card__image-wrapper">
        <img
          src={posterUrl}
          alt={`${title} poster`}
          className="movie-card__image"
          loading="lazy"
        />
      </div>

      <div className="movie-card__content">
        <h3 className="movie-card__title">{title}</h3>
        <p className="movie-card__rating">Rated: {rating}</p>
      </div>
    </li>
  );
};

export default SingleMovie;
