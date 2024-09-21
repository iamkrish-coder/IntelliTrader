import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { SVGICON } from '../constant/theme';

const DropdownBlog = (props) => {
    return (
        <Dropdown className="custom-dropdown">
            <Dropdown.Toggle as="div" className={`btn sharp btn-primary tp-btn i-false ${props.color}`}>
                {SVGICON.DropdownIcon}
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item>Option 1</Dropdown.Item>
                <Dropdown.Item>Option 2</Dropdown.Item>
                <Dropdown.Item>Option 3</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>   
    );
};

export default DropdownBlog;