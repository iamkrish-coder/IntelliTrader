import React,{useContext, useEffect} from 'react';
import { DashboardBlog } from './Theme1';

import { ThemeContext } from '../../../../context/ThemeContext';

const Theme2 = () => {
	const { changeBackground,		
		changeNavigationHeader
	} = useContext(ThemeContext);
	useEffect(() => {
		changeBackground({ value: "dark", label: "Dark" });
		changeNavigationHeader('color_1');
	}, []);
	
	return(
		<>
			<DashboardBlog />
		</>
	)
}
export default Theme2;