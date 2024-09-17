import React,{useContext, useEffect} from 'react';
import { DashboardBlog } from './Theme1';

import { ThemeContext } from '../../../../context/ThemeContext';

const Theme2 = () => {
	const { changeBackground,		
		changeNavigationHader
	} = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });
		changeNavigationHader('color_1');	
	}, []);
	
	return(
		<>
			<DashboardBlog />
		</>
	)
}
export default Theme2;