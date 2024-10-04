import * as esbuild from 'esbuild-wasm';
import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";
import {fetchPlugin} from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

const App = () => {
	const iframeRef = useRef<any>()
	const [input, setInput] = useState('');

	const esbuildInitializedRef = useRef<Boolean>(false);

	const html = `
		<html>
			<head></head>
			<body>
				<div id="user-root"></div>
				<script>
					window.addEventListener('message', (e) => {
						try{
							eval(e.data);
						}catch (err) {
							console.error(err);
							const userRoot = document.querySelector('#user-root');
							userRoot.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
						}
					},false);
				</script>
			</body>
		</html>	
	`;

	const onClickHandler = async () => {
		if(!esbuildInitializedRef.current) return;

		iframeRef.current.srcdoc = html;

		try{
			const res = await esbuild.build({
				entryPoints: ['index.js'],
				bundle: true,
				write: false,
				plugins: [unpkgPathPlugin(), fetchPlugin(input)],
				define: {
					'process.env.NODE_ENV': '"production"',
					global: 'window',
				}
			});


			iframeRef.current.contentWindow.postMessage(res.outputFiles[0].text, '*')
		}catch(err){
			console.error(err);
		}
	};

	const startService = useCallback(async () => {
		try {
			await esbuild.initialize({
				worker: true,
				wasmURL: 'https://unpkg.com/esbuild-wasm@latest/esbuild.wasm'
		});
			esbuildInitializedRef.current = true;
			console.log("esbuild initialized successfully");
		} catch(err) {
			esbuildInitializedRef.current = false;
			console.error(err)
		}
	}, []);

	useEffect(()=> {
		startService();
	}, [startService]);




	return (
		<div>
			<CodeEditor />
			<textarea value={input} onChange={(e:ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}></textarea>
			<div>
				<button onClick={onClickHandler}>Submit</button>
			</div>

			<iframe ref={iframeRef} title='users-code' srcDoc={html} sandbox='allow-scripts'/>
		</div>
	);
};

export default App;