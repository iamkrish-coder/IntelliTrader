import React, { Fragment, useState } from "react";
import Highlight from "react-highlight";

import {Link} from 'react-scroll';

import { Row, Card, Col, ListGroup, Badge, Tab, Nav } from "react-bootstrap";

const sidebarLink = [
  { title:'Basic List Group', to:'basic-list' },
  { title:'List Active items', to:'list-active' },
  { title:'List Disabled Item', to:'list-disabled' },
  { title:'Link And Button Item', to:'link-button' },
  { title:'Flush', to:'flush' },
  { title:'With Badges', to:'with-badges' },
  { title:'Custom Content', to:'custom-content' },
  { title:'Contextual', to:'contextual' },
  { title:'List-Tab', to:'list-tab' },
];

const UiListGroup = () => {
  const [activeLink ,setActiveLink] = useState(0);
  const listItem = [
    "Cras justo odio",
    "Dapibus ac facilisis in",
    "Morbi leo risus",
    "Porta ac consectetur ac",
    "Vestibulum at eros",
  ];  
  return (
    <Fragment>           
      <div className="element-area">
					<div className="demo-view">
						<div className="container-fluid pt-0 ps-0 pe-lg-4 pe-0">
              <Row>
                <Col xl="12">
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="basic-list" className="dz-card">
                      <Card.Header className="border-0">
                        <div><Card.Title>Basic List Group</Card.Title></div>
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
                            <div className="basic-list-group">
                              <ListGroup as="ul">
                                {listItem.map((list, i) => (
                                  <Fragment key={i}>
                                    <ListGroup.Item as="li">{list}</ListGroup.Item>
                                  </Fragment>
                                ))}
                              </ListGroup>
                            </div>
                          </Card.Body>
                         </Tab.Pane>
                         <Tab.Pane eventKey="Code">
                          <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-list-group">
  <ListGroup as="ul">
    {listItem.map((list, i) => (
      <Fragment key={i}>
        <ListGroup.Item as="li">{list}</ListGroup.Item>
      </Fragment>
    ))}
  </ListGroup>
</div>
`}
</Highlight>
</div>
                         </Tab.Pane>
                       </Tab.Content>   
                    </Card>
                  </Tab.Container>  
                </Col>
                <Col xl="12">
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="list-active" className="dz-card">
                      <Card.Header className="border-0">
                        <div>
                          <Card.Title>List Active items</Card.Title>
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
                            <div className="basic-list-group">
                              <ListGroup as="ul">
                                {listItem.map((list, i) => (
                                  <Fragment key={i}>
                                    {i === 0 ? (
                                      <ListGroup.Item as="li" active>
                                        {list}
                                      </ListGroup.Item>
                                    ) : (
                                      <ListGroup.Item as="li">{list}</ListGroup.Item>
                                    )}
                                  </Fragment>
                                ))}
                              </ListGroup>
                            </div>
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                          <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-list-group">
  <ListGroup as="ul">
    {listItem.map((list, i) => (
      <Fragment key={i}>
        {i === 0 ? (
          <ListGroup.Item as="li" active>
            {list}
          </ListGroup.Item>
        ) : (
          <ListGroup.Item as="li">{list}</ListGroup.Item>
        )}
      </Fragment>
    ))}
  </ListGroup>
</div>
`}
</Highlight>
</div>
                        </Tab.Pane>
                       </Tab.Content>   
                    </Card>
                  </Tab.Container>  
                </Col>
                <Col xl="12">
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="list-disabled" className="dz-card">
                      <Card.Header className="border-0">
                        <div>
                         <Card.Title>List Disabled items</Card.Title>
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
                            <div className="basic-list-group">
                              <ListGroup as="ul">
                                {listItem.map((list, i) => (
                                  <Fragment key={i}>
                                    {i === 0 ? (
                                      <ListGroup.Item as="li" disabled>
                                        {list}
                                      </ListGroup.Item>
                                    ) : (
                                      <ListGroup.Item as="li">{list}</ListGroup.Item>
                                    )}
                                  </Fragment>
                                ))}
                              </ListGroup>
                            </div>
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                          <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-list-group">
  <ListGroup as="ul">
    {listItem.map((list, i) => (
      <Fragment key={i}>
        {i === 0 ? (
          <ListGroup.Item as="li" disabled>
            {list}
          </ListGroup.Item>
        ) : (
          <ListGroup.Item as="li">{list}</ListGroup.Item>
        )}
      </Fragment>
    ))}
  </ListGroup>
</div>
`}
</Highlight>
</div>
                        </Tab.Pane>

                      </Tab.Content>    
                    </Card>
                  </Tab.Container>  
                </Col>
                <Col xl="12">
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="link-button" className="dz-card">
                      <Card.Header className="border-0">
                        <div>
                          <Card.Title>Links and buttons items</Card.Title>
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
                            <div className="basic-list-group">
                              <ListGroup>
                                {listItem.map((list, i) => (
                                  <Fragment key={i}>
                                    {i === 0 ? (
                                      <ListGroup.Item action active>
                                        {list}
                                      </ListGroup.Item>
                                    ) : i === listItem.length - 1 ? (
                                      <ListGroup.Item
                                        action
                                        className="list-group-item-action disabled"
                                      >
                                        {list}
                                      </ListGroup.Item>
                                    ) : (
                                      <ListGroup.Item action>{list}</ListGroup.Item>
                                    )}
                                  </Fragment>
                                ))}
                              </ListGroup>
                            </div>
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                          <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-list-group">
  <ListGroup>
    {listItem.map((list, i) => (
      <Fragment key={i}>
        {i === 0 ? (
          <ListGroup.Item action active>
            {list}
          </ListGroup.Item>
        ) : i === listItem.length - 1 ? (
          <ListGroup.Item
            action
            className="list-group-item-action disabled"
          >
            {list}
          </ListGroup.Item>
        ) : (
          <ListGroup.Item action>{list}</ListGroup.Item>
        )}
      </Fragment>
    ))}
  </ListGroup>
</div>
`}
</Highlight>
</div>
                        </Tab.Pane>

                      </Tab.Content>    
                    </Card>
                  </Tab.Container>  
                </Col>
                <Col xl="12">
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="flush" className="dz-card">
                      <Card.Header className="border-0">
                        <div>
                          <Card.Title>Flush</Card.Title>
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
                            <ListGroup as="ul" variant="flush">
                              {listItem.map((list, i) => (
                                <Fragment key={i}>
                                  <ListGroup.Item as="li">{list}</ListGroup.Item>
                                </Fragment>
                              ))}
                            </ListGroup>
                          </Card.Body>
                         </Tab.Pane>
                         <Tab.Pane eventKey="Code">
                          <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<ListGroup as="ul" variant="flush">
  {listItem.map((list, i) => (
    <Fragment key={i}>
      <ListGroup.Item as="li">{list}</ListGroup.Item>
    </Fragment>
  ))}
</ListGroup>
`}
</Highlight>
</div>
                         </Tab.Pane>
                        </Tab.Content>  
                    </Card>
                  </Tab.Container>  
                </Col>
                <Col xl="12">
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="with-badges" className="dz-card">
                      <Card.Header className="border-0">
                        <div>
                          <Card.Title>With badges</Card.Title>
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
                            <div className="basic-list-group">
                              <ListGroup>
                                {listItem.map((list, i) => (
                                  <ListGroup.Item
                                    className="d-flex justify-content-between align-items-center"
                                    key={i}
                                  >
                                    {list}
                                    <Badge variant="primary" pill>
                                      {i + 1}
                                    </Badge>
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </div>
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                          <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-list-group">
  <ListGroup>
    {listItem.map((list, i) => (
      <ListGroup.Item
        className="d-flex justify-content-between align-items-center"
        key={i}
      >
        {list}
        <Badge variant="primary" pill>
          {i + 1}
        </Badge>
      </ListGroup.Item>
    ))}
  </ListGroup>
</div>
`}
</Highlight>
</div>
                        </Tab.Pane>

                      </Tab.Content>    
                    </Card>
                  </Tab.Container>  
                </Col>
                <Col xl="12">
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="custom-content" className="dz-card">
                      <Card.Header className="border-0">
                        <div>
                          <Card.Title>Custom content</Card.Title>
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
                            <div className="basic-list-group">
                              <ListGroup>
                                <ListGroup.Item
                                  action
                                  active
                                  className="flex-column align-items-start"
                                >
                                  <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-3 text-white">
                                      List group item heading
                                    </h5>
                                    <small>3 days ago</small>
                                  </div>
                                  <p className="mb-1">
                                    Donec id elit non mi porta gravida at eget metus. Maecenas
                                    sed diam eget risus varius blandit.
                                  </p>
                                  <small>Donec id elit non mi porta.</small>
                                </ListGroup.Item>
                                <ListGroup.Item  action className="flex-column">
                                  <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-3">List group item heading</h5>
                                    <small className="text-muted">3 days ago</small>
                                  </div>
                                  <p className="mb-1">
                                    Donec id elit non mi porta gravida at eget metus. Maecenas
                                    sed diam eget risus varius blandit.
                                  </p>
                                  <small className="text-muted">
                                    Donec id elit non mi porta.
                                  </small>
                                </ListGroup.Item>
                                <ListGroup.Item
                                  action
                                  className="flex-column align-items-start"
                                >
                                  <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-3">List group item heading</h5>
                                    <small className="text-muted">3 days ago</small>
                                  </div>
                                  <p className="mb-1">
                                    Donec id elit non mi porta gravida at eget metus. Maecenas
                                    sed diam eget risus varius blandit.
                                  </p>
                                  <small className="text-muted">
                                    Donec id elit non mi porta.
                                  </small>
                                </ListGroup.Item>
                              </ListGroup>
                            </div>
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                          <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-list-group">
  <ListGroup>
    <ListGroup.Item
      action
      active
      className="flex-column align-items-start"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-3 text-white">
          List group item heading
        </h5>
        <small>3 days ago</small>
      </div>
      <p className="mb-1">
        Donec id elit non mi porta gravida at eget metus. Maecenas
        sed diam eget risus varius blandit.
      </p>
      <small>Donec id elit non mi porta.</small>
    </ListGroup.Item>
    <ListGroup.Item  action className="flex-column">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-3">List group item heading</h5>
        <small className="text-muted">3 days ago</small>
      </div>
      <p className="mb-1">
        Donec id elit non mi porta gravida at eget metus. Maecenas
        sed diam eget risus varius blandit.
      </p>
      <small className="text-muted">
        Donec id elit non mi porta.
      </small>
    </ListGroup.Item>
    <ListGroup.Item
      action
      className="flex-column align-items-start"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-3">List group item heading</h5>
        <small className="text-muted">3 days ago</small>
      </div>
      <p className="mb-1">
        Donec id elit non mi porta gravida at eget metus. Maecenas
        sed diam eget risus varius blandit.
      </p>
      <small className="text-muted">
        Donec id elit non mi porta.
      </small>
    </ListGroup.Item>
  </ListGroup>
</div>
`}
</Highlight>
</div>
                        </Tab.Pane>
                      </Tab.Content>    
                    </Card>
                  </Tab.Container>  
                </Col>
                <Col xl="12">
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="contextual" className="dz-card">
                      <Card.Header className="border-0">
                        <div>
                          <Card.Title>Contextual</Card.Title>
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
                            <div className="basic-list-group">
                              <ListGroup as="ul">
                                <ListGroup.Item variant="">
                                  Dapibus ac facilisis in
                                </ListGroup.Item>
                                <ListGroup.Item variant="primary">
                                  This is a primary list group item
                                </ListGroup.Item>
                                <ListGroup.Item variant="secondary">
                                  This is a secondary list group item
                                </ListGroup.Item>
                                <ListGroup.Item variant="success">
                                  This is a success list group item
                                </ListGroup.Item>
                                <ListGroup.Item variant="danger">
                                  This is a danger list group item
                                </ListGroup.Item>
                                <ListGroup.Item variant="warning">
                                  This is a warning list group item
                                </ListGroup.Item>
                                <ListGroup.Item variant="info">
                                  This is a info list group item
                                </ListGroup.Item>
                                <ListGroup.Item variant="light">
                                  This is a light list group item
                                </ListGroup.Item>
                                <ListGroup.Item variant="dark">
                                  This is a dark list group item
                                </ListGroup.Item>
                              </ListGroup>
                            </div>
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                         <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-list-group">
  <ListGroup as="ul">
    <ListGroup.Item variant="">
      Dapibus ac facilisis in
    </ListGroup.Item>
    <ListGroup.Item variant="primary">
      This is a primary list group item
    </ListGroup.Item>
    <ListGroup.Item variant="secondary">
      This is a secondary list group item
    </ListGroup.Item>
    <ListGroup.Item variant="success">
      This is a success list group item
    </ListGroup.Item>
    <ListGroup.Item variant="danger">
      This is a danger list group item
    </ListGroup.Item>
    <ListGroup.Item variant="warning">
      This is a warning list group item
    </ListGroup.Item>
    <ListGroup.Item variant="info">
      This is a info list group item
    </ListGroup.Item>
    <ListGroup.Item variant="light">
      This is a light list group item
    </ListGroup.Item>
    <ListGroup.Item variant="dark">
      This is a dark list group item
    </ListGroup.Item>
  </ListGroup>
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
              <Row>
                <div className="col-lg-12">
                  <Tab.Container defaultActiveKey="Preview">
                    <Card name="list-tab" className="dz-card">
                      <Card.Header className="border-0">
                        <div>
                          <Card.Title>List Tab</Card.Title>
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
                            <div className="basic-list-group">
                              <Row>
                                <Tab.Container defaultActiveKey="#home">
                                  <Col lg="6" xl="2">
                                    <ListGroup className="mb-4" id="list-tab">
                                      <ListGroup.Item action href="#home">
                                        Home
                                      </ListGroup.Item>
                                      <ListGroup.Item action href="#profile">
                                        Profile
                                      </ListGroup.Item>
                                      <ListGroup.Item action href="#messages">
                                        Messages
                                      </ListGroup.Item>
                                      <ListGroup.Item action href="#settings">
                                        Settings
                                      </ListGroup.Item>
                                    </ListGroup>
                                  </Col>
                                  <Col lg="6" xl="10">
                                    <Tab.Content>
                                      <Tab.Pane eventKey="#home">
                                        <h4 className="mb-4">Home Tab Content</h4>
                                        <p>
                                          Velit aute mollit ipsum ad dolor consectetur nulla
                                          officia culpa adipisicing exercitation fugiat
                                          tempor. Voluptate deserunt sit sunt nisi aliqua
                                          fugiat proident ea ut. Mollit voluptate
                                          reprehenderit occaecat nisi ad non minim tempor sunt
                                          voluptate consectetur exercitation id ut nulla. Ea
                                          et fugiat aliquip nostrud sunt incididunt
                                          consectetur culpa aliquip eiusmod dolor. Anim ad
                                          Lorem aliqua in cupidatat nisi enim eu nostrud do
                                          aliquip veniam minim.
                                        </p>
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="#profile">
                                        <h4 className="mb-4">Profile Tab Content</h4>
                                        <p>
                                          Cupidatat quis ad sint excepteur laborum in esse
                                          qui. Et excepteur consectetur ex nisi eu do cillum
                                          ad laborum. Mollit et eu officia dolore sunt Lorem
                                          culpa qui commodo velit ex amet id ex. Officia anim
                                          incididunt laboris deserunt anim aute dolor
                                          incididunt veniam aute dolore do exercitation. Dolor
                                          nisi culpa ex ad irure in elit eu dolore. Ad laboris
                                          ipsum reprehenderit irure non commodo enim culpa
                                          commodo veniam incididunt veniam ad.
                                        </p>
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="#messages">
                                        <h4 className="mb-4">Messages Tab Content</h4>
                                        <p>
                                          Ut ut do pariatur aliquip aliqua aliquip
                                          exercitation do nostrud commodo reprehenderit aute
                                          ipsum voluptate. Irure Lorem et laboris nostrud amet
                                          cupidatat cupidatat anim do ut velit mollit
                                          consequat enim tempor. Consectetur est minim nostrud
                                          nostrud consectetur irure labore voluptate irure.
                                          Ipsum id Lorem sit sint voluptate est pariatur eu ad
                                          cupidatat et deserunt culpa sit eiusmod deserunt.
                                          Consectetur et fugiat anim do eiusmod aliquip nulla
                                          laborum elit adipisicing pariatur cillum.
                                        </p>
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="#settings">
                                        <h4 className="mb-4">Settings Tab Content</h4>
                                        <p>
                                          Irure enim occaecat labore sit qui aliquip
                                          reprehenderit amet velit. Deserunt ullamco ex elit
                                          nostrud ut dolore nisi officia magna sit occaecat
                                          laboris sunt dolor. Nisi eu minim cillum occaecat
                                          aute est cupidatat aliqua labore aute occaecat ea
                                          aliquip sunt amet. Aute mollit dolor ut exercitation
                                          irure commodo non amet consectetur quis amet culpa.
                                          Quis ullamco nisi amet qui aute irure eu. Magna
                                          labore dolor quis ex labore id nostrud deserunt
                                          dolor eiusmod eu pariatur culpa mollit in irure.
                                        </p>
                                      </Tab.Pane>
                                    </Tab.Content>
                                  </Col>
                                </Tab.Container>
                              </Row>
                            </div>
                          </Card.Body>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Code">
                          <div className="card-body pt-0 p-0 code-area">
<Highlight>
{`
<div className="basic-list-group">
  <Row>
    <Tab.Container defaultActiveKey="#home">
      <Col lg="6" xl="2">
        <ListGroup className="mb-4" id="list-tab">
          <ListGroup.Item action href="#home">
            Home
          </ListGroup.Item>
          <ListGroup.Item action href="#profile">
            Profile
          </ListGroup.Item>
          <ListGroup.Item action href="#messages">
            Messages
          </ListGroup.Item>
          <ListGroup.Item action href="#settings">
            Settings
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col lg="6" xl="10">
        <Tab.Content>
          <Tab.Pane eventKey="#home">
            <h4 className="mb-4">Home Tab Content</h4>
            <p>
              Velit aute mollit ipsum ad dolor consectetur nulla
              officia culpa adipisicing exercitation fugiat
              tempor. Voluptate deserunt sit sunt nisi aliqua
              fugiat proident ea ut. Mollit voluptate
              reprehenderit occaecat nisi ad non minim tempor sunt
              voluptate consectetur exercitation id ut nulla. Ea
              et fugiat aliquip nostrud sunt incididunt
              consectetur culpa aliquip eiusmod dolor. Anim ad
              Lorem aliqua in cupidatat nisi enim eu nostrud do
              aliquip veniam minim.
            </p>
          </Tab.Pane>
          <Tab.Pane eventKey="#profile">
            <h4 className="mb-4">Profile Tab Content</h4>
            <p>
              Cupidatat quis ad sint excepteur laborum in esse
              qui. Et excepteur consectetur ex nisi eu do cillum
              ad laborum. Mollit et eu officia dolore sunt Lorem
              culpa qui commodo velit ex amet id ex. Officia anim
              incididunt laboris deserunt anim aute dolor
              incididunt veniam aute dolore do exercitation. Dolor
              nisi culpa ex ad irure in elit eu dolore. Ad laboris
              ipsum reprehenderit irure non commodo enim culpa
              commodo veniam incididunt veniam ad.
            </p>
          </Tab.Pane>
          <Tab.Pane eventKey="#messages">
            <h4 className="mb-4">Messages Tab Content</h4>
            <p>
              Ut ut do pariatur aliquip aliqua aliquip
              exercitation do nostrud commodo reprehenderit aute
              ipsum voluptate. Irure Lorem et laboris nostrud amet
              cupidatat cupidatat anim do ut velit mollit
              consequat enim tempor. Consectetur est minim nostrud
              nostrud consectetur irure labore voluptate irure.
              Ipsum id Lorem sit sint voluptate est pariatur eu ad
              cupidatat et deserunt culpa sit eiusmod deserunt.
              Consectetur et fugiat anim do eiusmod aliquip nulla
              laborum elit adipisicing pariatur cillum.
            </p>
          </Tab.Pane>
          <Tab.Pane eventKey="#settings">
            <h4 className="mb-4">Settings Tab Content</h4>
            <p>
              Irure enim occaecat labore sit qui aliquip
              reprehenderit amet velit. Deserunt ullamco ex elit
              nostrud ut dolore nisi officia magna sit occaecat
              laboris sunt dolor. Nisi eu minim cillum occaecat
              aute est cupidatat aliqua labore aute occaecat ea
              aliquip sunt amet. Aute mollit dolor ut exercitation
              irure commodo non amet consectetur quis amet culpa.
              Quis ullamco nisi amet qui aute irure eu. Magna
              labore dolor quis ex labore id nostrud deserunt
              dolor eiusmod eu pariatur culpa mollit in irure.
            </p>
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Tab.Container>
  </Row>
</div>
`}
</Highlight>
</div>
                        </Tab.Pane>

                      </Tab.Content>    
                    </Card>
                  </Tab.Container>  
                </div>
              </Row>              
            </div>  
          </div>  
          <div className="demo-right ">
            <div className="demo-right-inner" id="right-sidebar">
                <h4 className="title">List Group</h4>
                <div className="dz-scroll demo-right-tabs">
                  <ul className="navbar-nav" id="menu-bar">
                        {sidebarLink.map((item, ind)=>(
                          <li key={ind}    
                            className={`${ind === activeLink ? 'active' :  ''}`}                      
                          >
                            <Link to={item.to} 
                              smooth={true}
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

export default UiListGroup;
