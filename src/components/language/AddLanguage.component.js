import React, { useState } from "react";
import LanguageDataService from "../../services/LanguageService";

const AddLanguage = () => {
  const initialLanguageState = {
    id: null,
    title: "",
    country: ""
    
  };
  const [language, setLanguage] = useState(initialLanguageState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setLanguage({ ...language, [name]: value });
  };

  const saveLanguage = () => {
    var data = {
      name: language.name,
      country: language.country
    };

    LanguageDataService.create(data)
      .then(response => {
        setLanguage({
          id: response.data.id,
          name: response.data.name,
          country: response.data.country,
         
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newLanguage = () => {
    setLanguage(initialLanguageState);
    setSubmitted(false);
  };

  return (
<div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newLanguage}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Title</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={language.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Description</label>
            <input
              type="text"
              className="form-control"
              id="country"
              required
              value={language.country}
              onChange={handleInputChange}
              name="country"
            />
          </div>

          <button onClick={saveLanguage} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddLanguage;