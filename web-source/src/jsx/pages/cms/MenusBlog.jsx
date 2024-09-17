import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Nav, Collapse } from "react-bootstrap";

const formDataLabel = [
  { key: "0", title: "Privacy Policy", id: "12", checked: false },
  { key: "1", title: "Contact Us", id: "13", checked: false },
  { key: "2", title: "Important Information", id: "14", checked: false },
  { key: "3", title: "About Us", id: "15", checked: false },
  { key: "4", title: "Dummy Co", id: "16", checked: false },
];

const MenusBlog = () => {
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [checkedInput, setCheckedInput] = useState(false);
  const [openFirst, setOpenFirst] = useState(true);


  function checkBox(ind) {
    
    setCheckedInput(false);

   
  }

  return (
    <>
      <div className="filter cm-content-box box-primary">
        <div className="content-title"
          onClick={() => setOpenFirst(!openFirst)}
        >
          <div className="cpa">Menus</div>
          <div className="tools">
            <Link to={"#"}
              className={`SlideToolHeader ${openFirst ? "collapse" : "expand"}`}              
            >
              <i className="fas fa-angle-up" />
            </Link>
          </div>
        </div>
        <Collapse in={openFirst}>
          <div className="cm-content-body form excerpt">
            <div className="card-body">
              <div className="filter cm-content-box box-primary border">
                <div className="content-title border-0"
                   onClick={() => setOpen(!open)}
                >
                  <div className="cpa">Page</div>
                  <div className="tools">
                    <Link
                      to={"#"}
                      className={`SlideToolHeader ${
                        open ? "collapse" : "expand"
                      }`}
                     
                    >
                      <i className="fas fa-angle-up" />
                    </Link>
                  </div>
                </div>
                <Collapse in={open}>
                  <div className="cm-content-inner form excerpt border-top">
                    <div className="card-body">
                      <Tab.Container defaultActiveKey="View">
                        <Nav
                          as="ul"
                          className=" tab-my nav nav-tabs"
                          id="myTab"
                        >
                          <Nav.Item
                            as="li"
                            className="nav-item me-1"
                            role="presentation"
                          >
                            <Nav.Link as="button" eventKey="View" type="button">
                              View All
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item">
                            <Nav.Link
                              as="button"
                              eventKey="Search"
                              type="button"
                            >
                              Search
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <Tab.Content className="tab-content" id="myTabContent">
                          <Tab.Pane eventKey="View">
                            <div className="menu-tabs ">
                              {formDataLabel.map((item, ind) => (
                                <div className="form-check" key={ind}>
                                  <input
                                    className="form-check-input selectinput"
                                    type="checkbox"
                                    id={`flexlabel-${item.id}`}
                                    checked={checkedInput ? checkedInput : null}
                                    onClick={checkBox}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`flexlabel-${item.id}`}
                                  >
                                    {item.title}
                                  </label>
                                </div>
                              ))}

                            </div>
                            <div className="d-flex align-items-center flex-wrap  mb-3">
                              <Link
                                to={"#"}
                                className="text-hove"
                                onClick={() => {
                                  setCheckedInput(true);
                                }}
                              >
                                Select All
                              </Link>
                              <span className="mx-2">|</span>
                              <Link
                                to={"#"}
                                className="text-hove me-2 fs-14"
                                onClick={() => {
                                  setCheckedInput(false);
                                }}
                              >
                                Deselect All
                              </Link>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="Search">
                            <div className="menu-tabs">
                              <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                              >
                                Search
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Enter Page Name"
                              />
                            </div>
                          </Tab.Pane>
                          <div className="d-flex align-items-center flex-wrap">
                            <button
                              type="submit"
                              className="btn btn-primary btn-sm dalb-menu-btn"
                            >
                              Add to Menu
                            </button>
                          </div>
                        </Tab.Content>
                      </Tab.Container>
                    </div>
                  </div>
                </Collapse>
              </div>
              <div className="filter cm-content box-primary border">
                <div className="content-title border-0"
                   onClick={() => setOpen2(!open2)}
                >
                  <div className="cpa">Links</div>
                  <div className="tools">
                    <Link
                      to={"#"}
                      className={`SlideToolHeader ${
                        open2 ? "collapse" : "expand"
                      }`}
                     
                    >
                      <i className="fas fa-angle-up"></i>
                    </Link>
                  </div>
                </div>
                <Collapse in={open2}>
                  <div className="cm-content-inner form excerpt border-top">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-xl-4">
                          <h6>URL</h6>
                        </div>
                        <div className="col-xl-8">
                          <input type="text" className="form-control solid mb-2" placeholder="https://dexignlab.com/"/>
                        </div>
                        <div className="col-xl-4">
                          <h6>Link Text</h6>
                        </div>
                        <div className="col-xl-8">
                          <input type="text" className="form-control solid" placeholder="Menu items"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default MenusBlog;
