import React, {useEffect, useRef} from 'react';
import "./preview.css";

type PreviewProps = {
	code: string;
}
const html = `
		<html lang="en">
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

const Preview: React.FC<PreviewProps> = ({code}) => {
	const iframeRef = useRef <any>();

	useEffect(()=> {
		iframeRef.current.srcdoc = html;
		iframeRef.current.contentWindow.postMessage(code, '*')
	},[code]);


	return (
		<div className='preview-wrapper'>
			<iframe
				ref={iframeRef}
				title='users-code'
				srcDoc={html}
				sandbox='allow-scripts'
			/>
		</div>
	);
};

export default Preview;