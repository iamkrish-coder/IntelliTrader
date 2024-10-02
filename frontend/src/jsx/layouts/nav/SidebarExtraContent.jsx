import React from 'react';
import { SVGICON } from '../../constant/theme';
import { useLocation } from 'react-router-dom';

// let path = window.location.pathname;
// path = path.split("/");
// path = path[path.length - 1];

const SidebarExtraContent = () => {	
	const location = useLocation();
	const { pathname } = location;
	const compare = ['/dashboard', '/dashboard-dark'];

    return (
        <>            
			<div className={`feature-box ${compare.includes(pathname) ? '' : 'style-3' }`}>
				<div className="wallet-box">
					{SVGICON.SideWalletSvgIcon}
					<div className="ms-3">
						<h4 className="text-white mb-0 d-block">Rs. 0.0</h4>
						<small>Account Balance</small>
					</div>
				</div>
			</div>
        </>
    );
};

export default SidebarExtraContent;