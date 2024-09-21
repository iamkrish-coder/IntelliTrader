import React, { Fragment, useState } from "react";
import {Link} from 'react-scroll';
import Highlight from "react-highlight";

import { Row, Col, Card,  Tab, Nav } from "react-bootstrap";
const sidebarLink = [
  { to:'default-tab', title:'Default Tab'},
  { to:'custom-tab', title:'Custom Tab'},
  { to:'nav-pills', title:'Nav Pills Tabs'},
  { to:'nav-pills-tabs', title:'Nav Pills Tabs-2'},
  { to:'vertical-nav', title:'Vertical Nav Pill'},
  { to:'vertical-nav-pill', title:'Vertical Nav Pill-2'},
  { to:'tab-icon', title:'Tab with Icon'}
];

const UiTab = () => {
  const [activeLink ,setActiveLink] = useState(0);
  const tabData = [
    {
      name: "Home",
      icon: "home",
      content:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
    },
    {
      name: "Profile",
      icon: "user",
      content:
        "Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor.      ",
    },
    {
      name: "Contact",
      icon: "phone",
      content:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
    },

    {
      name: "Message",
      icon: "envelope",
      content:
        "Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor.      ",
    },
  ];

  return (
    <Fragment>      
      
      <div className="element-area">
        <div className="demo-view">
          <div className="container-fluid pt-0 ps-0 pe-lg-4 pe-0">
            <Row>
              <Col xl={12}>
                <Tab.Container defaultActiveKey="Preview">
                  <Card name="default-tab" className="dz-card">
                    <Card.Header className="border-0">
                      <div>
                        <Card.Title>Default Tab</Card.Title>
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
                          {/* <!-- Nav tabs --> */}
                          <div className="default-tab">
                            <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
                              <Nav as="ul" className="nav-tabs">
                                {tabData.map((data, i) => (
                                  <Nav.Item as="li" key={i}>
                                    <Nav.Link eventKey={data.name.toLowerCase()}>
                                      <i className={`la la-${data.icon} me-2`} />
                                      {data.name}
                                    </Nav.Link>
                                  </Nav.Item>
                                ))}
                              </Nav>
                              <Tab.Content className="pt-4">
                                {tabData.map((data, i) => (
                                  <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                                    <h4>This is {data.name} title</h4>
                                    <p>{data.content}</p>
                                    <p>{data.content}</p>
                                  </Tab.Pane>
                                ))}
                              </Tab.Content>
                            </Tab.Container>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">
  
  <Highlight>
  {`
  <div className="default-tab">
    <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
      <Nav as="ul" className="nav-tabs">
        {tabData.map((data, i) => (
          <Nav.Item as="li" key={i}>
            <Nav.Link eventKey={data.name.toLowerCase()}>
              <i className={\`la la-$\{data.icon} me-2\`} />
              {data.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Tab.Content className="pt-4">
        {tabData.map((data, i) => (
          <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
            <h4>This is {data.name} title</h4>
            <p>{data.content}</p>
            <p>{data.content}</p>
          </Tab.Pane>
        ))}
      </Tab.Content>
    </Tab.Container>
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
                  <Card name="custom-tab" className="dz-card">
                    <Card.Header className="border-0">
                      <div>
                          <Card.Title>Custom Tab 1</Card.Title>
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
                          {/* <!-- Nav tabs --> */}
                          <div className="custom-tab-1">
                            <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
                              <Nav as="ul" className="nav-tabs">
                                {tabData.map((data, i) => (
                                  <Nav.Item as="li" key={i}>
                                    <Nav.Link eventKey={data.name.toLowerCase()}>
                                      <i className={`la la-${data.icon} me-2`} />
                                      {data.name}
                                    </Nav.Link>
                                  </Nav.Item>
                                ))}
                              </Nav>
                              <Tab.Content className="pt-4">
                                {tabData.map((data, i) => (
                                  <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                                    <h4>This is {data.name} title</h4>
                                    <p>{data.content}</p>
                                    <p>{data.content}</p>
                                  </Tab.Pane>
                                ))}
                              </Tab.Content>
                            </Tab.Container>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<div className="custom-tab-1">
  <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
    <Nav as="ul" className="nav-tabs">
      {tabData.map((data, i) => (
        <Nav.Item as="li" key={i}>
          <Nav.Link eventKey={data.name.toLowerCase()}>
            <i className={\`la la-$\{data.icon} me-2\`} />
            {data.name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
    <Tab.Content className="pt-4">
      {tabData.map((data, i) => (
        <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
          <h4>This is {data.name} title</h4>
          <p>{data.content}</p>
          <p>{data.content}</p>
        </Tab.Pane>
      ))}
    </Tab.Content>
  </Tab.Container>
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
                  <Card name="nav-pills" className="dz-card">
                    <Card.Header className="border-0">
                      <div>
                        <Card.Title>Nav Pills Tabs</Card.Title>
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
                          <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
                            <Nav as="ul" className="nav-pills mb-4 light">
                              {tabData.map(
                                (data, i) =>
                                  i !== tabData.length - 1 && (
                                    <Nav.Item as="li" key={i}>
                                      <Nav.Link eventKey={data.name.toLowerCase()}>
                                        Tab {i === 1 ? "Two" : i === 2 ? "Three" : "One"}
                                      </Nav.Link>
                                    </Nav.Item>
                                  )
                              )}
                            </Nav>
                            <Tab.Content className="">
                              {tabData.map(
                                (data, i) =>
                                  i !== tabData.length - 1 && (
                                    <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                                      <p>{data.content}</p>
                                      <p>{data.content}</p>
                                    </Tab.Pane>
                                  )
                              )}
                            </Tab.Content>
                          </Tab.Container>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
  <Nav as="ul" className="nav-pills mb-4 light">
    {tabData.map(
      (data, i) =>
        i !== tabData.length - 1 && (
          <Nav.Item as="li" key={i}>
            <Nav.Link eventKey={data.name.toLowerCase()}>
              Tab {i === 1 ? "Two" : i === 2 ? "Three" : "One"}
            </Nav.Link>
          </Nav.Item>
        )
    )}
  </Nav>
  <Tab.Content className="">
    {tabData.map(
      (data, i) =>
        i !== tabData.length - 1 && (
          <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
            <p>{data.content}</p>
            <p>{data.content}</p>
          </Tab.Pane>
        )
    )}
  </Tab.Content>
</Tab.Container>
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
                  <Card name="nav-pills-tabs" className="dz-card">
                    <Card.Header className="border-0">
                      <div>
                        <Card.Title>Nav Pills Tabs</Card.Title>
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
                          <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
                            <Nav as="ul" className="nav-pills mb-4 justify-content-end">
                              {tabData.map(
                                (data, i) =>
                                  i !== tabData.length - 1 && (
                                    <Nav.Item as="li" key={i}>
                                      <Nav.Link eventKey={data.name.toLowerCase()}>
                                        Tab {i === 1 ? "Two" : i === 2 ? "Three" : "One"}
                                      </Nav.Link>
                                    </Nav.Item>
                                  )
                              )}
                            </Nav>
                            <Tab.Content className="">
                              {tabData.map(
                                (data, i) =>
                                  i !== tabData.length - 1 && (
                                    <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                                      <p>{data.content}</p>
                                      <p>{data.content}</p>
                                    </Tab.Pane>
                                  )
                              )}
                            </Tab.Content>
                          </Tab.Container>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
  <Nav as="ul" className="nav-pills mb-4 justify-content-end">
    {tabData.map(
      (data, i) =>
        i !== tabData.length - 1 && (
          <Nav.Item as="li" key={i}>
            <Nav.Link eventKey={data.name.toLowerCase()}>
              Tab {i === 1 ? "Two" : i === 2 ? "Three" : "One"}
            </Nav.Link>
          </Nav.Item>
        )
    )}
  </Nav>
  <Tab.Content className="">
    {tabData.map(
      (data, i) =>
        i !== tabData.length - 1 && (
          <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
            <p>{data.content}</p>
            <p>{data.content}</p>
          </Tab.Pane>
        )
    )}
  </Tab.Content>
</Tab.Container>
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
                  <Card name="vertical-nav" className="dz-card">
                    <Card.Header className="border-0">
                      <div>
                        <Card.Title>Vertical Nav Pill</Card.Title>
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
                            <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
                              <Col sm={4}>
                                <Nav as="ul" className="flex-column nav-pills mb-3">
                                  {tabData.map((data, i) => (
                                    <Nav.Item as="li" key={i}>
                                      <Nav.Link eventKey={data.name.toLowerCase()}>
                                        {data.name}
                                      </Nav.Link>
                                    </Nav.Item>
                                  ))}
                                </Nav>
                              </Col>
                              <Col sm={8}>
                                <Tab.Content className="ms-2">
                                  {tabData.map((data, i) => (
                                    <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                                      <p>
                                        {data.content} {data.content}
                                      </p>
                                    </Tab.Pane>
                                  ))}
                                </Tab.Content>{" "}
                              </Col>
                            </Tab.Container>
                          </Row>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                      <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Row>
  <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
    <Col sm={4}>
      <Nav as="ul" className="flex-column nav-pills mb-3">
        {tabData.map((data, i) => (
          <Nav.Item as="li" key={i}>
            <Nav.Link eventKey={data.name.toLowerCase()}>
              {data.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
    <Col sm={8}>
      <Tab.Content className="ms-2">
        {tabData.map((data, i) => (
          <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
            <p>
              {data.content} {data.content}
            </p>
          </Tab.Pane>
        ))}
      </Tab.Content>{" "}
    </Col>
  </Tab.Container>
</Row>
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
                  <Card name="vertical-nav-pill" className="dz-card">
                    <Card.Header className="border-0">
                      <div>
                        <Card.Title>Vertical Nav Pill</Card.Title>
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
                            <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
                              <Col sm={8}>
                                <Tab.Content>
                                  {tabData.map((data, i) => (
                                    <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                                      <p>
                                        {data.content} {data.content}
                                      </p>
                                    </Tab.Pane>
                                  ))}
                                </Tab.Content>
                              </Col>
                              <Col sm={4} id="order-2">
                                <Nav as="div" variant="pills" className="flex-column ms-2">
                                  {tabData.map((data, i) => (
                                    <Nav.Item as="a" key={i}>
                                      <Nav.Link eventKey={data.name.toLowerCase()}>
                                        {data.name}
                                      </Nav.Link>
                                    </Nav.Item>
                                  ))}
                                </Nav>
                              </Col>
                            </Tab.Container>
                          </Row>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                    <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Row>
  <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
    <Col sm={8}>
      <Tab.Content>
        {tabData.map((data, i) => (
          <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
            <p>
              {data.content} {data.content}
            </p>
          </Tab.Pane>
        ))}
      </Tab.Content>
    </Col>
    <Col sm={4} id="order-2">
      <Nav as="div" variant="pills" className="flex-column ms-2">
        {tabData.map((data, i) => (
          <Nav.Item as="a" key={i}>
            <Nav.Link eventKey={data.name.toLowerCase()}>
              {data.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  </Tab.Container>
</Row>
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
                  <Card name="tab-icon" className="dz-card">
                    <Card.Header className="border-0">
                      <div>
                        <Card.Title>Tab with icon</Card.Title>
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
                          <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
                            <Nav as="ul" className="nav-tabs">
                              {tabData.map(
                                (data, i) =>
                                  i !== tabData.length - 1 && (
                                    <Nav.Item as="li" key={i}>
                                      <Nav.Link eventKey={data.name.toLowerCase()}>
                                        <i
                                          className={`ti-${i === 2 ? "email" : data.icon}`}
                                        />
                                      </Nav.Link>
                                    </Nav.Item>
                                  )
                              )}
                            </Nav>
                            <Tab.Content className="pt-4">
                              {tabData.map(
                                (data, i) =>
                                  i !== tabData.length - 1 && (
                                    <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                                      <h4>This is icon title</h4>
                                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</p>
                                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</p>
                                    </Tab.Pane>
                                  )
                              )}
                            </Tab.Content>
                          </Tab.Container>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Code">
                    <div className="card-body pt-0 p-0 code-area">

<Highlight>
{`
<Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
  <Nav as="ul" className="nav-tabs">
    {tabData.map(
      (data, i) =>
        i !== tabData.length - 1 && (
          <Nav.Item as="li" key={i}>
            <Nav.Link eventKey={data.name.toLowerCase()}>
              <i
                className={\`ti-$\{i === 2 ? "email" : data.icon}\`}
              />
            </Nav.Link>
          </Nav.Item>
        )
    )}
  </Nav>
  <Tab.Content className="pt-4">
    {tabData.map(
      (data, i) =>
        i !== tabData.length - 1 && (
          <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
            <h4>This is icon title</h4>
            <p>{data.content}</p>
            <p>{data.content}</p>
          </Tab.Pane>
        )
    )}
  </Tab.Content>
  </Tab.Container>
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
          <div className="demo-right-inner">
              <h4 className="title">Tab</h4>
              <div className="dz-scroll demo-right-tabs">
                <ul className="navbar-nav" id="menu-bar">
                      {sidebarLink.map((item, ind)=>(
                        <li key={ind}
                          className={`${ind === activeLink ? 'active' :  ''}`}
                        >
                          <Link to={item.to} smooth={true}
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

export default UiTab;
