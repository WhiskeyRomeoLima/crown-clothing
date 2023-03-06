import CategoryItem from '../category-item/category-item.component';
import './directory.styles.scss'

//we passed in the categories array as a prop from home.component and use array.map display each category.
//note when creating any type of list each list item must contain a unique key
const Directory = ({categories}) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
