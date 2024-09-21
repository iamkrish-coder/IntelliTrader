import React,{useContext, useEffect} from 'react';
import { DashboardBlog } from './Theme1';

import { ThemeContext } from '../../../../context/ThemeContext';

const Theme3 = () => {
	const { changeBackground,
		changeNavigationHeader,
		changeSidebarColor,
		changeHeaderColor,
		changeSideBarPostion,
		changeHeaderPostion,
		changeSideBarStyle		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
		changeSideBarStyle({ value: "modern", label: "Modern" });
		changeNavigationHeader('color_14');
		changeHeaderColor('color_14');
		changeSidebarColor('color_13');
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