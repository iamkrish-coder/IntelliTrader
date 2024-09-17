import React, { useReducer } from "react";
import {Link} from 'react-router-dom';
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";


const init =  false;

const reducer = (state, active) =>{
	switch(active.type){
		case 'basicModal' :
			return { ...state, basicModal: !state.basicModal}
		case 'contentModal'	:
			return { ...state, contentModal: !state.contentModal}
		case 'modalCentered'	:
			return { ...state, modalCentered: !state.modalCentered}
		case 'modalWithTooltip'	:
			return { ...state, modalWithTooltip: !state.modalWithTooltip}		
		case 'gridInsideModal'	:
			return { ...state, gridInsideModal: !state.gridInsideModal}
		case 'largeModal'	:
			return { ...state, largeModal: !state.largeModal}
		case 'smallModal'	:
			return { ...state, smallModal: !state.smallModal}		
		default:
			return state;
	}	
}

const UiModal = () => {
  const [state ,dispatch] = useReducer(reducer, init);
  return (
   	 
		<>
		  <Row>
			<Col>
			  <Card>
				<Card.Header>
				  <Card.Title>Bootstrap Modal</Card.Title>
				</Card.Header>
				<Card.Body>
				  <p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
					minima! Eligendi minima illum itaque harum aliquam vel, sunt
					magni dolorem! Cum quaerat est cupiditate saepe quidem, fugiat
					in at magni ad provident distinctio eum tempore laboriosam
					adipisci, tempora cumque ex quis unde voluptatem consequuntur.
					Excepturi quibusdam accusamus deleniti officiis ullam
					repellendus magni unde? Saepe quibusdam vel, ipsum numquam
					ratione tempore. Dolor optio aliquid in velit eaque, sed
					delectus reprehenderit quam quidem a eum id nostrum ullam
					obcaecati error deleniti modi quasi harum possimus voluptatum
					repellat saepe! Omnis dolor maiores eaque deserunt
					exercitationem incidunt autem et voluptatibus molestias quod
					explicabo ipsam nam vitae a architecto, consectetur quas facilis
					sed nulla, placeat eum ex, ducimus in. Hic quo necessitatibus
					autem tempora provident!
				  </p>
				  <div className="bootstrap-modal">
					{/* <!-- Button trigger modal --> */}
					<Button variant="primary" className="mb-2 me-1" onClick={() => dispatch({type:'basicModal'})}>
					  Basic modal
					</Button>
					
					{/* <!-- Button trigger modal --> */}
					<Button variant="primary" className="mb-2 me-1" onClick={() =>dispatch({type:'contentModal'})}>Long content Modal</Button>
					
					{/* <!-- Button trigger modal --> */}
					<Button variant="primary" type="button" className="mb-2 me-1" onClick={() => dispatch({type:'modalCentered'})}>
						Modal centered
					</Button>
					{/* <!-- Modal --> */}
					

					{/* <!-- Button trigger modal --> */}
					<Button variant="primary" className="mb-2 me-1" onClick={() => dispatch({type:'modalWithTooltip'})}>Modal with tooltip</Button>
					{/* <!-- Modal --> */}
					

					{/* <!-- Button trigger modal --> */}
					<Button variant="primary" className="mb-2 me-1" onClick={() => dispatch({type:'gridInsideModal'})}>Grid Inside Modal</Button>
					

					{/* <!-- Large modal --> */}
					<Button
					  variant="primary"
					  className="mb-2 me-1"
					  onClick={() => dispatch({type:'largeModal'})}
					>
					  Large modal
					</Button>
					

					{/* <!-- Small modal --> */}
					<Button variant="primary" className="mb-2 me-2" onClick={() => dispatch({type:'smallModal'})}>Small modal</Button>
					
				  </div>
				</Card.Body>
			  </Card>
			</Col>
		  </Row>
		  {/* <!-- Modal --> */}
			<Modal className="fade" show={state.basicModal} onHide={()=>dispatch({type:'basicModal'})}>
				<Modal.Header>
					<Modal.Title>Modal title</Modal.Title>
					<Button variant="" className="btn-close" onClick={() => dispatch({type:'basicModal'})}></Button>
				</Modal.Header>
				<Modal.Body>Modal body text goes here.</Modal.Body>
				<Modal.Footer>
					<Button  variant="danger light" onClick={() => dispatch({type:'basicModal'})}>Close</Button>
					<Button variant="primary">Save changes</Button>
				</Modal.Footer>
			</Modal>
			{/* <!-- Modal --> */}
			<Modal className="fade" show={state.contentModal} onHide={()=>dispatch({type:'contentModal'})}>
				<Modal.Header>
					<Modal.Title>Modal title</Modal.Title>
					<Button variant="" className="btn-close" onClick={() =>dispatch({type:'contentModal'})}></Button>
				</Modal.Header>
				<Modal.Body>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</p>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</p>
					<p>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur et.
						Donec sed odio dui. Donec ullamcorper nulla non metus
						auctor fringilla.
					</p>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</p>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</p>
					<p>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur et.
						Donec sed odio dui. Donec ullamcorper nulla non metus
						auctor fringilla.
					</p>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</p>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</p>
					<p>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur et.
						Donec sed odio dui. Donec ullamcorper nulla non metus
						auctor fringilla.
					</p>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</p>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</p>
					<p>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur et.
						Donec sed odio dui. Donec ullamcorper nulla non metus
						auctor fringilla.
					</p>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</p>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</p>
					<p>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur et.
						Donec sed odio dui. Donec ullamcorper nulla non metus
						auctor fringilla.
					</p>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras
						justo odio, dapibus ac facilisis in, egestas eget quam.
						Morbi leo risus, porta ac consectetur ac, vestibulum at
						eros.
					</p>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur et. Vivamus sagittis lacus vel augue laoreet
						rutrum faucibus dolor auctor.
					</p>
					<p>
						Aenean lacinia bibendum nulla sed consectetur. Praesent
						commodo cursus magna, vel scelerisque nisl consectetur et.
						Donec sed odio dui. Donec ullamcorper nulla non metus
						auctor fringilla.
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger light" onClick={() => dispatch({type:'contentModal'})}>Close</Button>
					<Button variant="primary">Save changes</Button>
				</Modal.Footer>
			</Modal>
			
			
			<Modal className="fade" show={state.modalWithTooltip} onHide={()=>dispatch({type:'modalWithTooltip'})} centered>
				<Modal.Header>
					<Modal.Title>Modal title</Modal.Title>
					<Button variant="" className="btn-close" onClick={() => dispatch({type:'modalWithTooltip'})}></Button>
				</Modal.Header>
			  <Modal.Body>
				<h5>Popover in a modal</h5>
				<p>
				  This{" "}
				  <Link to={"#"} 
					role="button"
					data-container="body"
					data-toggle="popover"
					className="btn btn-secondary popover-test btn-sm"
					title="Popover title"
					data-content="Popover body content is set in this attribute."
				  >
					button
				  </Link>{" "}
				  triggers a popover on click.
				</p>
				<hr />
				<h5>Tooltips in a modal</h5>
				<p>
				  <Link to={"#"}
					className="tooltip-test text-primary"
					data-toggle="tooltip"
					title="Told you!"
				  >
					This link
				  </Link>{" "}
				  and{" "}
				  <Link to={"#"}
					className="tooltip-test text-primary"
					data-toggle="tooltip"
					title="Another one!"
				  >
					that link
				  </Link>{" "}
				  have tooltips on hover.
				</p>
			  </Modal.Body>
				<Modal.Footer>
					<Button variant="danger light"	onClick={() => dispatch({type:'modalWithTooltip'})}>Close</Button>
					<Button variant="primary">Save changes</Button>
				</Modal.Footer>
			</Modal>
			
			{ /* center modal */}
			<Modal className="fade" show={state.modalCentered} onHide={()=>dispatch({type:'modalCentered'})} centered>
				<Modal.Header>
					<Modal.Title>Modal title</Modal.Title>
					<Button onClick={() => dispatch({type:'modalCentered'})} variant="" className="btn-close"></Button>
				</Modal.Header>
			  <Modal.Body>
				<p>
					Cras mattis consectetur purus sit amet fermentum. Cras
					justo odio, dapibus ac facilisis in, egestas eget quam.
					Morbi leo risus, porta ac consectetur ac, vestibulum at
					eros.
				</p>
			  </Modal.Body>
			  <Modal.Footer>
				<Button
					onClick={() => dispatch({type:'modalCentered'})}
					variant="danger light"
				>
				  Close
				</Button>
				<Button variant="primary">Save changes</Button>
			  </Modal.Footer>
			</Modal>
			{/* <!-- Modal --> */}
			<Modal className="fade" show={state.gridInsideModal} onHide={()=>dispatch({type:'gridInsideModal'})}>
				<Modal.Header>
					<Modal.Title>Modal title</Modal.Title>
					<Button variant="" className="btn-close" onClick={() => dispatch({type:'gridInsideModal'})}></Button>
				</Modal.Header>
				<Modal.Body>
					<Container>
					  <Row>
						<Col md="4">.col-md-4</Col>
						<Col md="4" className="ms-auto">
						  .col-md-4 .ms-auto
						</Col>
					  </Row>
					  <Row>
						<Col md="3" className="ms-auto">
						  .col-md-3 .ms-auto
						</Col>
						<Col md="2" className="ms-auto">
						  .col-md-2 .ms-auto
						</Col>
					  </Row>
					  <Row>
						<Col md="6" className="ms-auto">
						  .col-md-6 .ms-auto
						</Col>
					  </Row>
					  <Row>
						<Col sm="9">
						  Level 1: .col-sm-9
						  <Row>
							<Col sm="6">Level 2: .col-8 .col-sm-6</Col>
							<Col sm="6">Level 2: .col-4 .col-sm-6</Col>
						  </Row>
						</Col>
					  </Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger light" onClick={() => dispatch({type:'gridInsideModal'})}>Close</Button>
					<Button variant="primary">Save changes</Button>
				</Modal.Footer>
			</Modal>
			{/* large modal */}
			<Modal className="fade bd-example-modal-lg" show={state.largeModal} size="lg" onHide={()=>dispatch({type:'largeModal'})}>
				<Modal.Header>
					<Modal.Title>Modal title</Modal.Title>
					<Button variant="" className="btn-close" onClick={() => dispatch({type:'largeModal'})}></Button>
				</Modal.Header>
				<Modal.Body>Modal body text goes here.</Modal.Body>
				<Modal.Footer>
					<Button
					  variant="danger light"
					  onClick={() => dispatch({type:'largeModal'})}
					>
					  Close
					</Button>
					<Button
					  variant=""
					  type="button"
					  className="btn btn-primary"
					>
					  Save changes
					</Button>
			  </Modal.Footer>
			</Modal>
			{/* smallModal */}	
			<Modal className="fade bd-example-modal-sm" size="sm" show={state.smallModal} onHide={()=>dispatch({type:'smallModal'})}>
			  <Modal.Header>
				<Modal.Title>Modal title</Modal.Title>
				<Button
				  variant=""
				  className="btn-close"
				  onClick={() => dispatch({type:'smallModal'})}
				>
				  
				</Button>
			  </Modal.Header>
			  <Modal.Body>Modal body text goes here.</Modal.Body>
			  <Modal.Footer>
				<Button
				  variant="danger light"
				  onClick={() => dispatch({type:'smallModal'})}
				>
				  Close
				</Button>
				<Button variant="primary">Save changes</Button>
			  </Modal.Footer>
			</Modal>
			
		</>
		
	);
};

export default UiModal;
