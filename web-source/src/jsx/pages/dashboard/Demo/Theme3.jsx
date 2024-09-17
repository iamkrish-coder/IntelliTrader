import React,{useContext, useEffect} from 'react';
import { DashboardBlog } from './Theme1';

import { ThemeContext } from '../../../../context/ThemeContext';

const Theme3 = () => {
	const { changeBackground,
		changeNavigationHader,		
		chnageSidebarColor,
		chnageHaderColor,
		changeSideBarPostion,
		changeHeaderPostion,
		changeSideBarStyle		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
		changeSideBarStyle({ value: "modern", label: "Modern" });
		changeNavigationHader('color_14');
		chnageHaderColor('color_14');		
		chnageSidebarColor('color_13');		
		changeSideBarPostion({ value: "static", label: "Static" });
		changeHeaderPostion({ value: "static", label: "Static" });
	}, []);

	
	return(
		<>
			<DashboardBlog />
		</>
	)
}
export default Theme3;