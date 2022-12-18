import "./charList.scss";
import { Component } from "react/cjs/react.production.min";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
  };

  marverlService = new MarvelService();

  componentDidMount() {
    this.updateAllChars();
  }

  onCharsLoaded = (chars) => {
    this.setState({ loading: false, chars });
  };

  onCharsLoading = () => {
    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  updateAllChars = () => {
    this.onCharsLoading();
    this.marverlService
      .getAllCharacters()
      .then(this.onCharsLoaded)
      .catch(this.onError);
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
    const { loading, error, chars } = this.state;

    const items = this.renderItems(chars);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;
    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}
export default CharList;
