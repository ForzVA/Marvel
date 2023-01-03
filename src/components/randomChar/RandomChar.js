import { useEffect, useState } from "react";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import useMarvelService from "../../services/MarvelService";
import { Link } from "react-router-dom";
import setContent from "../../utils/setContent";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { process, setProcess, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    clearError();
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          className="button button__main"
          onClick={() => {
            updateChar();
          }}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, id } = data;
  const noPhotochar =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className={`randomchar__img  ${
          thumbnail === noPhotochar ? null : "randomchar__noImg"
        }`}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <Link to={`/characters/${id}`} className="button button__secondary">
            <div className="inner">Wiki</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
