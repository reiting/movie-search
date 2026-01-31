 import './SingleMovie.css';
 
 const SingleMovie = ({title, rating, posterUrl, id,}) => {
  return (
    <li key={id}>
      <h4>{title}</h4>
      <p>{rating}</p>
      <img className='movie-image' src={posterUrl} />
    </li>
  )
}

export default SingleMovie;

