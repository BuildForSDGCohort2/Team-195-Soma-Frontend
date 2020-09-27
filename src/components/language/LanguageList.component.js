import React, { useState, useEffect } from "react";
import LanguageDataService from "../../services/LanguageService";
import { Link } from "react-router-dom";

const LanguageList = () => {
  const [languages, setLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveLanguages();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveLanguages = () => {
    LanguageDataService.getAll()
      .then(response => {
        setLanguages(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveLanguages();
    setCurrentLanguage(null);
    setCurrentIndex(-1);
  };

  const setActiveLanguage = (language, index) => {
    setCurrentLanguage(language);
    setCurrentIndex(index);
  };

//   const removeAllTutorials = () => {
//     TutorialDataService.removeAll()
//       .then(response => {
//         console.log(response.data);
//         refreshList();
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };

  const findByTitle = () => {
   LanguageDataService.findByTitle(searchTitle)
      .then(response => {
        setLanguages(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">Dashboard v3</h1>
          </div>{/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Dashboard v3</li>
            </ol>
          </div>{/* /.col */}
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    {/* /.content-header */}
    {/* Main content */}
    <div className="content">
    <div className="container-fluid">
      
    <div className="list row">
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByTitle}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <h4>Language setup</h4>

      <ul className="list-group">
        {[languages] &&
          [languages].map((language, index) => (
            <li
              className={
                "list-group-item " + (index === currentIndex ? "active" : "")
              }
              onClick={() => setActiveLanguage(language, index)}
              key={index}
            >
              {language.name}
            </li>
          ))}
      </ul>

      {/* <button
        className="m-3 btn btn-sm btn-danger"
        onClick={removeAllTutorials}
      >
        Remove All
      </button> */}
    </div>
    <div className="col-md-6">
      {currentLanguage ? (
        <div>
          <h4>Tutorial</h4>
          <div>
            <label>
              <strong>Name:</strong>
            </label>{" "}
            {currentLanguage.name}
          </div>
          <div>
            <label>
              <strong>Country:</strong>
            </label>{" "}
            {currentLanguage.country}
          </div>
          

          <Link
            to={"/languages/" + currentLanguage.id}
            className="badge badge-warning"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Language...</p>
        </div>
      )}
    </div>
  </div>
  </div>
  </div>
  </div>
  );
};

export default LanguageList;