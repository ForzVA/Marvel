import "./charList.scss";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { useState, useEffect, useRef } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = (props) => {
  const [chars, setChars] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { error, loading, getAllCharacters } = useMarvelService();

  useEffect(() => {
    setNewItemLoading(true);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (newItemLoading) {
      onRequest(offset, false);
    }
  }, [newItemLoading]);

  const onRequest = (offset) => {
    return getAllCharacters(offset).then(onCharsLoaded);
  };

  const onScroll = () => {
    if (newItemLoading) {
      return;
    }
    if (charEnded) {
      window.removeEventListener("scroll", onScroll);
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setNewItemLoading(true);
    }
  };

  const itemRefs = useRef([]);

  const onSelectChar = (indx) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[indx].classList.add("char__item_selected");
    itemRefs.current[indx].focus();
  };

  const onSelectedCharByKeyPress = (e, id) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onSelectChar(id);
    }
  };

  const onCharsLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }
    setChars((chars) => [...chars, ...newChars]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      const noPhotochar =
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

      let imgStyle = { objectFit: "cover" };
      if (item.thumbnail === noPhotochar) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <CSSTransition key={item.id} timeout={500} classNames="char__item">
          <li
            ref={(el) => (itemRefs.current[i] = el)}
            tabIndex={0}
            className="char__item"
            key={item.id}
            onClick={() => {
              props.onCharSelected(item.id);
              onSelectChar(i);
            }}
            onKeyPress={(e) => {
              onSelectedCharByKeyPress(e, i);
              onSelectChar(i);
            }}
          >
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </li>
        </CSSTransition>
      );
    });

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  }

  const items = renderItems(chars);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      {/* <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button> */}
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
