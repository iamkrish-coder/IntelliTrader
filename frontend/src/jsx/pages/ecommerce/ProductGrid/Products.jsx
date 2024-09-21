import React from "react";
import { Link } from "react-router-dom";

const Products = ({ product: { previewImg, title, rating, price } }) => {
  return (
    <div className="col-xl-2 col-xxl-3 col-md-4 col-sm-6">
      <div className="card">
        <div className="card-body product-grid-card">
          <div className="new-arrival-product">
            <div className="new-arrivals-img-contnent">
              <img className="img-fluid" src={previewImg} alt="" />
            </div>
            <div className="new-arrival-content text-center mt-3">
              <h5>
                <Link to="/ecom-product-detail">{title}</Link>
              </h5>
              {rating}
              <del className="discount">${price}</del>
              <span className="price">${price-50}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
