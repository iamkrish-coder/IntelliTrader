import React,{useState} from "react";
import {Link} from 'react-scroll';
import Highlight from 'react-highlight';

/// Bootstrap
import { Col, Badge, Card, Row, Tab, Nav } from "react-bootstrap";
//Import

const sidebarLink = [
  {to:'badges-size', title:'Badges Size'},
  {to:'badges-light', title:'Badges Light'},
  {to:'badges', title:'Badges'},
  {to:'pill-badge', title:'Pill Badge'},
  {to:'link-badge', title:'Link Badge'},
  {to:'rounded-badge', title:'Rounded Badge'},
  {to:'rounded-outline', title:'Rounded Outline Badge'},
  {to:'outline-circle', title:'Outline Circle Badge'},
  {to:'circle-badge', title:'Circle Badge'},
  {to:'circle-badge-default', title:'Circle Badge Default'},
  {to:'number-badge', title:'Number Badge'},
  {to:'badge-sizes', title:'Badge Sizes'},
];

const UiBadge = () => {
  const [activeLink ,setActiveLink] = useState(0);
  return (
    <div className="badge-demo">
     
      
      <div className="element-area">
					<div className="demo-view">
						<div className="container-fluid pt-0 ps-0 pe-lg-4 pe-0">
              <Row>
                <Col lg="12">
                    <Tab.Container defaultActiveKey="Preview"> 
                      <Card name="badges-size" className="dz-card">
                        <Card.Header className="d-flex justify-content-between flex-wrap border-0">
                          <div>
                            <Card.Title>Badges Size</Card.Title>
                            <Card.Text className="mb-0 subtitle">
                              Default Bootstrap Badges
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
                                <div className="bootstrap-badge">
                                  <Badge bg="" className='badge-primary light badge-xs'>Primary</Badge>                                  
                                  <Badge bg="" className='badge-primary light badge-sm'>Primary</Badge>
                                  <Badge bg="" className='badge-secondary light'>Secondary</Badge>
                                  <Badge bg="badge-lg " className='badge-danger light'>Danger</Badge>
                                  <Badge bg="badge-xl " className='badge-warning light'>Warning</Badge>
                                </div>
                              </Card.Body>
                            </Tab.Pane>
                            <Tab.Pane eventKey="Code">
                            <div className="card-body pt-0 p-0 code-area">
<Highlight>
  {`
  <div className="bootstrap-badge">
    <Badge bg="" className='badge-primary light badge-xs'>Primary</Badge>    
    <Badge bg="" className='badge-primary light badge-sm'>Primary</Badge>
    <Badge bg="" className='badge-secondary light'>Secondary</Badge>
    <Badge bg="badge-lg " className='badge-danger light'>Danger</Badge>
    <Badge bg="badge-xl " className='badge-warning light'>Warning</Badge>
  </div>
  `}
</Highlight>

</div>
                            </Tab.Pane>
                          </Tab.Content> 
                      </Card>
                    </Tab.Container>  
                </Col>
                <Col lg="12">
                  <Tab.Container defaultActiveKey="Preview"> 
                    <Card name="badges-light" className="dz-card">
                       <Card.Header className="d-flex justify-content-between flex-wrap border-0">
                          <div>
                            <Card.Title>Badges Light</Card.Title>
                            <Card.Text className="mb-0 subtitle">
                              Default Bootstrap Badges
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
                              <div className="bootstrap-badge">
                                <Badge bg="" className='badge-primary light'>Primary</Badge>
                                <Badge bg="" className='badge-secondary light'>Secondary</Badge>
                                <Badge bg="" className='badge-success light'>Success</Badge>
                                <Badge bg="" className='badge-danger light'>Danger</Badge>
                                <Badge bg="" className='badge-warning light'>Warning</Badge>
                                <Badge bg="" className='badge-info light'>Info</Badge>
                                <Badge bg="" className='badge-light light'>Light</Badge>
                                <Badge bg="" className='badge-dark light'>Dark</Badge>
                              </div>
                              <div className="bootstrap-badge">
                                <Badge bg="" className='badge-primary light'>1</Badge>
                                <Badge bg="" className='badge-secondary light'>2</Badge>
                                <Badge bg="" className='badge-success light'>3</Badge>
                                <Badge bg="" className='badge-danger light'>4</Badge>
                                <Badge bg="" className='badge-warning light'>5</Badge>
                                <Badge bg="" className='badge-info light'>6</Badge>
                                <Badge bg="" className='badge-light light'>7</Badge>
                                <Badge bg="" className='badge-dark light'>8</Badge>
                              </div>
                            </Card.Body>
                          </Tab.Pane>
                          <Tab.Pane eventKey="Code">
                          <div className="card-body pt-0 p-0 code-area">
<Highlight>
  {`
  <div className="bootstrap-badge">
    <Badge bg="" className='badge-primary light'>Primary</Badge>
    <Badge bg="" className='badge-secondary light'>Secondary</Badge>
    <Badge bg="" className='badge-success light'>Success</Badge>
    <Badge bg="" className='badge-danger light'>Danger</Badge>
    <Badge bg="" className='badge-warning light'>Warning</Badge>
    <Badge bg="" className='badge-info light'>Info</Badge>
    <Badge bg="" className='badge-light light'>Light</Badge>
    <Badge bg="" className='badge-dark light'>Dark</Badge>
  </div>
  <div className="bootstrap-badge">
    <Badge bg="" className='badge-primary light'>1</Badge>
    <Badge bg="" className='badge-secondary light'>2</Badge>
    <Badge bg="" className='badge-success light'>3</Badge>
    <Badge bg="" className='badge-danger light'>4</Badge>
    <Badge bg="" className='badge-warning light'>5</Badge>
    <Badge bg="" className='badge-info light'>6</Badge>
    <Badge bg="" className='badge-light light'>7</Badge>
    <Badge bg="" className='badge-dark light'>8</Badge>
  </div>
  `}
</Highlight>

</div>
                          </Tab.Pane>
                       </Tab.Content>   
                    </Card>
                  </Tab.Container>  
                </Col>
                <Col lg="12">
                  <Tab.Container defaultActiveKey="Preview"> 
                    <Card name="badges" className="dz-card">
                      <Card.Header className="d-flex justify-content-between flex-wrap border-0">
                        <div>
                          <Card.Title>Badges </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            Default Bootstrap Badges
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
                            <div className="bootstrap-badge">
                              <Badge bg="primary">Primary</Badge>
                              <Badge bg="secondary">Secondary</Badge>
                              <Badge bg="success">Success</Badge>
                              <Badge bg="danger">Danger</Badge>
                              <Badge bg="warning">Warning</Badge>
                              <Badge bg="info">Info</Badge>
                              <Badge bg="light" className="badge-light">Light</Badge>
                              <Badge bg="dark">Dark</Badge>
                            </div>
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
  {`
<div className="bootstrap-badge">
  <Badge bg="primary">Primary</Badge>
  <Badge bg="secondary">Secondary</Badge>
  <Badge bg="success">Success</Badge>
  <Badge bg="danger">Danger</Badge>
  <Badge bg="warning">Warning</Badge>
  <Badge bg="info">Info</Badge>
  <Badge bg="light">Light</Badge>
  <Badge bg="dark">Dark</Badge>
</div>
  `}
</Highlight>

</div>
                        </Tab.Pane>
                      </Tab.Content>  
                    </Card>
                   </Tab.Container> 
                </Col>
                <Col lg="12">
                  <Tab.Container defaultActiveKey="Preview"> 
                    <Card name="pill-badge" className="dz-card">
                      <Card.Header className="d-flex justify-content-between flex-wrap border-0">
                        <div>
                          <Card.Title>Pill Badge </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            add <code>.badge-pill</code> to change the style
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
                            <div className="bootstrap-badge">
                              <Badge pill  bg="primary">Pill badge</Badge>
                              <Badge pill  bg="secondary">Pill badge</Badge>
                              <Badge pill  bg="success">Pill badge</Badge>
                              <Badge pill  bg="danger">Pill badge</Badge>
                              <Badge pill  bg="warning">Pill badge</Badge>
                              <Badge pill  bg="info">Pill badge</Badge>
                              <Badge pill  bg="light" className="badge-light">Pill badge</Badge>
                              <Badge pill  bg="dark">Pill badge</Badge>
                            </div>
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
  {`
  <div className="bootstrap-badge">
    <Badge pill  bg="primary">Pill badge</Badge>
    <Badge pill  bg="secondary">Pill badge</Badge>
    <Badge pill  bg="success">Pill badge</Badge>
    <Badge pill  bg="danger">Pill badge</Badge>
    <Badge pill  bg="warning">Pill badge</Badge>
    <Badge pill  bg="info">Pill badge</Badge>
    <Badge pill  bg="light">Pill badge</Badge>
    <Badge pill  bg="dark">Pill badge</Badge>
  </div>
  `}
</Highlight>

</div>
                        </Tab.Pane>
                       </Tab.Content>  
                    </Card>
                  </Tab.Container>  
                </Col>

                  <Col lg="12">
                    <Tab.Container defaultActiveKey="Preview"> 
                      <Card name="link-badge" className="dz-card">
                          <Card.Header className="d-flex justify-content-between flex-wrap border-0">
                            <div>
                              <Card.Title>Link Badge </Card.Title>
                              <Card.Text className="mb-0 subtitle">
                                Link badge add in anchor tag
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
                                <div className="bootstrap-badge">
                                  <Badge as="a" href="" bg="primary">Links</Badge>
                                  <Badge as="a" href="" bg="secondary">Links</Badge>
                                  <Badge as="a" href="" bg="success">Links</Badge>
                                  <Badge as="a" href="" bg="danger">Links</Badge>
                                  <Badge as="a" href="" bg="warning">Links</Badge>
                                  <Badge as="a" href="" bg="info">Links</Badge>
                                  <Badge as="a" href="" bg="light" className="badge-light">Links</Badge>
                                  <Badge as="a" href="" bg="dark">Links</Badge>
                                </div>
                              </Card.Body>
                            </Tab.Pane> 
                            <Tab.Pane eventKey="Code">
                            <div className="card-body pt-0 p-0 code-area">
<Highlight>
  {`
  <div className="bootstrap-badge">
    <Badge as="a" href="" bg="primary">Links</Badge>
    <Badge as="a" href="" bg="secondary">Links</Badge>
    <Badge as="a" href="" bg="success">Links</Badge>
    <Badge as="a" href="" bg="danger">Links</Badge>
    <Badge as="a" href="" bg="warning">Links</Badge>
    <Badge as="a" href="" bg="info">Links</Badge>
    <Badge as="a" href="" bg="light">Links</Badge>
    <Badge as="a" href="" bg="dark">Links</Badge>
  </div>
  `}
</Highlight>

</div>
                            </Tab.Pane> 
                          </Tab.Content>  
                      </Card>
                    </Tab.Container>  
                  </Col>

                <Col lg="12">
                    <Tab.Container defaultActiveKey="Preview"> 
                      <Card name="rounded-badge" className="dz-card">
                        <Card.Header className="d-flex justify-content-between flex-wrap border-0">
                          <div>
                            <Card.Title>Rounded Badge </Card.Title>
                            <Card.Text className="mb-0 subtitle">
                              add <code>.badge-rounded</code> to change the style
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
                              <div className="bootstrap-badge">
                                <Badge as="a" href="" bg="primary badge-rounded">
                                  Rounded
                                </Badge>

                                <Badge as="a" href="" bg="secondary badge-rounded">
                                  Rounded
                                </Badge>

                                <Badge as="a" href="" bg="success badge-rounded">
                                  Rounded
                                </Badge>

                                <Badge as="a" href="" bg="danger badge-rounded">
                                  Rounded
                                </Badge>

                                <Badge as="a" href="" bg="warning badge-rounded">
                                  Rounded
                                </Badge>

                                <Badge as="a" href="" bg="info badge-rounded">
                                  Rounded
                                </Badge>

                                <Badge as="a" href="" bg="light badge-rounded" className="badge-light">
                                  Rounded
                                </Badge>

                                <Badge as="a" href="" bg="dark badge-rounded">
                                  Rounded
                                </Badge>
                              </div>
                            </Card.Body>
                          </Tab.Pane>  
                          <Tab.Pane eventKey="Code">  
                          <div className="card-body pt-0 p-0 code-area">
<Highlight>
  {`
  <div className="bootstrap-badge">
    <Badge as="a" href="" bg="primary badge-rounded">
      Rounded
    </Badge>

    <Badge as="a" href="" bg="secondary badge-rounded">
      Rounded
    </Badge>

    <Badge as="a" href="" bg="success badge-rounded">
      Rounded
    </Badge>

    <Badge as="a" href="" bg="danger badge-rounded">
      Rounded
    </Badge>

    <Badge as="a" href="" bg="warning badge-rounded">
      Rounded
    </Badge>

    <Badge as="a" href="" bg="info badge-rounded">
      Rounded
    </Badge>

    <Badge as="a" href="" bg="light badge-rounded">
      Rounded
    </Badge>

    <Badge as="a" href="" bg="dark badge-rounded">
      Rounded
    </Badge>
  </div>
  `}
</Highlight>

</div>
                          </Tab.Pane>  
                        </Tab.Content>  
                      </Card>
                    </Tab.Container>  
                </Col>

                <Col lg="12">
                  <Tab.Container defaultActiveKey="Preview"> 
                    <Card name="rounded-outline" className="dz-card">
                      <Card.Header className="d-flex justify-content-between flex-wrap border-0">
                          <div>  
                            <Card.Title>Rounded Outline Badge </Card.Title>
                            <Card.Text className="mb-0 subtitle">
                              add <code>.badge-rounded</code> to change the style
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
                            <div className="bootstrap-badge">
                              <Badge as="a" href="" bg="badge-rounded" className='badge-outline-primary'>
                                Rounded
                              </Badge>

                              <Badge as="a" href="" bg=" badge-rounded" className='badge-outline-secondary'>
                                Rounded
                              </Badge>

                              <Badge as="a" href="" bg=" badge-rounded" className='badge-outline-success'>
                                Rounded
                              </Badge>

                              <Badge as="a" href="" bg=" badge-rounded" className='badge-outline-danger'>
                                Rounded
                              </Badge>

                              <Badge as="a" href="" bg=" badge-rounded" className='badge-outline-warning'>
                                Rounded
                              </Badge>

                              <Badge as="a" href="" bg=" badge-rounded" className='badge-outline-info'>
                                Rounded
                              </Badge>

                              <Badge as="a" href="" bg=" badge-rounded" className='badge-outline-light'>
                                Rounded
                              </Badge>

                              <Badge as="a" href="" bg="badge-rounded" className='badge-outline-dark'>
                                Rounded
                              </Badge>
                            </div>
                          </Card.Body>
                        </Tab.Pane> 
                        <Tab.Pane eventKey="Code"> 
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
  {`
  <div className="bootstrap-badge">
    <Badge as="a" href="" bg="badge-rounded" className='badge-outline-primary'>
      Rounded
    </Badge>

    <Badge as="a" href="" bg=" badge-rounded" className='badge-outline-secondary'>
      Rounded
    </Badge>

    <Badge as="a" href="" bg=" badge-rounded" className='badge-outline-success'>
      Rounded
    </Badge>

    <Badge as="a" href="" bg=" badge-rounded" className='badge-outline-danger'>
      Rounded
    </Badge>

    <Badge as="a" href="" bg=" badge-rounded" className='badge-outline-warning'>
      Rounded
    </Badge>

    <Badge as="a" href="" bg=" badge-rounded" className='badge-outline-info'>
      Rounded
    </Badge>

    <Badge as="a" href="" bg=" badge-rounded" className='badge-outline-light'>
      Rounded
    </Badge>

    <Badge as="a" href="" bg="badge-rounded" className='badge-outline-dark'>
      Rounded
    </Badge>
  </div>
  `}
</Highlight>

</div>
                        </Tab.Pane> 

                      </Tab.Content>  
                    </Card>
                  </Tab.Container>  
                </Col>

                <Col lg="12">
                  <Tab.Container defaultActiveKey="Preview"> 
                    <Card name="outline-circle" className="dz-card">
                      <Card.Header className="d-flex justify-content-between flex-wrap border-0">
                        <div>  
                          <Card.Title>Outline Circle Badge </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            add <code>.badge-circle</code> to change the style
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
                            <div className="bootstrap-badge">
                              <Badge as="a" href="" bg=" badge-circle" className='badge-outline-primary'>
                                1
                              </Badge>

                              <Badge as="a" href="" bg=" badge-circle" className='badge-outline-secondary'>
                                2
                              </Badge>

                              <Badge as="a" href="" bg=" badge-circle" className='badge-outline-success'>
                                3
                              </Badge>

                              <Badge as="a" href="" bg=" badge-circle" className='badge-outline-danger'>
                                4
                              </Badge>

                              <Badge as="a" href="" bg=" badge-circle" className='badge-outline-warning'>
                                5
                              </Badge>

                              <Badge as="a" href="" bg=" badge-circle" className='badge-outline-info'>
                                6
                              </Badge>

                              <Badge as="a" href="" bg=" badge-circle" className='badge-outline-light'>
                                7
                              </Badge>

                              <Badge as="a" href="" bg=" badge-circle" className='badge-outline-dark'>
                                8
                              </Badge>
                            </div>
                          </Card.Body>
                        </Tab.Pane>  
                        <Tab.Pane eventKey="Code">  
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
  {`
  <div className="bootstrap-badge">
    <Badge as="a" href="" bg=" badge-circle" className='badge-outline-primary'>
      1
    </Badge>

    <Badge as="a" href="" bg=" badge-circle" className='badge-outline-secondary'>
      2
    </Badge>

    <Badge as="a" href="" bg=" badge-circle" className='badge-outline-success'>
      3
    </Badge>

    <Badge as="a" href="" bg=" badge-circle" className='badge-outline-danger'>
      4
    </Badge>

    <Badge as="a" href="" bg=" badge-circle" className='badge-outline-warning'>
      5
    </Badge>

    <Badge as="a" href="" bg=" badge-circle" className='badge-outline-info'>
      6
    </Badge>

    <Badge as="a" href="" bg=" badge-circle" className='badge-outline-light'>
      7
    </Badge>

    <Badge as="a" href="" bg=" badge-circle" className='badge-outline-dark'>
      8
    </Badge>
  </div>
  `}
</Highlight>

</div>
                        </Tab.Pane>  
                      </Tab.Content>  
                    </Card>
                  </Tab.Container>  
                </Col>

                <Col lg="12">
                  <Tab.Container defaultActiveKey="Preview"> 
                    <Card name="circle-badge" className="dz-card">
                      <Card.Header className="d-flex justify-content-between flex-wrap border-0">
                        <div> 
                          <Card.Title>Circle Badge </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            add <code>.badge-circle</code> to change the style
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
                            <div className="bootstrap-badge">
                              <Badge as="a" href="" bg="primary badge-circle">
                                1
                              </Badge>

                              <Badge as="a" href="" bg="secondary badge-circle">
                                2
                              </Badge>

                              <Badge as="a" href="" bg="success badge-circle">
                                3
                              </Badge>

                              <Badge as="a" href="" bg="danger badge-circle">
                                4
                              </Badge>

                              <Badge as="a" href="" bg="warning badge-circle">
                                5
                              </Badge>

                              <Badge as="a" href="" bg="info badge-circle">
                                6
                              </Badge>

                              <Badge as="a" href="" bg="light badge-circle">
                                7
                              </Badge>

                              <Badge as="a" href="" bg="dark badge-circle">
                                8
                              </Badge>
                            </div>
                        </Card.Body>
                        </Tab.Pane>  
                        <Tab.Pane eventKey="Code">  
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
  {`
  <div className="bootstrap-badge">
    <Badge as="a" href="" bg="primary badge-circle">
      1
    </Badge>

    <Badge as="a" href="" bg="secondary badge-circle">
      2
    </Badge>

    <Badge as="a" href="" bg="success badge-circle">
      3
    </Badge>

    <Badge as="a" href="" bg="danger badge-circle">
      4
    </Badge>

    <Badge as="a" href="" bg="warning badge-circle">
      5
    </Badge>

    <Badge as="a" href="" bg="info badge-circle">
      6
    </Badge>

    <Badge as="a" href="" bg="light badge-circle">
      7
    </Badge>

    <Badge as="a" href="" bg="dark badge-circle">
      8
    </Badge>
  </div>
  `}
</Highlight>

</div>
                        </Tab.Pane>  
                      </Tab.Content>  
                    </Card>
                  </Tab.Container>  
                </Col>

                <Col lg="12">
                  <Tab.Container defaultActiveKey="Preview">   
                    <Card name="circle-badge-default" className="dz-card">
                      <Card.Header className="d-flex justify-content-between flex-wrap border-0">
                        <div> 
                          <Card.Title>Outline Badge </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            Default bootstrap outline baadge
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
                            <div className="bootstrap-badge">
                              <Badge as="a" href="" bg="" className='badge-outline-primary'>
                                1
                              </Badge>

                              <Badge as="a" href="" bg="" className='badge-outline-secondary'>
                                2
                              </Badge>

                              <Badge as="a" href="" bg="" className='badge-outline-success'>
                                3
                              </Badge>

                              <Badge as="a" href="" bg="" className='badge-outline-danger'>
                                4
                              </Badge>

                              <Badge as="a" href="" bg="" className='badge-outline-warning'>
                                5
                              </Badge>

                              <Badge as="a" href="" bg="" className='badge-outline-info'>
                                6
                              </Badge>

                              <Badge as="a" href="" bg="" className='badge-outline-light'>
                                7
                              </Badge>

                              <Badge as="a" href="" bg="" className='badge-outline-dark'>
                                8
                              </Badge>
                            </div>
                          </Card.Body>
                        </Tab.Pane> 
                        <Tab.Pane eventKey="Code"> 
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
  {`
  <div className="bootstrap-badge">
    <Badge as="a" href="" bg="" className='badge-outline-primary'>
      1
    </Badge>

    <Badge as="a" href="" bg="" className='badge-outline-secondary'>
      2
    </Badge>

    <Badge as="a" href="" bg="" className='badge-outline-success'>
      3
    </Badge>

    <Badge as="a" href="" bg="" className='badge-outline-danger'>
      4
    </Badge>

    <Badge as="a" href="" bg="" className='badge-outline-warning'>
      5
    </Badge>

    <Badge as="a" href="" bg="" className='badge-outline-info'>
      6
    </Badge>

    <Badge as="a" href="" bg="" className='badge-outline-light'>
      7
    </Badge>

    <Badge as="a" href="" bg="" className='badge-outline-dark'>
      8
    </Badge>
  </div>
  `}
</Highlight>

</div>
                        </Tab.Pane> 
                        
                      </Tab.Content>  
                    </Card>
                  </Tab.Container>  
                </Col>

                <Col lg="12">
                  <Tab.Container defaultActiveKey="Preview"> 
                    <Card name="number-badge" className="dz-card">
                      <Card.Header className="d-flex justify-content-between flex-wrap border-0">
                        <div> 
                          <Card.Title>Number Badge </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            Default bootstrap outline baadge
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
                            <div className="bootstrap-badge">
                              <Badge as="a" href="" bg="primary">
                                1
                              </Badge>

                              <Badge as="a" href="" bg="secondary">
                                2
                              </Badge>

                              <Badge as="a" href="" bg="success">
                                3
                              </Badge>

                              <Badge as="a" href="" bg="danger">
                                4
                              </Badge>

                              <Badge as="a" href="" bg="warning">
                                5
                              </Badge>

                              <Badge as="a" href="" bg="info">
                                6
                              </Badge>

                              <Badge as="a" href="" bg="light" className="badge-light">
                                7
                              </Badge>

                              <Badge as="a" href="" bg="dark">
                                8
                              </Badge>
                            </div>
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
  {`
  <div className="bootstrap-badge">
    <Badge as="a" href="" bg="primary">
      1
    </Badge>

    <Badge as="a" href="" bg="secondary">
      2
    </Badge>

    <Badge as="a" href="" bg="success">
      3
    </Badge>

    <Badge as="a" href="" bg="danger">
      4
    </Badge>

    <Badge as="a" href="" bg="warning">
      5
    </Badge>

    <Badge as="a" href="" bg="info">
      6
    </Badge>

    <Badge as="a" href="" bg="light">
      7
    </Badge>

    <Badge as="a" href="" bg="dark">
      8
    </Badge>
  </div>
  `}
</Highlight>

</div>
                        </Tab.Pane>
                      </Tab.Content>    
                    </Card>
                  </Tab.Container>  
                </Col>

                <Col lg="12">
                  <Tab.Container defaultActiveKey="Preview"> 
                    <Card name="badge-sizes" className="dz-card">
                      <Card.Header className="d-flex justify-content-between flex-wrap border-0">
                        <div>  
                          <Card.Title>Badge Sizes </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            add{" "}
                            <code>.badge-xs .badge-sm .badge-md .badge-lg .badge-xl</code>{" "}
                            to change the style
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
                            <div className="bootstrap-badge">
                              <Badge as="a" href="" bg="primary badge-xs">
                                xs
                              </Badge>

                              <Badge as="a" href="" bg="secondary badge-sm">
                                sm
                              </Badge>

                              <Badge as="a" href="" bg="success badge-md">
                                md
                              </Badge>

                              <Badge as="a" href="" bg="danger badge-lg">
                                lg
                              </Badge>

                              <Badge as="a" href="" bg="warning badge-xl">
                                xl
                              </Badge>
                            </div>
                          </Card.Body>
                        </Tab.Pane>  
                        <Tab.Pane eventKey="Code">  
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
  {`
  <div className="bootstrap-badge">
    <Badge as="a" href="" bg="primary badge-xs">
      xs
    </Badge>

    <Badge as="a" href="" bg="secondary badge-sm">
      sm
    </Badge>

    <Badge as="a" href="" bg="success badge-md">
      md
    </Badge>

    <Badge as="a" href="" bg="danger badge-lg">
      lg
    </Badge>

    <Badge as="a" href="" bg="warning badge-xl">
      xl
    </Badge>
  </div>
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
                <h4 className="title">Badge</h4>
                <div className="dz-scroll demo-right-tabs">
                  <ul className="navbar-nav" id="menu-bar">
                    {sidebarLink.map((item, ind)=>(
                      <li key={ind} className={`${ind === activeLink ? 'active' :  ''}`}>
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
    </div>
  );
};

export default UiBadge;
