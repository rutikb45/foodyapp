import React, { useState, useEffect } from "react";
import Cart from "../components/Card";

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:4001/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data from the server.");
      }

      const data = await res.json();
      setFoodItem(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Error loading data:", error);
      // Handle error state or show an error message
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div
            className="carousel-inner"
            id="carousel"
            style={{ maxHeight: "500px" }}
          >
            <div className="carousel-caption" style={{ zIndex: 10 }}>
              <div class="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button className="btn btn-outline-success  text-white bg-success " type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900×700/?food"
                className="d-block w-100"
                alt=""
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?chicken"
                className="d-block w-100"
                alt=""
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900×700/?pizza"
                className="d-block w-100"
                alt=""
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
      {foodCat !== null ? (
        foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem !== null ? (
                foodItem.length !== 0 ? (
                  foodItem
                    .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                    .map((filterItems) => (
                      <div
                        key={filterItems._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <Cart foodItem = {filterItems}
                         
                          options={filterItems.options[0]}
                        
                        />
                      </div>
                    ))
                ) : (
                  <div>No such data found.</div>
                )
              ) : (
                <div>Loading data...</div>
              )}
            </div>
          ))
        ) : (
          <div>No food categories found.</div>
        )
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  </div>
);
};

export default Home;
