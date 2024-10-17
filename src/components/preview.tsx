import React, { useEffect, useRef } from "react";
import "./preview.css";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { selectBundlesData } from "../redux/selectors";

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
type PreviewProps = {
  cellId: string;
};
const Preview: React.FC<PreviewProps> = ({ cellId }) => {
  const iframeRef = useRef<any>();
  const bundle = useTypedSelector((state) => {
    return selectBundlesData(state, cellId);
  });

  // console.log(bundle.code, bundle.err);
  useEffect(() => {
    if (bundle) {
      iframeRef.current.srcdoc = html;
      setTimeout(() => {
        iframeRef.current.contentWindow.postMessage(bundle.code, "*");
      }, 50);
    }
  }, [bundle?.code]);

  if (!bundle) {
    return null;
  }
  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframeRef}
        title="users-code"
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {bundle.err && <div className={"preview-error"}>{bundle.err}</div>}
    </div>
  );
};

export default Preview;
