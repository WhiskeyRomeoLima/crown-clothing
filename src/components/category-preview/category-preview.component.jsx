import { Link } from 'react-router-dom'

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

const CategoryPreview = ({ title, products }) => (
  <div className='category-preview-container'>
    <h2>
      <Link className='title' to={title}>{title.toUpperCase()}</Link>
    </h2>
    <div className='preview'>
      {products
        .filter((_, idx) => idx < 4)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  </div>
);

export default CategoryPreview;

/*
lesson 20
const CategoryPreview = ({ title, products }) => (
  <div className='category-preview-container'>
    <h2>
      <span className='title'>{title.toUpperCase()}</span>
    </h2>
    <div className='preview'>
      {products
        .filter((_, idx) => idx < 4) //keep first four products
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  </div>
);
*/