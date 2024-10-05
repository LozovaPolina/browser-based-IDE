
import React, { useState} from 'react';

import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";
import bundle from "./bundler";

const App = () => {
	const [input, setInput] = useState('');
	const [code,setCode] = useState('')

	const onClickHandler = async () => {
		const output = await bundle(input);
		if(output) setCode(output);
	};

	return (
		<div>
			<CodeEditor onChange={(value) => setInput(value)} initialValue='const i = 1' />
			<div>
				<button onClick={onClickHandler}>Submit</button>
			</div>
			<Preview code={code}/>
		</div>
	);
};

export default App;