import React from 'react';
import { SVGICON } from '../../constant/theme';
import { useLocation } from 'react-router-dom';

// let path = window.location.pathname;
// path = path.split("/");
// path = path[path.length - 1];

const SidebarExtraContent = () => {	
	const location = useLocation();
	const { pathname } = location;
	const compare = ['/dashboard', '/index-2'];

    return (
        <>            
			<div className={`feature-box ${compare.includes(pathname) ? '' : 'style-3' }`}>
				<div className="wallet-box">
					{SVGICON.SideWalletSvgIcon}
					<div className="ms-3">
						<h4 className="text-white mb-0 d-block">$2353.25</h4>
						<small>Withdraw Money</small>
					</div>
				</div>
				{compare.includes(pathname) ?  
					<div className="d-flex justify-content-center align-items-center">
						<div className="item-1">
							{SVGICON.UserFollower}
							<h4 className="mb-0 text-white"><span className="counter">2023</span>k</h4>
							<small>Followers</small>
						</div>
						<div className="item-1">
							{SVGICON.UserFollowing}
							<h4 className="mb-0 text-white"><span className="counter">2024</span>k</h4>
							<small>Following</small>
						</div>
					</div>	
					:
					''
				}				
			</div>
        </>
    );
};

export default SidebarExtraContent;