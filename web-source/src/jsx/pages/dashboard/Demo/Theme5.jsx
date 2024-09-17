import React,{useContext, useEffect} from 'react';
import { DashboardBlog } from './Theme1';

import { ThemeContext } from '../../../../context/ThemeContext';

const Theme5 = () => {
	const { changeBackground,
		changeNavigationHader,
		changePrimaryColor,
		changeSideBarStyle,
		chnageHaderColor,
		chnageSidebarColor,
	} = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
		changeSideBarStyle({ value: "compact", label: "Compact" });
		changeNavigationHader('color_13');
		chnageHaderColor('color_13');
		changePrimaryColor('color_11');
		chnageSidebarColor('color_13');				
	}, []);	
	return(
		<>
			<DashboardBlog />
		</>
	)
}
export default Theme5;