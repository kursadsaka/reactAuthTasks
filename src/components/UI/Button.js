import { memo } from 'react';

import classes from './Button.module.css';

const Button = (props) => {
	return (
		<button
			type={props.type || 'button'}
			className={`${classes.button} ${props.className ? props.className : ''}`}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.isLoading ? '...' : props.children}
		</button>
	);
};

export default memo(Button);
