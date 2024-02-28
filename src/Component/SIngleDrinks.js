import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import "../css/SingleDrinks.css";

const SingleDrinks = () => {
  const navigate = useNavigate();

  const [singleDrinks, setSingleDrinks] = useState([]);
  useEffect(() => {
    getSignleDrinks();
  }, []);

  const params = useParams();
  const getSignleDrinks = async () => {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.drinks_id}`
      );

      console.log(response.data.drinks);
      const value = response.data.drinks;
      setSingleDrinks(value);
    } catch (e) {
      alert("not found");
    }
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <IoChevronBackCircleSharp
          className="left-arrow"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div className="bdy">
        {singleDrinks.map((element) => {
          return (
            <>
              <div className="info-container">
                <img src={element.strDrinkThumb} alt="" />
                <p>
                  {" "}
                  <span>id:</span>
                  {element.idDrink}
                </p>
                <p>{element.strDrink}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default SingleDrinks;
