import './DefImg.scss';

const DefImg = ({ result }) => {
  return(
    <img
      src={ result.src }
      alt={ result.alt }
      className="def-img"
    />
  )
}

export default DefImg;