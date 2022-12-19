import "./charList.scss";
import PropTypes from "prop-types";
import { Component } from "react/cjs/react.production.min";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };

  marverlService = new MarvelService();

  componentDidMount() {
    this.onRequest();
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll = () => {
    if (this.state.newItemLoading) {
      return;
    }
    if (this.state.charEnded) {
      window.removeEventListener("scroll", this.onScroll);
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.onCharListLoading();
      this.onRequest(this.state.offset);
    }
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marverlService
      .getAllCharacters(offset)
      .then(this.onCharsLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharsLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    this.setState(({ offset, chars }) => ({
      loading: false,
      chars: [...chars, ...newChars],
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  renderItems(arr) {
    const items = arr.map((item) => {
      const noPhotochar =
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

      let imgStyle = { objectFit: "cover" };
      if (item.thumbnail === noPhotochar) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }
  render() {
    const { loading, error, chars, newItemLoading, offset, charEnded } =
      this.state;

    const items = this.renderItems(chars);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        {/* <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button> */}
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
