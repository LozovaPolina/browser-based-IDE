import React, {type ReactNode} from 'react';
import {ResizableBox} from "react-resizable";
import "./resizable.css";
type ResizableProps = {
	direction: 'horizontal' | 'vertical';
	children: ReactNode;


}

const Resizable: React.FC<ResizableProps> = ({direction,children}) => {

	return (
		<ResizableBox
			minConstraints={[Infinity, 80]}
			maxConstraints={[Infinity, window.innerHeight * 0.9]}
			height={300}
		  	width={Infinity}
		  	resizeHandles={['s']}>
			{children}
		</ResizableBox>
	);
};

export default Resizable;