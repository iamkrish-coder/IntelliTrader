import React,{useContext, useEffect} from 'react';
import { DashboardBlog } from './Theme1';

import { ThemeContext } from '../../../../context/ThemeContext';

const Theme4 = () => {
	const { changeBackground,
		changeNavigationHader,		
		chnageHaderColor,
		chnageSidebarColor,
	} = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
		changeNavigationHader('color_10');
		chnageHaderColor('color_2');		
		chnageSidebarColor('color_2');			
	}, []);
		
	return(
		<>
			<DashboardBlog />
		</>
	)
}
export default Theme4;