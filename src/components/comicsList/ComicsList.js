import "./comicsList.scss";
import useMarvelService from "../../services/MarvelService";
import { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);

  const { getAllComics, error, loading } = useMarvelService();

  useEffect(() => {
    onRequest(offset);
  }, []);

  const onRequest = (offset) => {
    setNewItemLoading(true);
    return getAllComics(offset).then(onCharsLoaded);
  };

  const onCharsLoaded = (newComics) => {
    let ended = false;
    if (newComics.length < 8) {
      ended = true;
    }
    setComicsList((comics) => [...comics, ...newComics]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 8);
    setCharEnded((charEnded) => ended);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li key={i} className="comics__item">
          <a href="#">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </a>
        </li>
      );
    });
    return <ul className="comics__grid"> {items} </ul>;
  }

  const items = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => {
          onRequest(offset);
        }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
