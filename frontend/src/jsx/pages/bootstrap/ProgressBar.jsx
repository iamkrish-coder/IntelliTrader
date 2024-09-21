import React, { Fragment, useState } from "react";
import Highlight from "react-highlight";

import {Link} from 'react-scroll';
import { Row, Col, Card, ProgressBar, Tab, Nav } from "react-bootstrap";

const sidebarLink = [
  {to:'default-progress', title:'Default Progress Bar'},
  {to:'striped-progress', title:'Striped Progress Bar'},
  {to:'colored-progress', title:'Colored Progress Bar'},
  {to:'different-bar', title:'Different Bar Sizes'},
  {to:'animated-striped', title:'Animated Striped Bars'},
  {to:'vertical-progress', title:'Vertical Progress Bars'},
  {to:'vertical-progress-bottom', title:'Vertical Progress From Bottom'},
  {to:'different-size', title:'Different Size Progress Bars'},
  {to:'animated-bars', title:'Animated Bars'},
  {to:'skill-bars', title:'Skill Bars'},
];

const UiProgressBar = () => {
  const [activeLink ,setActiveLink] = useState(0);
  const progressBarData = [
    { variant: "danger", value: "60" },
    { variant: "info", value: "40" },
    { variant: "success", value: "20" },
    { variant: "primary", value: "30" },
    { variant: "warning", value: "80" },
    { variant: "inverse", value: "40" },
  ];
  return (
    <Fragment>

      
      <div className="element-area">
          <div className="demo-view">
            <div className="container-fluid pt-0 ps-0 pe-lg-4 pe-0">
              <Row className="ui">
                {/* <!-- column1 --> */}
                <Col xl={12}>
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="default-progress" className="dz-card">
                      <Card.Header className=" flex-wrap border-0">
                        <div>
                          <Card.Title>Default Progress bars</Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            Default progress bar style
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
                            <ProgressBar now={60} variant="primary" />
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<ProgressBar now={60} variant="danger" />
`}
</Highlight>
</div>
                        </Tab.Pane>
                       </Tab.Content>   
                    </Card>
                  </Tab.Container>
                </Col>
                {/* <!-- column2 --> */}
                <Col xl={12}>
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="striped-progress"  className="dz-card">
                      <Card.Header className=" flex-wrap border-0">
                        <div>
                          <Card.Title>Striped Progress bar</Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            add <code>.progress-bar-striped</code> to change the style
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
                            <ProgressBar now={85} variant="info" striped />
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<ProgressBar now={85} variant="info" striped />
`}
</Highlight>
</div>
                        </Tab.Pane>
                      </Tab.Content>  

                    </Card>
                  </Tab.Container>  
                </Col>
                {/* <!-- column3 --> */}
              
                <Col xl={12}>
                  <Tab.Container defaultActiveKey="Preview"> 
                    <Card name="colored-progress"  className="dz-card">
                    <Card.Header className=" flex-wrap border-0">
                      <div>
                        <Card.Title>Colored Progress bar</Card.Title>
                        <Card.Text className="mb-0 subtitle">
                          add <code>bg-primary, .bg-danger, .bg-info</code> to change the
                          style
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
                            {progressBarData.map((data, i) => (
                              <ProgressBar
                              now={data.value}
                              variant={data.variant}
                              key={i}
                              className="mt-3"
                              />
                              ))}
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<Card.Body>
  {progressBarData.map((data, i) => (
    <ProgressBar
    now={data.value}
    variant={data.variant}
    key={i}
    className="mt-3"
    />
    ))}
</Card.Body>
`}
</Highlight>
</div>
                        </Tab.Pane>
                      </Tab.Content>  
                    </Card>
                  </Tab.Container>  
                </Col>
                {/* <!-- Column4 --> */}
                <Col xl={12}>
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="different-bar"  className="dz-card">
                      <Card.Header className=" flex-wrap border-0">
                        <div>

                          <Card.Title>Different bar sizes </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            add <code>bg-primary, .bg-danger, .bg-info</code> to change the
                            style
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
                              {progressBarData.map(
                                (data, i) =>
                                i !== progressBarData.length - 1 && (
                                  <ProgressBar
                                  now={data.value}
                                  variant={data.variant}
                                  key={i}
                                  className="mt-3"
                                  />
                                  )
                                  )}
                            </Card.Body>
                          </Tab.Pane>
                          <Tab.Pane eventKey="Code">
                          <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<Card.Body>
  {progressBarData.map(
    (data, i) =>
    i !== progressBarData.length - 1 && (
      <ProgressBar
      now={data.value}
      variant={data.variant}
      key={i}
      className="mt-3"
      />
    )
  )}
 </Card.Body>
`}
</Highlight>
</div>
                          </Tab.Pane>
                        </Tab.Content>  
                    </Card>
                  </Tab.Container>  
                </Col>
                {/* <!-- Column5 --> */}
                <Col xl={12}>
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="animated-striped"  className="dz-card">
                      <Card.Header className=" flex-wrap border-0">
                        <div>

                          <Card.Title>Animated Striped bar </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            add <code>bg-primary, .bg-danger, .bg-info</code> to change the
                            style
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
                            {progressBarData.map(
                              (data, i) =>
                                i !== progressBarData.length - 1 && (
                                  <ProgressBar
                                    now={data.value}
                                    variant={data.variant}
                                    key={i}
                                    className="mt-3"
                                    striped
                                  />
                                )
                            )}
                          </Card.Body>
                        </Tab.Pane>  
                        <Tab.Pane eventKey="Code">
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<Card.Body>
 {progressBarData.map(
   (data, i) =>
     i !== progressBarData.length - 1 && (
       <ProgressBar
         now={data.value}
         variant={data.variant}
         key={i}
         className="mt-3"
         striped
       />
     )
 )}
</Card.Body>
`}
</Highlight>
</div>
                        </Tab.Pane>  
                      </Tab.Content>  
                    </Card>
                  </Tab.Container>  
                </Col>
                {/* <!-- Column6 --> */}
                {/* <!-- Column --> */}
                <Col xl={12}>
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="vertical-progress"  className="dz-card">
                      <Card.Header className=" flex-wrap border-0">
                        <div>
                          <Card.Title>Vertical Progress bars </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            add <code>.progress-vertical</code> to change the style
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
                            {progressBarData.map(
                              (data, i) =>
                                i !== progressBarData.length - 1 && (
                                  <ProgressBar
                                    className=" progress-vertical"
                                    now={data.variant}
                                    key={i}
                                  >
                                    <ProgressBar
                                      key={i}
                                      style={{
                                        width: "4px",
                                        height: `${data.value}%`,
                                      }}
                                      variant={data.variant}
                                    />
                                  </ProgressBar>
                                )
                            )}
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<Card.Body>
  {progressBarData.map(
    (data, i) =>
      i !== progressBarData.length - 1 && (
        <ProgressBar
          className=" progress-vertical"
          now={data.variant}
          key={i}
        >
          <ProgressBar
            key={i}
            style={{
              width: "4px",
              height: \`$\{data.value}%\`,
            }}
            variant={data.variant}
          />
        </ProgressBar>
      )
  )}
</Card.Body>
`}
</Highlight>
</div>
                        </Tab.Pane>
                      </Tab.Content>    
                    </Card>
                  </Tab.Container>  
                </Col>
                {/* <!-- Column7 --> */}
                {/* <!-- Column --> */}
                <Col xl={12}>
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="vertical-progress-bottom"  className="dz-card">
                      <Card.Header className=" flex-wrap border-0">
                        <div>
                          <Card.Title>Vertical Progress From bottom </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            add <code>.progress-vertical</code> to change the style
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
                            {progressBarData.map(
                              (data, i) =>
                                i !== progressBarData.length - 1 && (
                                  <ProgressBar
                                    className=" progress-vertical-bottom"
                                    now={data.variant}
                                    key={i}
                                  >
                                    <ProgressBar
                                      key={i}
                                      style={{
                                        width: "4px",
                                        height: `${data.value}%`,
                                      }}
                                      variant={data.variant}
                                    />
                                  </ProgressBar>
                                )
                            )}
                          </Card.Body>
                        </Tab.Pane>  
                        <Tab.Pane eventKey="Code">
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<Card.Body>
  {progressBarData.map(
    (data, i) =>
      i !== progressBarData.length - 1 && (
        <ProgressBar
          className=" progress-vertical-bottom"
          now={data.variant}
          key={i}
        >
          <ProgressBar
            key={i}
            style={{
              width: "4px",
              height: \`$\{data.value}%\`,
            }}
            variant={data.variant}
          />
        </ProgressBar>
      )
  )}
 </Card.Body>
`}
</Highlight>
</div>
                        </Tab.Pane>  
                      </Tab.Content>  
                    </Card>
                  </Tab.Container>  
                </Col>
                {/* <!-- Column8 --> */}
                {/* <!-- Column --> */}
                <Col xl={12}>
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="different-size"  className="dz-card">
                      <Card.Header className=" flex-wrap border-0">
                        <div>
                          <Card.Title>Different size Progress bars </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            add <code>.progress-vertical</code> to change the style
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
                            {progressBarData.map(
                              (data, i) =>
                                i !== progressBarData.length - 1 && (
                                  <ProgressBar
                                    className=" progress-vertical"
                                    now={data.variant}
                                    key={i}
                                  >
                                    <ProgressBar
                                      key={i}
                                      style={{
                                        width: `${`${4 + i * 2}px`}`,
                                        height: `${data.value}%`,
                                      }}
                                      variant={data.variant}
                                    />
                                  </ProgressBar>
                                )
                            )}
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<Card.Body>
  {progressBarData.map(
    (data, i) =>
      i !== progressBarData.length - 1 && (
        <ProgressBar
          className=" progress-vertical"
          now={data.variant}
          key={i}
        >
          <ProgressBar
            key={i}
            style={{
              width: \`$\{\`$\{4 + i * 2}px\`}\`,
              height: \`$\{data.value}%\`,
            }}
            variant={data.variant}
          />
        </ProgressBar>
      )
  )}
</Card.Body>
`}
</Highlight>
</div>
                        </Tab.Pane>
                      </Tab.Content>  

                    </Card>
                  </Tab.Container>  
                </Col>
                {/* <!-- Column9 --> */}
                <Col xl={12}>
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="animated-bars"  className="dz-card">
                      <Card.Header className=" flex-wrap border-0">
                        <div>
                          <Card.Title>Animated bars </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            add <code>.progress-vertical</code> to change the style
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
                            {progressBarData.map(
                              (data, i) =>
                                i !== progressBarData.length - 1 && (
                                  <ProgressBar
                                    now={data.value}
                                    variant={data.variant}
                                    key={i}
                                    className="mt-3"
                                  />
                                )
                            )}{" "}
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                        <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<Card.Body>
 {progressBarData.map(
   (data, i) =>
     i !== progressBarData.length - 1 && (
       <ProgressBar
         now={data.value}
         variant={data.variant}
         key={i}
         className="mt-3"
       />
     )
 )}{" "}
</Card.Body>
`}
</Highlight>
</div>
                        </Tab.Pane>
                      </Tab.Content>    
                    </Card>
                  </Tab.Container>  
                </Col>
                {/* <!-- Column10 --> */}
                <Col xl={12}>
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="skill-bars"  className="dz-card">
                      <Card.Header className=" flex-wrap border-0">
                        <div>
                          <Card.Title>Skill Bars </Card.Title>
                          <Card.Text className="mb-0 subtitle">
                            add <code>.progress-animated</code> to change the style
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
                            <h6>
                              Photoshop
                              <span className="pull-right"> 85%</span>
                            </h6>
                            <ProgressBar now={85} variant="danger" />

                            <h6 className="mt-4">
                              Code editor
                              <span className="pull-right"> 90%</span>
                            </h6>
                            <ProgressBar now="90" variant="info" />
                            <h6 className="mt-4">
                              Illustrator
                              <span className="pull-right"> 65%</span>
                            </h6>
                            <ProgressBar now={65} variant="success" />
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                          <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<Card.Body>
  <h6>
    Photoshop
    <span className="pull-right">85%</span>
  </h6>
  <ProgressBar now={85} variant="danger" />

  <h6 className="mt-4">
    Code editor
    <span className="pull-right">90%</span>
  </h6>
  <ProgressBar now="90" variant="info" />
  <h6 className="mt-4">
    Illustrator
    <span className="pull-right">65%</span>
  </h6>
  <ProgressBar now={65} variant="success" />
</Card.Body>
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
                <h4 className="title">Progressbar</h4>
                <div className="dz-scroll demo-right-tabs">
                  <ul className="navbar-nav" id="menu-bar">
                    {sidebarLink.map((item, ind)=>(
                      <li key={ind}   
                        className={`${ind === activeLink ? 'active' :  ''}`}                     
                      >
                        <Link to={item.to}  smooth={true}
                          className={`scroll ${ind === activeLink ? 'active' :  ''} `}
                          activeClass="active"
                          spy={true}
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

export default UiProgressBar;
