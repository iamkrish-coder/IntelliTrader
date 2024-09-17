import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Uploader } from "rsuite";

// import { Dropdown } from "react-bootstrap";

const Compose = () => {
  const [openMailBar, setOpenMailBar] = useState();
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className={`col-xl-3 col-xxl-4  email-left-body ${openMailBar ? "active" : " "}`}>
                  <div className="mb-3 mt-4 mt-sm-0 email-left-box">
                    <div className="p-0">
                      <Link
                        to="/email-compose"
                        className="btn btn-primary btn-block"
                      >
                        Compose
                      </Link>
                    </div>
                    <div className="mail-list mt-4  rounded">
                      <Link to="/email-inbox" className="list-group-item active">
                        <i className="fa fa-inbox font-18 align-middle me-2"></i>
                        Inbox
                        <span className="badge badge-danger badge-sm float-end">
                          198
                        </span>
                      </Link>
                      <Link to="/email-compose" className="list-group-item">
                        <i className="fa fa-paper-plane font-18 align-middle me-2"></i>
                        Sent
                      </Link>
                      <Link to="/email-compose" className="list-group-item">
                        <i className="fas fa-star font-18 align-middle me-2"></i>
                        Important
                        <span className="badge badge-danger text-white badge-sm float-end">
                          47
                        </span>
                      </Link>
                      <Link to="/email-compose" className="list-group-item">
                        <i className="mdi mdi-file-document-box font-18 align-middle me-2"></i>
                        Draft
                      </Link>
                      <Link to="/email-compose" className="list-group-item">
                        <i className="fa fa-trash font-18 align-middle me-2"></i>
                        Trash
                      </Link>
                    </div>
                    <div className="mail-list rounded overflow-hidden mt-4">
                      <div className="intro-title d-flex justify-content-between my-0">
                        <h5>Categories</h5>
                      </div>
                      <Link to="/email-inbox" className="list-group-item">
                        <span className="icon-warning">
                          <i className="fa fa-circle" aria-hidden="true"></i>
                        </span>
                        Work
                      </Link>
                      <Link to="/email-inbox" className="list-group-item">
                        <span className="icon-primary">
                          <i className="fa fa-circle" aria-hidden="true"></i>
                        </span>
                        Private
                      </Link>
                      <Link to="/email-inbox" className="list-group-item">
                        <span className="icon-success">
                          <i className="fa fa-circle" aria-hidden="true"></i>
                        </span>
                        Support
                      </Link>
                      <Link to="/email-inbox" className="list-group-item">
                        <span className="icon-dpink">
                          <i className="fa fa-circle" aria-hidden="true"></i>
                        </span>
                        Social
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-xxl-8">
                  <div className="email-right-box">
                    <div className="d-flex align-items-center">
                      <h4 className="card-title d-sm-none d-block">Email</h4>
                      <div className={`email-tools-box float-end mb-2 ${openMailBar ? "active" : " "}`} onClick={() => setOpenMailBar(!openMailBar)}>
                        <i className="fa-solid fa-list-ul"></i>
                      </div>
                    </div>

                    <div className="compose-content">
                      <form >
                        <div className="mb-3">
                          <input type="text" className="form-control bg-transparent" placeholder=" To:" />
                        </div>
                        <div className="mb-3">
                          <input type="text" className="form-control bg-transparent" placeholder=" Subject:" />
                        </div>
                        <div className="mb-3">
                          <textarea id="email-compose-editor" className="textarea_editor form-control bg-transparent" rows="8" placeholder="Enter text ..." />
                        </div>
                      </form>
                      <h5 className="mb-4">
                        <i className="fa fa-paperclip"></i> Attatchment
                      </h5>

                      <Uploader className="dropzone compose" action="//jsonplaceholder.typicode.com/posts/" draggable>
                        <div className="dz-message needsclick">
                          <span>Drop files here to upload.</span>
                        </div>
                      </Uploader>
                    </div>
                    <div className="text-start mt-4 mb-4">
                      <button className="btn btn-primary btn-sl-sm me-2" type="button">
                        <span className="me-2"> <i className="fa fa-paper-plane" /></span> Send
                      </button>
                      <button className="btn btn-danger light btn-sl-sm" type="button">
                        <span className="me-2"> <i className="fa fa-times" /> </span>
                        Discard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Compose;
