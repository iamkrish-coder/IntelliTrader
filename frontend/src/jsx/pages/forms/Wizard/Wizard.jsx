import React, { Fragment, useState } from "react";
import { Stepper, Step } from 'react-form-stepper';

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

const Wizard = () => {
	const [goSteps, setGoSteps] = useState(0);
	
	return (
		<Fragment>			
			<div className="row">
				<div className="col-xl-12 col-xxl-12">
					<div className="card">
						<div className="card-header">
							<h4 className="card-title">Form step</h4>
						</div>
						<div className="card-body">							
							<div className="form-wizard ">
								<Stepper className="nav-wizard" activeStep={goSteps}>
									<Step className="nav-link" onClick={() => setGoSteps(0)} />
									<Step className="nav-link" onClick={() => setGoSteps(1)} />
									<Step className="nav-link" onClick={() => setGoSteps(2)} />
									<Step className="nav-link" onClick={() => setGoSteps(3)} />
								</Stepper>
							{goSteps === 0 && (
								<>
									<StepOne />	
									<div className="text-end toolbar toolbar-bottom p-2">
										<button className="btn btn-primary sw-btn-prev disabled me-1">Prev</button>
										<button  className="btn btn-primary sw-btn-next" onClick={() => setGoSteps(1)}>Next</button>
									</div>	
								</>
							)}
							{goSteps === 1 && (
								<>
									<StepTwo />
									<div className="text-end toolbar toolbar-bottom p-2">
										<button  className="btn btn-secondary sw-btn-prev me-1" onClick={() => setGoSteps(0)}>Prev</button>
										<button className="btn btn-primary sw-btn-next ms-1" onClick={() => setGoSteps(2)}>Next</button>
									</div>	
								</>
							)}
							{goSteps === 2 && (
								<>
									<StepThree />
									<div className="text-end toolbar toolbar-bottom p-2">
										<button  className="btn btn-secondary sw-btn-prev me-1" onClick={() => setGoSteps(1)}>Prev</button>
										<button className="btn btn-primary sw-btn-next ms-1"  onClick={() => setGoSteps(3)}>Next</button>
									</div>	
								</>
							)}
							{goSteps === 3 && (
								<>
									<StepFour />
									<div className="text-end toolbar toolbar-bottom p-2">
										<button  className="btn btn-secondary sw-btn-prev me-1" onClick={() => setGoSteps(2)}>Prev</button>
										<button className="btn btn-primary sw-btn-next ms-1"  onClick={() => setGoSteps(1)}>Submit</button>
									</div>	
								</>	
							)}
							
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</Fragment>
	);
};

export default Wizard;
