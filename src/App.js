import axios from "axios";
import { FaCircleNotch } from "react-icons/fa";

import { useEffect, useState } from "react";
import "./css/app.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
    shakeDynamic();
  }, []);

  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("Ordinary Drink");
  const [DynamicCategory, setDynamicCategory] = useState([]);

  const getCategories = async () => {
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    );
    console.log(response.data.drinks);
    setCategory(response.data.drinks);
  };

  const shakeDynamic = async () => {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink`
    );
    console.log(response.data.drinks);
    setDynamicCategory(response.data.drinks);
    setLoading(false);
  };

  const categoryDynamic = async (categoryDynamicName) => {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryDynamicName}`
      );
      console.log(response.data.drinks);
      setDynamicCategory(response.data.drinks);
    } catch (e) {}
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "black",
          padding: " 41px",
        }}
      >
        <div className="category-container">
          {category.map((element) => {
            return (
              <>
                <div
                  className="category-name"
                  onClick={() => {
                    setCategoryName(element.strCategory);
                    categoryDynamic(element.strCategory);
                  }}
                >
                  {" "}
                  {element.strCategory === categoryName ? (
                    <>
                      <h4 style={{ backgroundColor: "red" }}>
                        {element.strCategory}
                      </h4>
                    </>
                  ) : (
                    <>
                      <h4>{element.strCategory}</h4>
                    </>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center items-center">
        {loading === true && (
          <>
            <div className="p-10 bg-white" style={{ height: "100vh" }}>
              <FaCircleNotch className="loading-icon " />
            </div>
          </>
        )}
      </div>
      <div
        style={{
          backgroundImage: `URL(
            "https://img.freepik.com/free-photo/fresh-cocktails-with-ice-lemon-lime-fruits-generative-ai_188544-12370.jpg?size=626&ext=jpg&ga=GA1.1.1269040533.1708992000&semt=ais"
          )`,
          backgroundRepeat: "round",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="category-Dynamic">
            {DynamicCategory.map((element) => {
              return (
                <>
                  <div className="image-container">
                    <img
                      className="drinks-image"
                      src={element.strDrinkThumb}
                      alt=""
                      onClick={() => {
                        navigate(`/${element.idDrink}`);
                      }}
                    />
                    <p>{element.strDrink}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
