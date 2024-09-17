import {Tab, Nav} from 'react-bootstrap';

import ChartwidgetCanvas4 from './ChartwidgetCanvas4';

const ActivityTab = () =>{
	return(
		<>
			<Tab.Container defaultActiveKey="Sale">
				<div className="card-body pt-0">
					<div className="custom-tab-1 widget-cart-tab">
						<Nav as="ul" className="nav nav-tabs mb-2">
							<Nav.Item as="li">
								<Nav.Link eventKey="Sale">Sale</Nav.Link>
							</Nav.Item>
							<Nav.Item as="li">
								<Nav.Link  eventKey="Overview">Overview</Nav.Link>
							</Nav.Item>
						</Nav>
						<Tab.Content>
							<Tab.Pane eventKey="Sale">
								<ChartwidgetCanvas4 />
							</Tab.Pane>
							<Tab.Pane eventKey="Overview">
								<div className="pt-4 text-white">
									<h4 className="text-white">This is home title</h4>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.
									</p>
									<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.
									</p>
								</div>
							</Tab.Pane>
						</Tab.Content>	
					</div>
				</div>
			</Tab.Container>	
		</>
	)
}
export default ActivityTab;