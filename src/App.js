import axios from "axios";
import { FaCircleNotch } from "react-icons/fa";

import { useEffect, useState } from "react";
import "./css/app.css";
import { useNavigate } from "react-router-dom";
import { BiSolidToTop } from "react-icons/bi";

function App() {
  const show = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowTop(false);
  };

  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // Attach the event listener to the document
    document.body.addEventListener("wheel", handleScroll);

    // Remove the event listener when the component is unmounted
    return () => {
      document.body.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    console.log("Scroll Position:", scrollPosition);

    // Access the scroll information using event.deltaY

    console.log(scrollPosition);

    if (scrollPosition >= 1400) {
      setShowTop(true);
    }

    if (scrollPosition < 1400) {
      setShowTop(false);
    }

    // Your scroll handling logic goes here
  };

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
      {showTop === true && (
        <>
          <div className="top" onClick={show}>
            {" "}
            <div>
              <BiSolidToTop className="arrow" />
            </div>
          </div>
        </>
      )}

      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",

          padding: "33px",
          position: "fixed",
          width: "100vw",
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
            <div className="circle p-10 bg-white" style={{ height: "100vh" }}>
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
          backgroundAttachment: "fixed",
        }}
        className="category-dynamic-container"
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
    </>
  );
}

export default App;
