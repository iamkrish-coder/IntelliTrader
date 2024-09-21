import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";


const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Your username must consist of at least 3 characters ")
    .max(50, "Your username must consist of at least 3 characters ")
    .required("Please enter a username"),
  password: Yup.string()
    .min(5, "Your password must be at least 5 characters long")
    .max(50, "Your password must be at least 5 characters long")
    .required("Please provide a password"),
});


const options = [
  {value:'1', label:'React',},
  {value:'2', label:'CSS',},
  {value:'3', label:'JavaScript',},
  {value:'4', label:'Angular',},
  {value:'5', label:'HTML',},
  {value:'6', label:'Vue.js',},
  {value:'7', label:'Ruby',},
  {value:'8', label:'PHP',},
  {value:'9', label:'ASP.NET',},
  {value:'10', label:'Python',},
  {value:'11', label:'MySQL',},
]

const FormValidation = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Form Validation</h4>
            </div>
            <div className="card-body">
              <div className="form-validation">
                <form
                  className="form-valide"
                  action="#"
                  method="post"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-username"
                        >
                          Username
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-username"
                            name="val-username"
                            placeholder="Enter a username.."
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-email"
                        >
                          Email <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-email"
                            name="val-email"
                            placeholder="Your valid email.."
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-password"
                        >
                          Password
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="password"
                            className="form-control"
                            id="val-password"
                            name="val-password"
                            placeholder="Choose a safe one.."
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-confirm-password"
                        >
                          Confirm Password{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="password"
                            className="form-control"
                            id="val-confirm-password"
                            name="val-confirm-password"
                            placeholder="confirm password"
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-suggestions"
                        >
                          Suggestions <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <textarea
                            className="form-control"
                            id="val-suggestions"
                            name="val-suggestions"
                            rows="5"
                            placeholder="What would you like to see?"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-skill"
                        >
                          Best Skill
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">                         
                          <Select 
                              options={options} 
                              isSearchable={false}
                              defaultValue={options[1]}
                              className="custom-react-select" 
                          />                        
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-currency"
                        >
                          Currency
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-currency"
                            name="val-currency"
                            placeholder="$21.60"
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-website"
                        >
                          Website
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-website"
                            name="val-website"
                            placeholder="http://example.com"
                          />
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-phoneus"
                        >
                          Phone (US)
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-phoneus"
                            name="val-phoneus"
                            placeholder="212-999-0000"
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-digits"
                        >
                          Digits <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-digits"
                            name="val-digits"
                            placeholder="5"
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-number"
                        >
                          Number <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-number"
                            name="val-number"
                            placeholder="5.0"
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label
                          className="col-lg-4 col-form-label"
                          htmlFor="val-range"
                        >
                          Range [1, 5]
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-6">
                          <input
                            type="text"
                            className="form-control"
                            id="val-range"
                            name="val-range"
                            placeholder="4"
                          />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label className="col-lg-4 col-form-label">
                          <Link to="form-validation">
                            Terms &amp; Conditions
                          </Link>{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-lg-8">
                          <label
                            className="form-check css-control-primary css-checkbox"
                            htmlFor="val-terms"
                          >
                            <input
                              type="checkbox"
                              className="form-check-input me-2 mt-0"
                              id="val-terms"
                              name="val-terms"
                              value="1"
                            />
                            <span className="css-control-indicator"></span> Agree to terms and conditions
                          </label>
                        </div>
                      </div>
                      <div className="form-group mb-3 row">
                        <div className="col-lg-8 ms-auto">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Vertical Forms with icon</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <Formik
                  initialValues={{ username: "", password: "" }}
                  validationSchema={loginSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div
                        className={`form-group mb-3 ${
                          values.username
                            ? errors.username
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                      >
                        <label className="text-label form-label required">Username</label>
                        <div className="input-group">
                            <span className="input-group-text ">
                              <i className="fa fa-user" />{" "}
                            </span>
                          <input
                            type="text"
                            className="form-control"
                            id="val-username1"
                            placeholder="Enter a username.."
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                          />
                          <div
                            id="val-username1-error"
                            className="invalid-feedback animated fadeInUp"
                            style={{ display: "block" }}
                          >
                            {errors.username && errors.username}
                          </div>

                          <div
                            id="val-username1-error"
                            className="invalid-feedback animated fadeInUp"
                            style={{ display: "block" }}
                          />
                        </div>
                      </div>
                      <div
                        className={`form-group mb-3 ${
                          values.password
                            ? errors.password
                              ? "is-invalid"
                              : "is-valid"
                            : ""
                        }`}
                      >
                        <label className="text-label form-label">Password <span className="required"></span></label>
                        <div className="input-group transparent-append mb-2">                          
                            <span className="input-group-text">
                              {" "}
                              <i className="fa fa-lock" />{" "}
                            </span>
                          
                          <input
                            type={`${showPassword ? "text" : "password"}`}
                            className="form-control"
                            id="val-password1"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Choose a safe one.."
                          />

                          <div
                            className="input-group-text show-validate"
                            onClick={() => setShowPassword(!showPassword)}
                          >

                              {" "}
                                {showPassword === false ? (<i className="fa fa-eye-slash" />) : (<i className="fa fa-eye" />)}
                            
                          </div>
                          <div
                            id="val-username1-error"
                            className="invalid-feedback animated fadeInUp"
                            style={{ display: "block" }}
                          >
                            {errors.password && errors.password}
                          </div>
                        </div>
                      </div>

                      <div className="form-group mb-3">
                        <div className="form-check">
                          <input
                            id="checkbox1"
                            className="form-check-input"
                            type="checkbox"
                          />
                          <label
                            htmlFor="checkbox1"
                            className="form-check-label"
                          >
                            Check me out
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn me-2 btn-primary"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                      <button  className="btn btn-danger light">
                        Cancel
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FormValidation;
