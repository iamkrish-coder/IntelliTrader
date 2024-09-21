import React, { Fragment } from 'react'
import {Link} from 'react-router-dom';

/// Image
import avatar1 from '../../../assets/images/avatar/1.jpg'
import avatar2 from '../../../assets/images/avatar/2.jpg'
import avatar3 from '../../../assets/images/avatar/3.jpg'
import avatar7 from '../../../assets/images/avatar/7.jpg'
import avatar4 from '../../../assets/images/avatar/4.jpg'
import avatar5 from '../../../assets/images/avatar/5.jpg'
import avatar6 from '../../../assets/images/avatar/6.jpg'
import avatar8 from '../../../assets/images/avatar/8.jpg'

/// Bootstrap
import { Row, Col, Card } from 'react-bootstrap'

const UiMediaObject = () => {
  const heading = 'Media heading'
  const text =
    'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.'
  const text2 =
    ' Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fuscecondimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus. vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.'
  const text3 =
    'Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'

  return (
    <Fragment>      
      
      <Row>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Media Object</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <div className="media">
                  <img
                    className='me-3 img-fluid '
                    width='60'
                    src={avatar1}
                    alt='DexignZone'
                  />
                  <div className='media-body'>
                    <h5 className='mt-0'>{heading}</h5>
                    <p className='mb-0'>{text}</p>
                  </div>
                </div>
                <div className='media mt-4'>
                  <img
                    className='me-3 img-fluid '
                    width='60'
                    src={avatar7}
                    alt='DexignZone'
                  />
                  <div className='media-body'>
                    <h5 className='mt-0'>{heading}</h5>
                    <p className='mb-0'>{text}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Nesting</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <div className="media">
                  <img
                    className='me-3 '
                    width='60'
                    src={avatar2}
                    alt='DexignZone'
                  />
                  <div className='media-body'>
                    <h5 className='mt-0'>{heading}</h5>
                    <p className='mb-0'>{text}</p>

                    <div className='media mt-4'>
                      <Link to={"#"} className='pe-3'>
                        <img
                          className=''
                          width='60'
                          src={avatar3}
                          alt='DexignZone'
                        />
                      </Link>
                      <div className='media-body'>
                        <h5 className='mt-0'>{heading}</h5>
                        <p className='mb-0'>{text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Align Top</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <div className="media">
                  <img
                    className='align-self-start me-3 '
                    width='60'
                    src={avatar4}
                    alt='DexignZone'
                  />
                  <div className='media-body'>
                    <h5 className='mt-0'>Top-aligned media</h5>
                    <p>{text}</p>
                    <p className='mb-0'>{text3}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Align Center</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <div className="media">
                  <img
                    className='align-self-center me-3 '
                    width='60'
                    src={avatar5}
                    alt='DexignZone'
                  />
                  <div className='media-body'>
                    <h5 className='mt-0'>Center-aligned media</h5>
                    <p>{text}</p>
                    <p className='mb-0'>{text3}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Align Bottom</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <div className="media">
                  <img
                    className='align-self-end me-3 '
                    width='60'
                    src={avatar6}
                    alt='DexignZone'
                  />
                  <div className='media-body'>
                    <h5 className='mt-0'>Bottom-aligned media</h5>
                    <p>{text}</p>
                    <p className='mb-0'>{text3}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card>
            <Card.Header>
              <Card.Title>Order</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <div className="media">
                  <div className='media-body'>
                    <h5 className='mt-0'>Media object</h5>
                    <p className='mb-0'>{text}</p>
                  </div>
                  <img
                    className='ms-3 '
                    width='60'
                    src={avatar7}
                    alt='DexignZone'
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <div className='col-lg-12'>
          <Card>
            <Card.Header>
              <Card.Title>Media list</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className='bootstrap-media'>
                <ul className='list-unstyled'>
                  <li className='media'>
                    <img
                      className='me-3 '
                      width='60'
                      src={avatar8}
                      alt='DexignZone'
                    />
                    <div className='media-body'>
                      <h5 className='mt-0'>List-based media object</h5>
                      <p className='mb-0'>{text2}</p>
                    </div>
                  </li>
                  <li className='media my-4'>
                    <img
                      className='me-3 '
                      width='60'
                      src={avatar1}
                      alt='DexignZone'
                    />
                    <div className='media-body'>
                      <h5 className='mt-0'>List-based media object</h5>
                      <p className='mb-0'>{text2}</p>
                    </div>
                  </li>
                  <li className='media'>
                    <img
                      className='me-3 '
                      width='60'
                      src={avatar2}
                      alt='DexignZone'
                    />
                    <div className='media-body'>
                      <h5 className='mt-0'>List-based media object</h5>
                      <p className='mb-0'>{text2}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Fragment>
  )
}

export default UiMediaObject
