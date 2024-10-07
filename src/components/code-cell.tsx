import React, {useState} from 'react';
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

const CodeCell = () => {
	const [input, setInput] = useState('');
	const [code,setCode] = useState('')

	const onClickHandler = async () => {
		const output = await bundle(input);
		if(output) setCode(output);
	};

	return (
		<Resizable direction={'vertical'}>
			<div style={{
				height: '100%',
				display: 'flex',
				flexDirection: 'row'
			}}>
				<CodeEditor onChange={(value) => setInput(value)} initialValue='const i = 1'/>
				<Preview code={code}/>
			</div>
		</Resizable>

	);
};


export default CodeCell;