import React, { Fragment } from "react";
import Products from "./Products";

/// Data
import productData from "../productData";


const ProductGrid = () => {
   return (
      <Fragment>         
         <div className="row">
            {productData.map((product) => (
               <Products key={product.key} product={product} />
            ))}
         </div>
      </Fragment>
   );
};

export default ProductGrid;
