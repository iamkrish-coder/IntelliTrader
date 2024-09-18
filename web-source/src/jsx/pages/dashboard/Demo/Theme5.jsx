import React,{useContext, useEffect} from 'react';
import { DashboardBlog } from './Theme1';

import { ThemeContext } from '../../../../context/ThemeContext';

const Theme5 = () => {
	const { changeBackground,
		changeNavigationHeader,
		changePrimaryColor,
		changeSideBarStyle,
		changeHeaderColor,
		changeSidebarColor,
	} = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
		changeSideBarStyle({ value: "compact", label: "Compact" });
		changeNavigationHeader('color_13');
		changeHeaderColor('color_13');
		changePrimaryColor('color_11');
		changeSidebarColor('color_13');
	}, []);	
	return(
		<>
			<DashboardBlog />
		</>
	)
}
export default Theme5;