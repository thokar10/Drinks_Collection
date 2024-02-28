const Categories = ({ categoryName, category, onCategorySelected }) => {
  return (
    <>
      {category.map((data) => {
        return (
          <>
            {categoryName === data.strCategory && (
              <>
                <h3 style={{ backgroundColor: "red" }}>{data.strCategory}</h3>
              </>
            )}
          </>
        );
      })}
    </>
  );
};
export default Categories;
