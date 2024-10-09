import React, { useEffect, useRef } from "react";
import "./preview.css";

type PreviewProps = {
  code: string;
  bundlingError: string;
};
const html = `
		<html lang="en">
			<head></head>
			<body>
				<div id="root"></div>
				<script>
					const handleError = (err) => {
						const userRoot = document.querySelector('#root');
						userRoot.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
						console.error(err);
					}
					window.addEventListener('error', (e) => {
						e.preventDefault();
						handleError(e.error);
					});
					window.addEventListener('message', (e) => {
						try{
							eval(e.data);
						}catch (err) {
							handleError(err);
						}
					},false);
				</script>
			</body>
		</html>	
	`;

const Preview: React.FC<PreviewProps> = ({ code, bundlingError }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframeRef}
        title="users-code"
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {bundlingError && <div className={"preview-error"}>{bundlingError}</div>}
    </div>
  );
};

export default Preview;
