import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../../../context/ThemeContext';
import { MainComponent } from '../Home';
import { useLocation } from 'react-router-dom';

const Theme1 = () => {
	
	const locact = useLocation().search

	const { changeBackground, 
		changeNavigationHeader,
		changeHeaderColor,
		changePrimaryColor,
	} = useContext(ThemeContext);
	useEffect(() => {
		if(locact==='theme=2'){
			changeBackground({ value: "light", label: "Light" });
			changeNavigationHeader('color_13')
			changeHeaderColor('color_13')
			changePrimaryColor('color_13')
		}else{
			changeNavigationHeader('color_3')
			changeHeaderColor('color_3')
			changePrimaryColor('color_1')
		}
	}, []);	
	return (
		<MainComponent />
	);
};

export default Theme1;