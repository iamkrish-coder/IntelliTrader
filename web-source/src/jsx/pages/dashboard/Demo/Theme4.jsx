import React,{useContext, useEffect} from 'react';
import { DashboardBlog } from './Theme1';

import { ThemeContext } from '../../../../context/ThemeContext';

const Theme4 = () => {
	const { changeBackground,
		changeNavigationHeader,
		changeHeaderColor,
		changeSidebarColor,
	} = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
		changeNavigationHeader('color_10');
		changeHeaderColor('color_2');
		changeSidebarColor('color_2');
	}, []);
		
	return(
		<>
			<DashboardBlog />
		</>
	)
}
export default Theme4;