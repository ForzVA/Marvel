import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./charInfo.scss";
import useMarvelService from "../../services/MarvelService";
import { Link } from "react-router-dom";
import setContent from "../../utils/setContent";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { process, setProcess, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
    // Специальная ошибка для ErrorBoundary
    // this.foo.bar = 0;
  };

  return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics, id } = data;
  const noPhotochar =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  let imgStyle = { objectFit: "cover" };
  if (thumbnail === noPhotochar) {
    imgStyle = { objectFit: "unset" };
  }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <Link to={`/characters/${id}`} className="button button__secondary">
              <div className="inner">wiki</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? (
          comics.slice(0, 10).map((item, i) => {
            const comicId = item.resourceURI.split("/")[6];
            return (
              <li key={i} className="char__comics-item">
                <Link to={`/comics/${comicId}`}>{item.name}</Link>
              </li>
            );
          })
        ) : (
          <li className="char__comics-item">No comics</li>
        )}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
