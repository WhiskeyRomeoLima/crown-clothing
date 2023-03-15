import './category-item.styles.scss';

const CategoryItem = ({ category }) => {
  const {imageUrl, title} = category
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`, //object destructuring.  The object is { title, id, imageUrl }
        }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem

//* explanation of React style property naming convention
// normal css for setting background-image:  
// body {
//  background-image: url("paper.gif");
// }

// inline style setting
// style="background-image: url(https://i.ibb.co/R70vBrQ/men.png)"

//*React styling with a style object
// The style attribute accepts a JavaScript object with camelCased properties 
//rather than a CSS string. This is consistent with the DOM style JavaScript property, 
//is more efficient, and prevents XSS security holes. For example:

// const divStyle = {
//   backgroundImage: 'url(https://i.ibb.co/R70vBrQ/men.png))',
// };

// function HelloWorldComponent() {
//   return <div style={divStyle}>Hello World!</div>;
// }
//
//straight inline
//<div style={{ backgroundImage: 'url(https://i.ibb.co/R70vBrQ/men.png)' }} />