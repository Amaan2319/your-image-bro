import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=QppUFvXAuJcGgvYZbI65N10qQgjPzUzsfO3jgaPzsj0`
      );
      const responseData = response.data.results;
      setResults(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDefaultImages = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/random?count=20&client_id=QppUFvXAuJcGgvYZbI65N10qQgjPzUzsfO3jgaPzsj0`
        );
        const responseData = response.data;
        setResults(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDefaultImages();
  }, []);

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for images..."
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-warning">
            Search
          </button>
        </div>
      </form>
      <div className="row mt-4">
        {results.map((result) => (
          <div className="col-md-4" key={result.id}>
            <div className=" mb-4">
              <img
                src={result.urls.regular}
                alt={result.alt_description}
                className="my-2 card-img-top"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
