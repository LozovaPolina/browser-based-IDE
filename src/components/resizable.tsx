import React, {type ReactNode, useEffect, useState} from 'react';
import {ResizableBox, type ResizableBoxProps} from "react-resizable";
import "./resizable.css";
type ResizableProps = {
	direction: 'horizontal' | 'vertical';
	children: ReactNode;


}

const Resizable: React.FC<ResizableProps> = ({direction,children}) => {
	const [innerHeight,setInnerHeight] = useState(window.innerHeight);
	const [innerWidth,setInnerWidth] = useState(window.innerWidth);
	const [width,setWidth]= useState(window.innerWidth*0.75);


	let resizableProps: ResizableBoxProps;

	useEffect(() => {
		let timer: NodeJS.Timeout

		const listener = () => {
			if(timer) clearTimeout(timer)
			timer = setTimeout(()=> {
				setInnerHeight(window.innerHeight);
				setInnerWidth(window.innerWidth);
				if(window.innerWidth* 0.75 < width) {
					setWidth(window.innerWidth * 0.75);
				}
			},100)

		};

		window.addEventListener('resize', listener);

		return () => window.removeEventListener('resize', listener);
	}, [])

	if(direction === 'horizontal') {
		resizableProps = {
			className: 'resize-horizontal',
			minConstraints:[innerWidth * 0.2, Infinity],
			maxConstraints:[innerWidth * 0.75, Infinity],
			height:Infinity,
			width,
			resizeHandles:['e'],
			onResizeStop: (e,data) => setWidth(data.size.width)

		}
	}else  {
		resizableProps = {
			minConstraints:[Infinity, innerHeight * 0.2],
			maxConstraints:[Infinity, innerHeight * 0.9],
			height:300,
			width:Infinity,
			resizeHandles:['s'],
		}
	}
	return (
		<ResizableBox {...resizableProps}>
			{children}
		</ResizableBox>
	);
};

export default Resizable;