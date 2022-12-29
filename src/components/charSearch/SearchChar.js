import "./charSearch.scss";
import { Link } from "react-router-dom";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";
import useMarvelService from "../../services/MarvelService";
import { useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharSearch = () => {
  const [char, setChar] = useState(null);

  const { getCharacterByName, clearError, error, loading } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = (char) => {
    clearError();
    getCharacterByName(char).then(onCharLoaded);
  };

  const errorMessage = error ? (
    <div className="charSearch__critical-error">
      <ErrorMessage />
    </div>
  ) : null;

  const results = !char ? null : char.length > 0 ? (
    <div className="charSearch__box-bottom">
      <div className="charSearch__success">
        There is! Visit {char[0].name} page?
      </div>
      <Link
        to={`/characters/${char[0].id}`}
        className="button button__secondary"
      >
        <div className="inner">to page</div>
      </Link>
    </div>
  ) : (
    <div className="charSearch__error">
      The character was not found. Check the name and try again
    </div>
  );

  return (
    <div className="charSearch__basis">
      <Formik
        initialValues={{
          charName: "",
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required("This field is required"),
        })}
        onSubmit={({ charName }) => {
          updateChar(charName);
        }}
      >
        <Form>
          <div className="charSearch__title">Or find a character by name:</div>
          <div className="charSearch__box">
            <Field
              name="charName"
              id="charName"
              type="text"
              className="charSearch__input"
              placeholder="Enter name"
            />
            <button
              className="button button__main"
              type="submit"
              disabled={loading}
            >
              <div className="inner">find</div>
            </button>
          </div>
          <div className="charSearch__box-bottom">
            <FormikErrorMessage
              className="charSearch__error"
              name="charName"
              component="div"
            />
          </div>
        </Form>
      </Formik>
      {results}
      {errorMessage}
    </div>
  );
};

export default CharSearch;
