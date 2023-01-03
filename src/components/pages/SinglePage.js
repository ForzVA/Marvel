import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { process, setProcess, clearError, getComic, getCharacter } =
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
        getComic(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
        break;
      case "character":
        getCharacter(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
    }
  };

  return <>{setContent(process, Component, data)}</>;
};

export default SinglePage;
