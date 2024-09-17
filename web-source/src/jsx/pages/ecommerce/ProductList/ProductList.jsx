import React, { Fragment, useReducer } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

// images
import avatar1 from "../../../../assets/images/avatar/1.jpg";
import product2 from "../../../../assets/images/product/2.jpg";
import product3 from "../../../../assets/images/product/3.jpg";
import product4 from "../../../../assets/images/product/4.jpg";
import product5 from "../../../../assets/images/product/5.jpg";
import product6 from "../../../../assets/images/product/6.jpg";
import product7 from "../../../../assets/images/product/7.jpg";

const init = false;
const reducer = (state, action) =>{
	if(action.type==='reviewModal'){
		return { ...state, reviewModal: !state.reviewModal}
	}
	return state;
}

const productData = [
  {image: product2, title:'Bitcoin: Decoding the Digital Revolution in Finance', price:'320', },
  {image: product3, title:"Bitcoin Unleashed: Financial Frontier", price:'325', },
  {image: product4, title:'Bitcoin: Future Finance Frontier', price:'480', },
  {image: product5, title:'Bitcoin Ascendancy: Digital Epoch', price:'658', },
  {image: product6, title:'Bitcoin: Catalyst for Change', price:'280', },
  {image: product7, title:"Bitcoin Unleashed: Financial Frontier", price:'350', }
];

const ProductList = () => {
	const [state, dispatch] = useReducer(reducer ,init);		
  return (
    <Fragment>      
      <div className="row">
        {productData.map((item, index)=>(
          <div className="col-lg-12 col-xl-6" key={index}>
            <div className="card">
              <div className="card-body">
                <div className="row m-b-30">
                  <div className="col-md-5 col-xxl-12">
                    <div className="new-arrival-product mb-4 mb-xxl-4 mb-md-0">
                      <div className="new-arrivals-img-contnent">
                        <img className="img-fluid" src={item.image} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7 col-xxl-12">
                    <div className="new-arrival-content position-relative">
                      <h4>
                        <Link to="/ecom-product-detail">
                          {item.title}
                        </Link>
                      </h4>
                      <div className="comment-review star-rating">
                        <ul>
                          {" "}
                          <li>
                            <i className="fa fa-star" />
                          </li>{" "}
                          <li>
                            <i className="fa fa-star" />
                          </li>{" "}
                          <li>
                            <i className="fa fa-star" />
                          </li>{" "}
                          <li>
                            <i className="fa fa-star-half-alt" />
                          </li>{" "}
                          <li>
                            <i className="fa fa-star-half-alt" />
                          </li>
                        </ul>
                        <span className="review-text">(34 reviews) / </span>
                        <Link
                          className="product-review"
                          to="/ecom-product-list"
                          data-toggle="modal"
                          onClick={() => dispatch({type:'reviewModal'})}                        
                        >
                          Write a review?
                        </Link>
                        <p className="price">${item.price}.00</p>
                      </div>
                      <p>        
                        Availability:{" "}                
                        <span className="item fs-14">                                                    
                          In stock{" "} <i className="fa fa-check-circle text-success" />
                        </span>
                      </p>
                      <p>Product code:
                        <span className="item fs-14"> {" "}0405689 </span>
                      </p>
                      <p>Brand:
                         <span className="item fs-14"> Lee</span> 
                      </p>
                      <p className="text-content">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}        
        {/* review */}
        <Modal show={state.reviewModal} onHide={() => dispatch({type:'reviewModal'})} className="modal fade" id="reviewModal">
          <>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Review</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  onClick={() => dispatch({type:'reviewModal'})}
                >
                </button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    
					 dispatch({type:'reviewModal'})
                  }}
                >
                  <div className="text-center mb-4">
                    <img
                      className="img-fluid rounded"
                      width={78}
                      src={avatar1}
                      alt="DexignZone"
                    />
                  </div>
                  <div className="form-group">
                    <div className="rating-widget mb-4 text-center">
                      {/* Rating Stars Box */}
                      <div className="rating-stars">
                        <ul
                          id="stars"
                          className="d-flex justify-content-center align-items-center"
                        >	
						  <li>
							  <i className="fa fa-star me-1" />
							</li>{" "}
							<li>
							  <i className="fa fa-star me-1" />
							</li>{" "}
							<li>
							  <i className="fa fa-star me-1" />
							</li>{" "}
							<li>
							  <i className="fa fa-star me-1" />
							</li>{" "}
							<li>
							  <i className="fa fa-star" />
							</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Comment"
                      rows={5}
                      defaultValue={""}
                    />
                  </div>
                  <button className="btn btn-success btn-block">RATE</button>
                </form>
              </div>
            </div>
          </>
        </Modal>
      </div>
    </Fragment>
  );
};

export default ProductList;
