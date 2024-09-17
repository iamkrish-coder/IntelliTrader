import React, { Fragment, useState } from "react";
import Highlight from "react-highlight";

import {Link} from 'react-scroll';
import {
  Row,
  Col,
  Card,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  SplitButton,
  Tab, Nav
} from "react-bootstrap";

const sidebarLink = [
  {to:'basic-dropdown', title:'Basic Dropdown'},
  {to:'dropdown-divider', title:'Dropdown Divider'},
  {to:'dropdown-header', title:'Dropdown Header'},
  {to:'disable-active', title:'Dropdown Disable'},
  {to:'align-right', title:'Align Right'},
  {to:'dropup', title:'Dropup'},
  {to:'dropright', title:'Dropright'},
  {to:'dropstart', title:'Dropstart'},
  {to:'button-dropdowns', title:'Button Dropdowns'},
  {to:'sizing', title:'Sizing'},
  {to:'custom-style', title:'Custom Style'},
];

const UiDropDown = () => {
  const [activeLink ,setActiveLink] = useState(0);
  return (
    <Fragment>      
      
      <div className="element-area">
        <div className="demo-view">
          <div className="container-fluid pt-0 ps-0 pe-lg-4 pe-0">
            <Row>
              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="basic-dropdown" className="dz-card">
                    <Card.Header className="flex-wrap border-0">
                      <div>
                        <Card.Title>Basic Dropdown</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          A dropdown menu is a toggleable menu that allows the user to
                          choose one value from a predefined list
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            <Dropdown>
                              <Dropdown.Toggle variant="primary" >
                                Dropdown button
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-dropdown">
  <Dropdown>
    <Dropdown.Toggle variant="primary">
      Dropdown button
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</div>
`}
</Highlight>
</div>
                      </Tab.Pane>
                    </Tab.Content>  
                  </Card>
                </Tab.Container>  
              </Col>

              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="dropdown-divider" className="dz-card">
                    <Card.Header className="flex-wrap border-0">
                      <div>
                        <Card.Title>Dropdown Divider</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          The <code>.dropdown-divider</code> class is used to separate
                          links inside the dropdown menu with a thin horizontal border
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            <Dropdown>
                              <Dropdown.Toggle variant="primary" >
                                Dropdown button
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                                <div className="dropdown-divider"></div>
                                <Dropdown.Item >Another link</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-dropdown">
  <Dropdown>
    <Dropdown.Toggle variant="primary">
      Dropdown button
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
      <div className="dropdown-divider"></div>
      <Dropdown.Item >Another link</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</div>
`}
</Highlight>
</div>
                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>

              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="dropdown-header" className="dz-card">
                    <Card.Header className="flex-wrap border-0">
                      <div>

                        <Card.Title>Dropdown Header</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          The <code>.dropdown-header</code> class is used to add headers
                          inside the dropdown menu
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            <Dropdown>
                              <Dropdown.Toggle variant="primary" >
                                Dropdown button
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <h5 className="dropdown-header">Dropdown header</h5>
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                                <h5 className="dropdown-header">Dropdown header</h5>
                                <Dropdown.Item >Another link</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-dropdown">
  <Dropdown>
    <Dropdown.Toggle variant="primary">
      Dropdown button
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <h5 className="dropdown-header">Dropdown header</h5>
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
      <h5 className="dropdown-header">Dropdown header</h5>
      <Dropdown.Item >Another link</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</div>
`}
</Highlight>
</div>
                      </Tab.Pane>
                     </Tab.Content>
                        
                  </Card>
                </Tab.Container>  
              </Col>
              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="disable-active" className="dz-card">
                    <Card.Header className="flex-wrap border-0">
                      <div>
                        <Card.Title>Disable and Active items</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          The <code>.dropdown-header</code> class is used to add headers
                          inside the dropdown menu
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            <Dropdown>
                              <Dropdown.Toggle variant="primary" >
                                Dropdown button
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item >Normal</Dropdown.Item>
                                <Link to={"#"} className="dropdown-item active">
                                  Active
                                </Link>
                                <Link to={"#"} className="dropdown-item disabled">
                                  Disabled
                                </Link>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-dropdown">
  <Dropdown>
    <Dropdown.Toggle variant="primary">
      Dropdown button
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item >Normal</Dropdown.Item>
      <Link to={"#"} className="dropdown-item active">
        Active
      </Link>
      <Link to={"#"} className="dropdown-item disabled">
        Disabled
      </Link>
    </Dropdown.Menu>
  </Dropdown>
</div>
`}
</Highlight>
</div>
                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>

              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="align-right" className="dz-card">
                    <Card.Header className="flex-wrap border-0">
                      <div>

                        <Card.Title>Align Right</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          To right-align the dropdown, add the{" "}
                          <code>.dropdown-menu-end</code> class to the element with
                          .dropdown-menu
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                        <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            <Dropdown>
                              <Dropdown.Toggle variant="primary" >
                                Dropdown button
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu-right">
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
 <div className="basic-dropdown">
  <Dropdown>
    <Dropdown.Toggle variant="primary">
      Dropdown button
    </Dropdown.Toggle>
    <Dropdown.Menu className="dropdown-menu-right">
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</div>
`}
</Highlight>
</div>
                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>

              <Col xl={12} >
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="dropup" className="dz-card">
                    <Card.Header className="flex-wrap border-0">
                      <div>
                        <Card.Title>Dropup</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          The <code>.dropup</code> class makes the dropdown menu expand
                          upwards instead of downwards
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            {/* <!-- Default dropup button --> */}
                            <DropdownButton
                              as={ButtonGroup}
                              id="dropdown-button-drop-up"
                              drop="up"
                              variant="primary"
                              title="Dropup"
                              className="me-1 mt-1"
                            >
                              <Dropdown.Item >Link 1</Dropdown.Item>
                              <Dropdown.Item >Link 2</Dropdown.Item>
                              <Dropdown.Item >Link 3</Dropdown.Item>
                            </DropdownButton>

                            {/* <!-- Split dropup button --> */}
                            <SplitButton
                              as={ButtonGroup}
                              variant="primary"
                              id="dropdown-button-drop-up"
                              className="mt-1"
                              drop="up"
                              title="Split dropup"
                            >
                              <Dropdown.Item >Link 1</Dropdown.Item>
                              <Dropdown.Item >Link 2</Dropdown.Item>
                              <Dropdown.Item >Link 3</Dropdown.Item>
                            </SplitButton>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-dropdown">  
  <DropdownButton
    as={ButtonGroup}
    id="dropdown-button-drop-up"
    drop="up"
    variant="primary"
    title="Dropup"
    className="me-1 mt-1"
  >
    <Dropdown.Item >Link 1</Dropdown.Item>
    <Dropdown.Item >Link 2</Dropdown.Item>
    <Dropdown.Item >Link 3</Dropdown.Item>
  </DropdownButton>
  <SplitButton
    as={ButtonGroup}
    variant="primary"
    id="dropdown-button-drop-up"
    className="mt-1"
    drop="up"
    title="Split dropup"
  >
    <Dropdown.Item >Link 1</Dropdown.Item>
    <Dropdown.Item >Link 2</Dropdown.Item>
    <Dropdown.Item >Link 3</Dropdown.Item>
  </SplitButton>
</div>
`}
</Highlight>
</div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Card>
                </Tab.Container>  
              </Col>

              <Col xl={12} >
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="dropright" className="dz-card">
                    <Card.Header className="flex-wrap border-0">
                      <div>
                        <Card.Title>Dropright </Card.Title>
                        <Card.Text className="m-0 subtitle">
                          Trigger dropdown menus at the right of the elements by adding{" "}
                          <code>.dropend</code> to the parent element
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">
                            {/* <!-- Default dropright button --> */}
                            <div className="btn-group dropend ">
                              <DropdownButton
                                as={ButtonGroup}
                                id="dropdown-button-drop-end"
                                drop="end"
                                variant="primary"
                                title=" Dropright"
                                className="me-1 mb-1"
                              >
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                              </DropdownButton>
                            </div>

                            {/* <!-- Split dropright button --> */}
                            <div className="btn-group dropend ">
                              <SplitButton
                                as={ButtonGroup}
                                variant="primary"
                                id="dropdown-button-drop-end"
                                className="mb-1 me-1"
                                drop="end"
                                title="Split dropright"
                              >
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                              </SplitButton>
                            </div>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-dropdown"> 
  <div className="btn-group dropright ">
    <DropdownButton
      as={ButtonGroup}
      id="dropdown-button-drop-right"
      drop="right"
      variant="primary"
      title=" Dropright"
      className="me-1 mb-1"
    >
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
    </DropdownButton>
  </div>  
  <div className="btn-group dropright ">
    <SplitButton
      as={ButtonGroup}
      variant="primary"
      id="dropdown-button-drop-right"
      className="mb-1 me-1"
      drop="right"
      title="Split dropright"
    >
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
    </SplitButton>
  </div>
</div>
`}
</Highlight>
</div>
                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>

              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="dropstart" className="dz-card">
                    <Card.Header className="flex-wrap border-0">
                      <div>

                        <Card.Title>Dropstart </Card.Title>
                        <Card.Text className="m-0 subtitle">
                          Trigger dropdown menus at the right of the elements by adding{" "}
                          <code>.dropstart </code> to the parent element
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="basic-dropdown">                        
                            <DropdownButton
                              as={ButtonGroup}
                              id="dropdown-button-drop-start"
                              drop="start"
                              variant="primary"
                              className="dropstart me-1 mt-1"
                              title="dropstart"
                            >
                              <Dropdown.Item >Link 1</Dropdown.Item>
                              <Dropdown.Item >Link 2</Dropdown.Item>
                              <Dropdown.Item >Link 3</Dropdown.Item>
                            </DropdownButton>

                            {/* <!-- Split dropleft button --> */}
                            <div className="btn-group ">
                              <SplitButton
                                as={ButtonGroup}
                                variant="primary"
                                id="dropdown-button-drop-start"
                                className="dropstart mt-1"
                                drop="start"
                                title="Split dropstart"
                              >
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                              </SplitButton>
                            </div>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">

  <Highlight>
  {`
<div className="basic-dropdown">                        
  <DropdownButton
    as={ButtonGroup}
    id="dropdown-button-drop-start"
    drop="start"
    variant="primary"
    className="dropstart me-1 mt-1"
    title="dropstart"
  >
    <Dropdown.Item >Link 1</Dropdown.Item>
    <Dropdown.Item >Link 2</Dropdown.Item>
    <Dropdown.Item >Link 3</Dropdown.Item>
  </DropdownButton>

  {/* <!-- Split dropleft button --> */}
  <div className="btn-group ">
    <SplitButton
      as={ButtonGroup}
      variant="primary"
      id="dropdown-button-drop-start"
      className="dropstart mt-1"
      drop="start"
      title="Split dropstart"
    >
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
    </SplitButton>
  </div>
</div>
  `}
  </Highlight>

  </div>
                      </Tab.Pane>
                    </Tab.Content>

                  </Card>
                </Tab.Container>  
              </Col>
            

            
              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="button-dropdowns" className="dz-card">
                    <Card.Header className="flex-wrap border-0">
                      <div>
                        <Card.Title>Button Dropdowns</Card.Title>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="button-dropdown">
                            {[
                              "Primary",
                              "Secondary",
                              "Success",
                              "Info",
                              "Warning",
                              "Danger",
                            ].map((variant) => (
                              <SplitButton
                                key={variant}
                                as={ButtonGroup}
                                variant={variant.toLowerCase()}
                                id="dropdown-button-drop-dwon"
                                className="mt-1 me-1"
                                drop="down"
                                title={` ${variant}`}
                              >
                                <Dropdown.Item >Link 1</Dropdown.Item>
                                <Dropdown.Item >Link 2</Dropdown.Item>
                                <Dropdown.Item >Link 3</Dropdown.Item>
                              </SplitButton>
                            ))}
                          </div>
                        </Card.Body>
                      </Tab.Pane>  
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="button-dropdown">
  {[
    "Primary",
    "Secondary",
    "Success",
    "Info",
    "Warning",
    "Danger",
  ].map((variant) => (
    <SplitButton
      key={variant}
      as={ButtonGroup}
      variant={variant.toLowerCase()}
      id="dropdown-button-drop-dwon"
      className="mt-1 me-1"
      drop="down"
      title={\` $\{variant}\`}
    >
      <Dropdown.Item >Link 1</Dropdown.Item>
      <Dropdown.Item >Link 2</Dropdown.Item>
      <Dropdown.Item >Link 3</Dropdown.Item>
    </SplitButton>
  ))}
</div>
`}
</Highlight>
</div>
                      </Tab.Pane>  
                    </Tab.Content>

                  </Card>
                </Tab.Container>  
              </Col>
            

            
              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">            
                  <Card name="sizing" className="dz-card">
                    <Card.Header className="flex-wrap border-0">
                      <div>
                        <Card.Title>Sizing</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          Button dropdowns work with buttons of all sizes, including
                          default and split dropdown buttons.
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                          <Nav.Item as="li" className="nav-item" role="presentation">
                            <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="nav-item" >
                            <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                          </Nav.Item>
                        </Nav>  
                    </Card.Header>
                    <Tab.Content>
                      <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <div className="dropdown-size">
                            {/* <!-- Large button groups (default and split) --> */}
                            <DropdownButton
                              as={ButtonGroup}
                              id="dropdown-button-drop-down"
                              drop="down"
                              variant="primary"
                              size="lg"
                              title=" Large button"
                              className="me-1 mb-1"
                            >
                              <Dropdown.Item >Action</Dropdown.Item>
                              <Dropdown.Item >Another action</Dropdown.Item>
                              <Dropdown.Item >Something else here</Dropdown.Item>
                              <div className="dropdown-divider"></div>
                              <Dropdown.Item >Separated link</Dropdown.Item>
                            </DropdownButton>

                            <SplitButton
                              as={ButtonGroup}
                              id="dropdown-button-drop-down"
                              drop="down"
                              variant="primary"
                              size="lg"
                              title=" Large split button"
                              className="me-1"
                            >
                              <Dropdown.Item >Action</Dropdown.Item>
                              <Dropdown.Item >Another action</Dropdown.Item>
                              <Dropdown.Item >Something else here</Dropdown.Item>
                              <div className="dropdown-divider"></div>
                              <Dropdown.Item >Separated link</Dropdown.Item>
                            </SplitButton>

                            {/* <!-- Small button groups (default and split) --> */}

                            <DropdownButton
                              as={ButtonGroup}
                              id="dropdown-button-drop-down"
                              drop="down"
                              variant="primary"
                              size="sm"
                              className="mt-1 me-1"
                              title=" Large button"
                            >
                              <Dropdown.Item >Action</Dropdown.Item>
                              <Dropdown.Item >Another action</Dropdown.Item>
                              <Dropdown.Item >Something else here</Dropdown.Item>
                              <div className="dropdown-divider"></div>
                              <Dropdown.Item >Separated link</Dropdown.Item>
                            </DropdownButton>

                            <SplitButton
                              as={ButtonGroup}
                              id="dropdown-button-drop-down"
                              drop="down"
                              variant="primary"
                              size="sm"
                              title=" Large split button"
                              className="mt-1 me-1"
                            >
                              <Dropdown.Item >Action</Dropdown.Item>
                              <Dropdown.Item >Another action</Dropdown.Item>
                              <Dropdown.Item >Something else here</Dropdown.Item>
                              <div className="dropdown-divider"></div>
                              <Dropdown.Item >Separated link</Dropdown.Item>
                            </SplitButton>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="dropdown-size">
  <DropdownButton
    as={ButtonGroup}
    id="dropdown-button-drop-down"
    drop="down"
    variant="primary"
    size="lg"
    title=" Large button"
    className="me-1 mb-1"
  >
    <Dropdown.Item >Action</Dropdown.Item>
    <Dropdown.Item >Another action</Dropdown.Item>
    <Dropdown.Item >Something else here</Dropdown.Item>
    <div className="dropdown-divider"></div>
    <Dropdown.Item >Separated link</Dropdown.Item>
  </DropdownButton>

  <SplitButton
    as={ButtonGroup}
    id="dropdown-button-drop-down"
    drop="down"
    variant="primary"
    size="lg"
    title=" Large split button"
    className="me-1"
  >
    <Dropdown.Item >Action</Dropdown.Item>
    <Dropdown.Item >Another action</Dropdown.Item>
    <Dropdown.Item >Something else here</Dropdown.Item>
    <div className="dropdown-divider"></div>
    <Dropdown.Item >Separated link</Dropdown.Item>
  </SplitButton>

  <DropdownButton
    as={ButtonGroup}
    id="dropdown-button-drop-down"
    drop="down"
    variant="primary"
    size="sm"
    className="mt-1 me-1"
    title=" Large button"
  >
    <Dropdown.Item >Action</Dropdown.Item>
    <Dropdown.Item >Another action</Dropdown.Item>
    <Dropdown.Item >Something else here</Dropdown.Item>
    <div className="dropdown-divider"></div>
    <Dropdown.Item >Separated link</Dropdown.Item>
  </DropdownButton>

  <SplitButton
    as={ButtonGroup}
    id="dropdown-button-drop-down"
    drop="down"
    variant="primary"
    size="sm"
    title=" Large split button"
    className="mt-1 me-1"
  >
    <Dropdown.Item >Action</Dropdown.Item>
    <Dropdown.Item >Another action</Dropdown.Item>
    <Dropdown.Item >Something else here</Dropdown.Item>
    <div className="dropdown-divider"></div>
    <Dropdown.Item >Separated link</Dropdown.Item>
  </SplitButton>
</div>
`}
</Highlight>
</div>
                      </Tab.Pane>
                    </Tab.Content>

                  </Card>
                </Tab.Container>  
              </Col>
            

            
              <Col lg={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card id="custom-style" className="dz-card">
                    <Card.Header className="flex-wrap border-0">
                      <div>
                        <Card.Title>Custom style</Card.Title>
                        <Card.Text className="m-0 subtitle">
                          Use <code>.custom-dropdown</code> this class for this style
                        </Card.Text>
                      </div>
                      <Nav as="ul" className="nav nav-tabs dzm-tabs" id="myTab" role="tablist">
                        <Nav.Item as="li" className="nav-item" role="presentation">
                          <Nav.Link as="button"  type="button" eventKey="Preview">Preview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="nav-item" >
                          <Nav.Link as="button"  type="button" eventKey="Code">React</Nav.Link>
                        </Nav.Item>
                      </Nav>  
                    </Card.Header>
                    <Tab.Content>
                        <Tab.Pane eventKey="Preview">
                        <Card.Body>
                          <Row>
                            <Col xl={3} md={3} sm={4} className="col-6">
                              <Dropdown>
                                <Dropdown.Toggle variant="" className="ps-0 mt-1 mb-2">
                                  Last 7 days
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >Last 1 Month</Dropdown.Item>
                                  <Dropdown.Item >Last 6 Month</Dropdown.Item>
                                  <Dropdown.Item >Last 10 Month</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>

                            <Col xl={3} md={3} sm={4} className="col-6">
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="outline-primary"
                                  size="sm"
                                  className="mt-1 mb-2"
                                >
                                  Last 7 days
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >Last 1 Month</Dropdown.Item>
                                  <Dropdown.Item >Last 6 Month</Dropdown.Item>
                                  <Dropdown.Item >Last 10 Month</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>

                            <Col xl={3} md={3} sm={4} className="col-6 mb-3 mb-sm-0">
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="outline-primary"
                                  size="sm"
                                  className="mt-1 mb-2"
                                >
                                  Last 1 Hour
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >Last 1 hour</Dropdown.Item>
                                  <Dropdown.Item >Last 2 hour</Dropdown.Item>
                                  <Dropdown.Item >Last 3 hour</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>

                            <Col xl={3} md={3} sm={4} className="col-6 mb-3 mb-sm-0">
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="primary"
                                  size="sm"
                                  className="mt-1 mb-2"
                                >
                                  Last 1 Hour
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >Last 1 hour</Dropdown.Item>
                                  <Dropdown.Item >Last 2 hour</Dropdown.Item>
                                  <Dropdown.Item >Last 3 hour</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>

                            <Col xl={3} md={3} sm={4} className="col-6 mb-3 mb-sm-0">
                              <Dropdown className="custom-dropdown">
                                <Dropdown.Toggle
                                  variant="primary"
                                  className="btn btn-sm i-false mt-1 mb-2 d-flex align-items-center"
                                  data-toggle="dropdown"
                                >
                                  <i className="ti-search me-2 mt-1"></i> 3 AM
																	<i className="fa fa-angle-down ms-3"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >6 AM</Dropdown.Item>
                                  <Dropdown.Item >9 AM</Dropdown.Item>
                                  <Dropdown.Item >12 AM</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>

                            <Col xl={3} md={3} sm={4} className="col-6">
                              <Dropdown className="custom-dropdown">
                                <Dropdown.Toggle
                                  variant="primary"
                                  size="sm"
                                  id="whiteSpace"
                                  className="btn btn-sm btn-primary  flex-wrap i-false mt-1 mb-2"
                                >
                                  <i className="ti-calendar me-3"></i> March 20, 2024 &nbsp; To &nbsp;April
																	20, 2024
																	<i className="fa fa-angle-down ms-3"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >
                                    May 20, 2024 &nbsp; To &nbsp; June 20, 2024
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    July 20, 2024 &nbsp; To &nbsp; August 20, 2024
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>
                            <Col xl={3} md={3} sm={4} className="col-6">
                              <Dropdown className="custom-dropdown">
                                <Dropdown.Toggle
                                  as="button"
                                  variant=""
                                  className="btn sharp btn-primary tp-btn  mt-1 mb-2 ms-3 i-false"
                                  id="tp-btn"
                                >
                                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5202 17.4167C13.5202 18.81 12.3927 19.9375 10.9994 19.9375C9.60601 19.9375 8.47852 18.81 8.47852 17.4167C8.47852 16.0233 9.60601 14.8958 10.9994 14.8958C12.3927 14.8958 13.5202 16.0233 13.5202 17.4167ZM9.85352 17.4167C9.85352 18.0492 10.3669 18.5625 10.9994 18.5625C11.6319 18.5625 12.1452 18.0492 12.1452 17.4167C12.1452 16.7842 11.6319 16.2708 10.9994 16.2708C10.3669 16.2708 9.85352 16.7842 9.85352 17.4167Z" fill="var(--primary)"></path>
                                    <path d="M13.5202 4.58369C13.5202 5.97699 12.3927 7.10449 10.9994 7.10449C9.60601 7.10449 8.47852 5.97699 8.47852 4.58369C8.47852 3.19029 9.60601 2.06279 10.9994 2.06279C12.3927 2.06279 13.5202 3.19029 13.5202 4.58369ZM9.85352 4.58369C9.85352 5.21619 10.3669 5.72949 10.9994 5.72949C11.6319 5.72949 12.1452 5.21619 12.1452 4.58369C12.1452 3.95119 11.6319 3.43779 10.9994 3.43779C10.3669 3.43779 9.85352 3.95119 9.85352 4.58369Z" fill="var(--primary)"></path>
                                    <path d="M13.5202 10.9997C13.5202 12.393 12.3927 13.5205 10.9994 13.5205C9.60601 13.5205 8.47852 12.393 8.47852 10.9997C8.47852 9.6063 9.60601 8.4788 10.9994 8.4788C12.3927 8.4788 13.5202 9.6063 13.5202 10.9997ZM9.85352 10.9997C9.85352 11.6322 10.3669 12.1455 10.9994 12.1455C11.6319 12.1455 12.1452 11.6322 12.1452 10.9997C12.1452 10.3672 11.6319 9.8538 10.9994 9.8538C10.3669 9.8538 9.85352 10.3672 9.85352 10.9997Z" fill="var(--primary)"></path>
																	</svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >Option 1</Dropdown.Item>
                                  <Dropdown.Item >Option 2</Dropdown.Item>
                                  <Dropdown.Item >Option 3</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>

                            <Col xl={3} md={3} sm={4} className="col-6">
                              <Dropdown className="custom-dropdown">
                                <Dropdown.Toggle
                                  as="button"
                                  variant=""
                                  className="btn sharp btn-primary tp-btn i-false"
                                  id="tp-btn"
                                >
                                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.5202 17.4167C13.5202 18.81 12.3927 19.9375 10.9994 19.9375C9.60601 19.9375 8.47852 18.81 8.47852 17.4167C8.47852 16.0233 9.60601 14.8958 10.9994 14.8958C12.3927 14.8958 13.5202 16.0233 13.5202 17.4167ZM9.85352 17.4167C9.85352 18.0492 10.3669 18.5625 10.9994 18.5625C11.6319 18.5625 12.1452 18.0492 12.1452 17.4167C12.1452 16.7842 11.6319 16.2708 10.9994 16.2708C10.3669 16.2708 9.85352 16.7842 9.85352 17.4167Z" fill="var(--primary)"></path>
                                    <path d="M13.5202 4.58369C13.5202 5.97699 12.3927 7.10449 10.9994 7.10449C9.60601 7.10449 8.47852 5.97699 8.47852 4.58369C8.47852 3.19029 9.60601 2.06279 10.9994 2.06279C12.3927 2.06279 13.5202 3.19029 13.5202 4.58369ZM9.85352 4.58369C9.85352 5.21619 10.3669 5.72949 10.9994 5.72949C11.6319 5.72949 12.1452 5.21619 12.1452 4.58369C12.1452 3.95119 11.6319 3.43779 10.9994 3.43779C10.3669 3.43779 9.85352 3.95119 9.85352 4.58369Z" fill="var(--primary)"></path>
                                    <path d="M13.5202 10.9997C13.5202 12.393 12.3927 13.5205 10.9994 13.5205C9.60601 13.5205 8.47852 12.393 8.47852 10.9997C8.47852 9.6063 9.60601 8.4788 10.9994 8.4788C12.3927 8.4788 13.5202 9.6063 13.5202 10.9997ZM9.85352 10.9997C9.85352 11.6322 10.3669 12.1455 10.9994 12.1455C11.6319 12.1455 12.1452 11.6322 12.1452 10.9997C12.1452 10.3672 11.6319 9.8538 10.9994 9.8538C10.3669 9.8538 9.85352 10.3672 9.85352 10.9997Z" fill="var(--primary)"></path>
                                  </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item >Option 1</Dropdown.Item>
                                  <Dropdown.Item >Option 2</Dropdown.Item>
                                  <Dropdown.Item >Option 3</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<Row>
  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle variant="" className="ps-0 mt-1 mb-2">
        Last 7 days
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >Last 1 Month</Dropdown.Item>
        <Dropdown.Item >Last 6 Month</Dropdown.Item>
        <Dropdown.Item >Last 10 Month</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>

  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-primary"
        size="sm"
        className="mt-1 mb-2"
      >
        Last 7 days
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >Last 1 Month</Dropdown.Item>
        <Dropdown.Item >Last 6 Month</Dropdown.Item>
        <Dropdown.Item >Last 10 Month</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>

  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-primary"
        size="sm"
        className="mt-1 mb-2"
      >
        Last 1 Hour
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >Last 1 hour</Dropdown.Item>
        <Dropdown.Item >Last 2 hour</Dropdown.Item>
        <Dropdown.Item >Last 3 hour</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>

  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        variant="primary"
        size="sm"
        className="mt-1 mb-2"
      >
        Last 1 Hour
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >Last 1 hour</Dropdown.Item>
        <Dropdown.Item >Last 2 hour</Dropdown.Item>
        <Dropdown.Item >Last 3 hour</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>

  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        variant="primary"
        className="btn btn-sm btn-primary mt-1 mb-2"
        data-toggle="dropdown"
      >
        <i className="ti-search m-r-5" /> 3 AM
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >6 AM</Dropdown.Item>
        <Dropdown.Item >9 AM</Dropdown.Item>
        <Dropdown.Item >12 AM</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>

  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        variant="primary"
        size="sm"
        id="whiteSpace"
        className="mt-1 mb-2"
      >
        <i className="ti-calendar m-r-5" /> March 20, 2018 &nbsp;
        To &nbsp;April 20, 2018
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >
          May 20, 2018 &nbsp; To &nbsp; June 20, 2018
        </Dropdown.Item>
        <Dropdown.Item >
          July 20, 2018 &nbsp; To &nbsp; August 20, 2018
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>
  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        as="button"
        variant=""
        className="btn sharp btn-primary tp-btn mt-1"
        id="tp-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="18px"
          height="18px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <rect x="0" y="0" width="24" height="24" />
            <circle fill="#000000" cx="12" cy="5" r="2" />
            <circle fill="#000000" cx="12" cy="12" r="2" />
            <circle fill="#000000" cx="12" cy="19" r="2" />
          </g>
        </svg>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >Option 1</Dropdown.Item>
        <Dropdown.Item >Option 2</Dropdown.Item>
        <Dropdown.Item >Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>

  <Col xl={3}>
    <Dropdown>
      <Dropdown.Toggle
        as="button"
        variant=""
        className="btn sharp btn-primary tp-btn mt-1"
        id="tp-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="18px"
          height="18px"
          viewBox="0 0 24 24"
          version="1.1"
        >
          <g
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <rect x="0" y="0" width="24" height="24" />
            <circle fill="#000000" cx="12" cy="5" r="2" />
            <circle fill="#000000" cx="12" cy="12" r="2" />
            <circle fill="#000000" cx="12" cy="19" r="2" />
          </g>
        </svg>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item >Option 1</Dropdown.Item>
        <Dropdown.Item >Option 2</Dropdown.Item>
        <Dropdown.Item >Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Col>
</Row>
`}
</Highlight>
</div>
                      </Tab.Pane>
                    </Tab.Content>    
                  </Card>
                </Tab.Container>  
              </Col>
            </Row>            
          </div>
        </div>
        <div className="demo-right ">
          <div className="demo-right-inner" id="right-sidebar">
              <h4 className="title">Dropdown</h4>
              <div className="dz-scroll demo-right-tabs">
                <ul className="navbar-nav" id="menu-bar">
                    {sidebarLink.map((item, ind)=>(
                      <li key={ind}   
                        className={`${ind === activeLink ? 'active' :  ''}`}                     
                      >
                        <Link to={item.to} 
                          className={`scroll ${ind === activeLink ? 'active' :  ''} `}
                          activeClass="active"
                          spy={true}                          
                          smooth={true}
                          onClick={()=>setActiveLink(ind)}
                        > 
                          {item.title}
                        </Link>
                      </li>
                    ))} 
                </ul>	
              </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
};

export default UiDropDown;
