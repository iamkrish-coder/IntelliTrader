import React, { Fragment, useState } from "react";
import { Link } from "react-scroll";
import Highlight from 'react-highlight';
import { Row, Col, Card, Accordion, Tab, Nav } from "react-bootstrap";


const UiAccordion = () => {
	const defaultAccordion = [
      {
        title: "Accordion Header One",
        text: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",
        bg: "primary",      
      },
      {
        title: "Accordion Header Two",
        text:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",
        bg: "info",
      
      },
      {
        title:"Accordion Header Three",
        text:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",
        bg: "success",      
      },
  ];
  
  const sidebarData = [
    {title: 'Default Accordion', to:'accordion-one', select:''},
    {title: 'Accordion Bordered', to:'accordion-two', select:''},
    {title: 'Accordion without space', to:'accordion-three', select:''},
    {title: 'Accordion without space with border', to:'accordion-four', select:''},
    {title: 'Accordion indicator in left position', to:'accordion-five', select:''},
    {title: 'Accordion with icon', to:'accordion-six', select:''},
    {title: 'Accordion header background', to:'accordion-seven', select:''},
    {title: 'Accordion solid background', to:'accordion-eight', select:''},
    {title: 'Accordion active background', to:'accordion-nine', select:''},
    {title: 'Accordion header shadow', to:'accordion-ten', select:''},
    {title: 'Accordion Rounded Stylish', to:'accordion-eleven', select:''},
    {title: 'Accordion Gradient', to:'accordion-twelve', select:''},
    
  ];
  const [activeLink ,setActiveLink] = useState(0);
  return (
    <Fragment>        
          
          <div className="element-area">
					  <div className="demo-view">
						  <div className="container-fluid pt-0 ps-0 pe-lg-4 pe-0">
                <Row>
                  <Col xl="12">
                      <Card name="accordion-one" className="dz-card">
                          <Tab.Container defaultActiveKey="Preview">
                            <Card.Header className="card-header flex-wrap  border-0 border-0">
                                <div>
                                  <Card.Title>Default Accordion</Card.Title>
                                  <Card.Text className="m-0 subtitle">
                                    Default accordion. Add <code>accordion</code> class in root
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
                            <Tab.Content className="tab-content" id="myTabContent">
                              <Tab.Pane eventKey="Preview">
                                <Card.Body className="card-body">               
                                    <Accordion className="accordion accordion-primary" defaultActiveKey="0">
                                      {defaultAccordion.map((d, i) => (
                                          <Accordion.Item className="accordion-item" key={i} eventKey={`${i}`}>
                                            <Accordion.Header className="accordion-header rounded-lg">
                                              {d.title}
                                            </Accordion.Header>
                                            <Accordion.Collapse eventKey={`${i}`}>
                                              <div className="accordion-body">{d.text}</div>
                                            </Accordion.Collapse>
                                          </Accordion.Item>
                                      ))}
                                    </Accordion>				
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="Code">
                              <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`const defaultAccordion = [
  {
    title: "Accordion Header One",
    text: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 
       3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",
    bg: "primary",      
  },
  {
    title: "Accordion Header Two",
    text:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 
      3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",
    bg: "info",
  
  },
  {
    title:"Accordion Header Three",
    text:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 
      3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.",
    bg: "success",      
  },
];

<Accordion className="accordion accordion-primary" defaultActiveKey="0">
  {defaultAccordion.map((d, i) => (
      <Accordion.Item className="accordion-item" key={i} eventKey={\`$/{i}\`}>
        <Accordion.Header className="accordion-header rounded-lg">
          {d.title}
        </Accordion.Header>
        <Accordion.Collapse eventKey={\`$\{i}\`}>
          <div className="accordion-body">{d.text}</div>
        </Accordion.Collapse>
      </Accordion.Item>
  ))}
  </Accordion>
`}
</Highlight>
</div>
                              </Tab.Pane>
                            </Tab.Content>    
                          </Tab.Container>  
                      </Card>
                  </Col>
                  <Col xl="12">
                      <Card name="accordion-two" className="dz-card">
                          <Tab.Container defaultActiveKey="Preview">
                            <Card.Header className="card-header flex-wrap  border-0">
                                <div>
                                  <Card.Title>Accordion bordered</Card.Title>
                                  <Card.Text className="m-0 subtitle">
                                    Accordion with border. Add class <code>accordion-bordered</code>{" "}
                                    with the class <code> accordion</code>
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
                            <Tab.Content className="tab-content" id="myTabContent">
                              <Tab.Pane eventKey="Preview">
                                <Card.Body className="card-body">               
                                  <Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
                                    {defaultAccordion.map((data, i) => (
                                      <Accordion.Item  key={i} eventKey={`${i}`}>
                                        <Accordion.Header className="accordion-header">
                                          {" "}
                                            {data.title}                      
                                        </Accordion.Header>
                                        <Accordion.Collapse eventKey={`${i}`} className="accordion__body">
                                          <div className="accordion-body">{data.text}</div>
                                        </Accordion.Collapse>
                                      </Accordion.Item >
                                    ))}
                                  </Accordion>				
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="Code">
                              <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Accordion className="accordion accordion-danger-solid" defaultActiveKey="0">
  {defaultAccordion.map((data, i) => (
    <Accordion.Item  key={i} eventKey={\`$\{i}\`}>
      <Accordion.Header className="accordion-header">
        {" "}
          {data.title}                      
      </Accordion.Header>
      <Accordion.Collapse eventKey={\`$\{i}\`} className="accordion__body">
        <div className="accordion-body">{data.text}</div>
      </Accordion.Collapse>
    </Accordion.Item >
  ))}
</Accordion>
`}
</Highlight>
</div>
                              </Tab.Pane>
                            </Tab.Content>    
                          </Tab.Container>  
                      </Card>
                  </Col>   
                  <Col xl="12">
                      <Card name="accordion-three" className="dz-card">
                          <Tab.Container defaultActiveKey="Preview">
                            <Card.Header className="card-header flex-wrap  border-0">
                                <div>
                                  <Card.Title>Accordion Without Space</Card.Title>
                                  <Card.Text className="m-0 subtitle">
                                    Add <code>accordion-no-gutter</code> class
                                    with <code>accordion</code>
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
                            <Tab.Content className="tab-content" id="myTabContent">
                              <Tab.Pane eventKey="Preview">
                                <Card.Body className="card-body">               
                                  <Accordion className="accordion accordion-no-gutter accordion-header-bg" defaultActiveKey="0">
                                    {defaultAccordion.map((d, i) => (
                                      <Accordion.Item  key={i} eventKey={`${i}`}>
                                        <Accordion.Header  className="accordion-header">
                                            {d.title}                     
                                        </Accordion.Header>
                                        <Accordion.Collapse eventKey={`${i}`}>
                                            <div className="accordion-body">{d.text}</div>
                                        </Accordion.Collapse>
                                      </Accordion.Item>
                                    ))}
                                  </Accordion>		
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="Code">
                              <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Accordion className="accordion accordion-no-gutter accordion-header-bg" defaultActiveKey="0">
  {defaultAccordion.map((d, i) => (
    <Accordion.Item  key={i} eventKey={\`$\{i}\`}>
      <Accordion.Header  className="accordion-header">
          {d.title}                     
      </Accordion.Header>
      <Accordion.Collapse eventKey={\`$\{i}\`}>
          <div className="accordion-body">{d.text}</div>
      </Accordion.Collapse>
    </Accordion.Item>
  ))}
</Accordion>		
`}
</Highlight>
</div>
                              </Tab.Pane>
                            </Tab.Content>    
                          </Tab.Container>  
                      </Card>
                  </Col>

                  <Col xl="12">
                      <Card name="accordion-four" className="dz-card">
                          <Tab.Container defaultActiveKey="Preview">
                            <Card.Header className="card-header flex-wrap  border-0">
                                <div>
                                    <Card.Title>Accordion Without Space With Border</Card.Title>
                                    <Card.Text className="m-0 subtitle">
                                      Add <code>accordion-no-gutter accordion-bordered</code> class
                                      with <code>accordion</code>
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
                            <Tab.Content className="tab-content" id="myTabContent">
                              <Tab.Pane eventKey="Preview">
                                <Card.Body className="card-body">               
                                  <Accordion className="accordion accordion-no-gutter " defaultActiveKey="0">
                                    {defaultAccordion.map((d, i) => (
                                      <Accordion.Item  key={i}  eventKey={`${i}`}>
                                        <Accordion.Header as='div'>
                                            {d.title}
                                        </Accordion.Header>
                                        <Accordion.Collapse eventKey={`${i}`}>
                                            <div className="accordion-body">{d.text}</div>
                                        </Accordion.Collapse>
                                      </Accordion.Item >
                                    ))}
                                  </Accordion>		
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="Code">
                              <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Accordion className="accordion accordion-no-gutter " defaultActiveKey="0">
 {defaultAccordion.map((d, i) => (
   <Accordion.Item  key={i}  eventKey={\`$\{i}\`}>
     <Accordion.Header as='div'>
         {d.title}
     </Accordion.Header>
     <Accordion.Collapse eventKey={\`$\{i}\`}>
         <div className="accordion-body">{d.text}</div>
     </Accordion.Collapse>
   </Accordion.Item >
 ))}
</Accordion>	
`}
</Highlight>
</div>
                              </Tab.Pane>
                            </Tab.Content>    
                          </Tab.Container>  
                      </Card>
                  </Col>

                  <Col xl="12">
                      <Card name="accordion-five" className="dz-card">
                          <Tab.Container defaultActiveKey="Preview">
                            <Card.Header className="card-header flex-wrap  border-0">
                                <div>
                                    <Card.Title>Accordion Indicator In Left Position</Card.Title>
                                    <Card.Text className="m-0 subtitle">
                                      Add <code>accordion-left-indicator</code> class with{" "}
                                      <code>accordion</code>
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
                            <Tab.Content className="tab-content" id="myTabContent">
                              <Tab.Pane eventKey="Preview">
                                <Card.Body className="card-body">               
                                  <Accordion className="accordion accordion-left-indicator" defaultActiveKey="0">
                                    {defaultAccordion.map((d, i) => (
                                      <Accordion.Item key={i} eventKey={`${i}`}>
                                        <Accordion.Header  className="accordion-header">
                                            {d.title}
                                        </Accordion.Header>
                                        <Accordion.Collapse eventKey={`${i}`}>
                                            <div className="accordion-body">{d.text}</div>
                                        </Accordion.Collapse>
                                      </Accordion.Item>
                                    ))}
                                  </Accordion>	
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="Code">
                              <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Accordion className="accordion accordion-left-indicator" defaultActiveKey="0">
  {defaultAccordion.map((d, i) => (
    <Accordion.Item key={i} eventKey={\`$\{i}\`}>
      <Accordion.Header  className="accordion-header">
          {d.title}
      </Accordion.Header>
      <Accordion.Collapse eventKey={\`$\{i}\`}>
          <div className="accordion-body">{d.text}</div>
      </Accordion.Collapse>
    </Accordion.Item>
  ))}
</Accordion>
`}
</Highlight>
</div>
                              </Tab.Pane>
                            </Tab.Content>    
                          </Tab.Container>  
                      </Card>
                  </Col>

                  <Col xl="12">
                      <Card name="accordion-six" className="dz-card">
                          <Tab.Container defaultActiveKey="Preview" >
                            <Card.Header className="card-header flex-wrap  border-0">
                                <div>
                                    <Card.Title>Accordion With Icon</Card.Title>
                                    <Card.Text className="m-0 subtitle">
                                        Add <code>accordion-with-icon</code> class with{" "}
                                        <code>accordion</code>
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
                            <Tab.Content className="tab-content" id="myTabContent">
                              <Tab.Pane eventKey="Preview">
                                <Card.Body className="card-body">               
                                  <Accordion className="accordion accordion-with-icon" defaultActiveKey="0">
                                    {defaultAccordion.map((d, i) => (
                                      <Accordion.Item key={i}  eventKey={`${i}`}>
                                        <Accordion.Header className="accordion-header">
                                          <span className="accordion-header-icon"></span>
                                          <span className="accordion-header-text">{d.title}</span>
                                          <span className="accordion-header-indicator indicator-bordered"></span>
                                        </Accordion.Header>
                                        <Accordion.Collapse eventKey={`${i}`}>
                                          <div className="accordion-body">{d.text}</div>
                                        </Accordion.Collapse>
                                      </Accordion.Item>
                                    ))}
                                  </Accordion>
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="Code">
                              <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Accordion className="accordion accordion-with-icon" defaultActiveKey="0">
  {defaultAccordion.map((d, i) => (
    <Accordion.Item key={i}  eventKey={\`$\{i}\`}>
      <Accordion.Header className="accordion-header">
        <span className="accordion-header-icon"></span>
        <span className="accordion-header-text">{d.title}</span>
        <span className="accordion-header-indicator indicator-bordered"></span>
      </Accordion.Header>
      <Accordion.Collapse eventKey={\`$\{i}\`}>
        <div className="accordion-body">{d.text}</div>
      </Accordion.Collapse>
    </Accordion.Item>
  ))}
</Accordion>
`}
</Highlight>
</div>
                              </Tab.Pane>
                            </Tab.Content>    
                          </Tab.Container>  
                      </Card>
                  </Col>
                  <Col xl="12">
                      <Card name="accordion-seven" className="dz-card">
                          <Tab.Container defaultActiveKey="Preview">
                            <Card.Header className="card-header flex-wrap  border-0">
                                <div>
                                    <Card.Title>Accordion Header Background</Card.Title>
                                    <Card.Text className="m-0 subtitle">
                                      Add <code>accordion-header-bg</code> class with{" "}
                                      <code>accordion</code>
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
                            <Tab.Content className="tab-content" id="myTabContent">
                              <Tab.Pane eventKey="Preview">
                                <Card.Body className="card-body">               
                                  <Accordion
                                    className="accordion accordion-header-bg box-shadow-none"
                                    defaultActiveKey="0"
                                  >
                                    {defaultAccordion.map((d, i) => (
                                      <Accordion.Item  key={i}  eventKey={`${i}`}>
                                        <Accordion.Header  className={`accordion-header accordion-header-${d.bg}`}>
                                          
                                          <span className="accordion-header-text">{d.title}</span>
                                          
                                        </Accordion.Header>
                                        <Accordion.Collapse eventKey={`${i}`} >
                                          <div className="accordion-body">{d.text}</div>
                                        </Accordion.Collapse>
                                      </Accordion.Item>
                                    ))}
                                  </Accordion>
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="Code">
                              <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Accordion
  className="accordion accordion-header-bg "
  defaultActiveKey="0"
  >
  {defaultAccordion.map((d, i) => (
    <Accordion.Item  key={i}  eventKey={\`$\{i}\`}>
      <Accordion.Header  className={\`accordion-header accordion-header-$\{d.bg}\`}>
        
        <span className="accordion-header-text">{d.title}</span>
        
      </Accordion.Header>
      <Accordion.Collapse eventKey={\`$\{i}\`} >
        <div className="accordion-body">{d.text}</div>
      </Accordion.Collapse>
    </Accordion.Item>
  ))}
  </Accordion>
`}
</Highlight>
</div>
                              </Tab.Pane>
                            </Tab.Content>    
                          </Tab.Container>  
                      </Card>
                  </Col>   

                  <Col xl="12">
                      <Card name="accordion-eight" className="dz-card">
                          <Tab.Container defaultActiveKey="Preview">
                            <Card.Header className="card-header flex-wrap  border-0">
                                <div>
                                    <Card.Title>Accordion Solid Background</Card.Title>
                                    <Card.Text className="m-0 subtitle">
                                      Add <code>accordion-solid-bg</code> class with{" "}
                                      <code>accordion</code>
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
                            <Tab.Content className="tab-content" id="myTabContent">
                              <Tab.Pane eventKey="Preview">
                                <Card.Body className="card-body">               
                                  <Accordion className="accordion accordion-solid-bg" defaultActiveKey="0">
                                    {defaultAccordion.map((d, i) => (
                                      <Accordion.Item  key={i} eventKey={`${i}`}>
                                        <Accordion.Header  className="accordion-header  accordion-header-primary">
                                          <span className="accordion-header-text">{d.title}</span>
                                        </Accordion.Header>
                                        <Accordion.Collapse eventKey={`${i}`} className="accordion__body">
                                          <div className="accordion-body">{d.text}</div>
                                        </Accordion.Collapse>
                                      </Accordion.Item >
                                    ))}
                                  </Accordion>
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="Code">
                              <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Accordion className="accordion accordion-solid-bg" defaultActiveKey="0">
  {defaultAccordion.map((d, i) => (
    <Accordion.Item  key={i} eventKey={\`$\{i}\`}>
      <Accordion.Header  className="accordion-header  accordion-header-primary">
        <span className="accordion-header-text">{d.title}</span>
      </Accordion.Header>
      <Accordion.Collapse eventKey={\`$\{i}\`} className="accordion__body">
        <div className="accordion-body">{d.text}</div>
      </Accordion.Collapse>
    </Accordion.Item >
  ))}
</Accordion>
`}
</Highlight>
</div>
                              </Tab.Pane>
                            </Tab.Content>    
                          </Tab.Container>  
                      </Card>
                  </Col>                      
                  <Col xl="12">
                      <Card name="accordion-nine" className="dz-card">
                          <Tab.Container defaultActiveKey="Preview">
                            <Card.Header className="card-header flex-wrap  border-0">
                                <div>
                                    <Card.Title>Accordion Active Background</Card.Title>
                                    <Card.Text className="m-0 subtitle">
                                      Add <code>accordion-active-header</code> class with{" "}
                                      <code>accordion</code>
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
                            <Tab.Content className="tab-content" id="myTabContent">
                              <Tab.Pane eventKey="Preview">
                                <Card.Body className="card-body">               
                                    <Accordion className="accordion accordion-active-header" defaultActiveKey="0">
                                      {defaultAccordion.map((d, i) => (
                                        <Accordion.Item className="accordion-item" key={i} eventKey={`${i}`}>
                                          <Accordion.Header className="accordion-header accordion-header-primary">
                                           
                                            <span className="accordion-header-text">{d.title}</span>
                                          </Accordion.Header>
                                          <Accordion.Collapse eventKey={`${i}`} className="accordion__body">
                                            <div className="accordion-body">{d.text}</div>
                                          </Accordion.Collapse>
                                        </Accordion.Item>
                                      ))}
                                    </Accordion>
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="Code">
                              <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Accordion className="accordion accordion-active-header" defaultActiveKey="0">
  {defaultAccordion.map((d, i) => (
    <Accordion.Item className="accordion-item" key={i} eventKey={\`$\{i}\`}>
      <Accordion.Header className="accordion-header accordion-header-primary">
      
        <span className="accordion-header-text">{d.title}</span>
      </Accordion.Header>
      <Accordion.Collapse eventKey={\`$\{i}\`} className="accordion__body">
        <div className="accordion-body">{d.text}</div>
      </Accordion.Collapse>
    </Accordion.Item>
  ))}
  </Accordion>
`}
</Highlight>
</div>
                              </Tab.Pane>
                            </Tab.Content>    
                          </Tab.Container>  
                      </Card>
                  </Col>                    

                  <Col xl="12">
                      <Card name="accordion-ten" className="dz-card">
                          <Tab.Container defaultActiveKey="Preview">
                            <Card.Header className="card-header flex-wrap  border-0">
                                <div>
                                  <Card.Title>Accordion header shadow</Card.Title>
                                  <Card.Text className="m-0 subtitle">
                                    Add <code>accordion-header-shadow</code> and{" "}
                                    <code>accordion-rounded</code> class with <code>accordion</code>
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
                            <Tab.Content className="tab-content" id="myTabContent">
                              <Tab.Pane eventKey="Preview">
                                <Card.Body className="card-body">               
                                  <Accordion className="accordion accordion-header-shadow accordion-rounded" defaultActiveKey="0">
                                    {defaultAccordion.map((d, i) => (
                                      <Accordion.Item className="accordion-item" key={i} eventKey={`${i}`}>
                                        <Accordion.Header  className="accordion-header-primary">
                                          <span className="accordion-header-text">{d.title}</span>
                                        </Accordion.Header>
                                        <Accordion.Collapse eventKey={`${i}`} className="accordion__body">
                                            <div className="accordion-body">{d.text}</div>
                                        </Accordion.Collapse>
                                      </Accordion.Item>
                                    ))}
                                  </Accordion>	
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="Code">
                              <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Accordion className="accordion accordion-header-shadow accordion-rounded" defaultActiveKey="0">
  {defaultAccordion.map((d, i) => (
    <Accordion.Item className="accordion-item" key={i} eventKey={\`$\{i}\`}>
      <Accordion.Header  className="accordion-header-primary">
        <span className="accordion-header-text">{d.title}</span>
      </Accordion.Header>
      <Accordion.Collapse eventKey={\`$\{i}\`} className="accordion__body">
          <div className="accordion-body">{d.text}</div>
      </Accordion.Collapse>
    </Accordion.Item>
  ))}
</Accordion>	
`}
</Highlight>
</div>
                              </Tab.Pane>
                            </Tab.Content>    
                          </Tab.Container>  
                      </Card>
                  </Col>

                  <Col xl="12">
                      <Card name="accordion-eleven" className="dz-card">
                          <Tab.Container defaultActiveKey="Preview">
                            <Card.Header className="card-header flex-wrap  border-0">
                                <div>
                                    <Card.Title>Accordion Rounded Stylish</Card.Title>
                                    <Card.Text className="m-0 subtitle">
                                      Add <code>accordion-rounded-stylish</code> class with{" "}
                                      <code>accordion</code>
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
                            <Tab.Content className="tab-content" id="myTabContent">
                              <Tab.Pane eventKey="Preview">
                                <Card.Body className="card-body">               
                                  <Accordion className="accordion accordion-rounded-stylish accordion-bordered" defaultActiveKey="0">
                                    {defaultAccordion.map((d, i) => (
                                      <Accordion.Item  key={i}  eventKey={`${i}`}>
                                          <Accordion.Header className="rounded-lg">
                                            {d.title}
                                            <span className="accordion-header-indicator "></span>					             
                                          </Accordion.Header>
                                          <Accordion.Collapse eventKey={`${i}`} className="accordion__body">
                                            <div className="accordion-body">{d.text}</div>
                                          </Accordion.Collapse>
                                      </Accordion.Item>
                                    ))}
                                  </Accordion>	
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="Code">
                              <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Accordion className="accordion accordion-rounded-stylish accordion-bordered" defaultActiveKey="0">
 {defaultAccordion.map((d, i) => (
   <Accordion.Item  key={i}  eventKey={\`$\{i}\`}>
       <Accordion.Header className="rounded-lg">
         {d.title}
         <span className="accordion-header-indicator "></span>					             
       </Accordion.Header>
       <Accordion.Collapse eventKey={\`$\{i}\`} className="accordion__body">
         <div className="accordion-body">{d.text}</div>
       </Accordion.Collapse>
   </Accordion.Item>
 ))}
</Accordion>
`}
</Highlight>
</div>
                              </Tab.Pane>
                            </Tab.Content>    
                          </Tab.Container>  
                      </Card>
                  </Col>

                  <Col xl="12">
                      <Card name="accordion-twelve" className="dz-card">
                          <Tab.Container defaultActiveKey="Preview">
                            <Card.Header className="card-header flex-wrap  border-0">
                                <div>
                                    <Card.Title>Accordion Gradient</Card.Title>
                                    <Card.Text className="m-0 subtitle">
                                      Add <code>accordion-gradient</code> class with{" "}
                                      <code>accordion</code>
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
                            <Tab.Content className="tab-content" id="myTabContent">
                              <Tab.Pane eventKey="Preview">
                                <Card.Body className="card-body">               
                                    <Accordion className="accordion accordion-rounded-stylish accordion-gradient" defaultActiveKey="0">
                                        {defaultAccordion.map((d, i) => (
                                          <Accordion.Item  key={i} eventKey={`${i}`}>
                                            <Accordion.Header  className="accordion-header rounded-lg">                                              
                                              <span className="accordion-header-text">{d.title}</span>
                                            </Accordion.Header>
                                            <Accordion.Collapse eventKey={`${i}`} className="accordion__body">
                                                <div className="accordion-body">{d.text}</div>
                                            </Accordion.Collapse>
                                          </Accordion.Item>
                                        ))}
                                      </Accordion>	
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="Code">
                              <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Accordion className="accordion accordion-rounded-stylish accordion-gradient" defaultActiveKey="0">
  {defaultAccordion.map((d, i) => (
    <Accordion.Item  key={i} eventKey={\`$\{i}\`}>
      <Accordion.Header  className="accordion-header rounded-lg">                                              
        <span className="accordion-header-text">{d.title}</span>
      </Accordion.Header>
      <Accordion.Collapse eventKey={\`$\{i}\`} className="accordion__body">
          <div className="accordion-body">{d.text}</div>
      </Accordion.Collapse>
    </Accordion.Item>
  ))}
</Accordion>	
`}                                      
</Highlight>
</div>
                              </Tab.Pane>
                            </Tab.Content>    
                          </Tab.Container>  
                      </Card>
                  </Col>       
              
                </Row>{" "}                
              </div>  
            </div>  
            <div className="demo-right ">                
                <div className="demo-right-inner  navigation navbar">    
                  <h4 className="title">Accordion</h4>
                  <div className="dz-scroll demo-right-tabs">
                    <ul className="navbar-nav nav" id="menu-bar">
                        {sidebarData.map((item, index)=>(
                          <li key={index}   
                            className={`${index === activeLink ? 'active' :  ''}`}                        
                          >
                            <Link to={item.to} smooth={true}	                              
                              className={`scroll ${index === activeLink ? 'active' :  ''} `}                              
                              spy={true}
                              onClick={()=>setActiveLink(index)}
                            >{item.title}</Link>
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

export default UiAccordion;
