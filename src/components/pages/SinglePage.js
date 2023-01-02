import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { loading, error, clearError, getComic, getCharacter } =
    useMarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  const onDataLoaded = (data) => {
    setData(data);
  };

  const updateData = () => {
    clearError();

    switch (dataType) {
      case "comic":
        getComic(id).then(onDataLoaded);
        break;
      case "character":
        getCharacter(id).then(onDataLoaded);
    }
  };

  const errorMessage = error ? (
    <div className="randomchar__error">
      <ErrorMessage />
    </div>
  ) : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !data) ? (
    <Component data={data} />
  ) : null;

  return (
    <>
      {errorMessage} {spinner} {content}
    </>
  );
};

export default SinglePage;
