import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import "../css/SingleDrinks.css";

const SingleDrinks = () => {
  const navigate = useNavigate();

  const [singleDrinks, setSingleDrinks] = useState([]);

  useEffect(() => {
    getSingleDrinks();
  }, []);

  const params = useParams();
  const getSingleDrinks = async () => {
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
      <div>
        <IoChevronBackCircleSharp
          className="left-arrow"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      {singleDrinks.map((element) => {
        return (
          <>
            <div className="info-container">
              <div
                className="image-drinks"
                style={{ backgroundImage: `URL(${element.strDrinkThumb})` }}
              ></div>
              <div className="info-drinks p-3">
                <p className="para">
                  {" "}
                  Drinks_id:&nbsp;
                  <span>{element.idDrink}</span>
                </p>
                <p className="para">
                  Drinks_name:&nbsp;<span>{element.strDrink}</span>
                </p>
                <div className="flex">
                  <p> Drinks_instructions:&nbsp;</p>
                  <p className="span"> {element.strInstructions} </p>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
export default SingleDrinks;
