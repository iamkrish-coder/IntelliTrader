import React,{useContext, useEffect} from 'react';
import { DashboardBlog } from './Theme1';

import { ThemeContext } from '../../../../context/ThemeContext';

const Theme6 = () => {
	const { changeBackground,
		changeNavigationHader,
		changePrimaryColor,
		changeSideBarStyle,
		changeSideBarPostion,		
	} = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
		changeSideBarStyle({ value: "modern", label: "Modern" });
		changeNavigationHader('color_1');		
		changePrimaryColor('color_11');
		changeSideBarPostion({ value: "static", label: "Static" });		
	}, []);	
	return(
		<>
			<DashboardBlog />
		</>
	)
}
export default Theme6;