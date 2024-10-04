import styles from './code-editor.module.css'
import MonacoEditor, {type OnMount} from '@monaco-editor/react';
import React, {useRef} from "react";
import {editor} from "monaco-editor";
import prettier from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import 'bulmaswatch/darkly/bulmaswatch.min.css';


type CodeEditorProps = {
	initialValue: string;
	onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({initialValue,onChange}) => {
	const editorRef = useRef<editor.IStandaloneCodeEditor>()
	const  onFormatClick = async () => {
		if (!editorRef.current) return;
		//get cur value from editor
		const unformatted = editorRef.current.getValue();

		// format that value
		const formatted = await prettier.format(unformatted, {
			parser: 'babel',
			plugins: [babelPlugin,estreePlugin],
			useTabs: false,
			semi: true,
			singleQuote: true,
		}).then(res => res.replace(/\n$/,""));

		//set the formatted value back in the editor
		editorRef.current.setValue(formatted)
	};

	const onEditorMount: OnMount = (editor, _monaco) => {

		editorRef.current = editor;
		editor.onDidChangeModelContent(() => onChange(editor.getValue()));
	};

	return <div className={`${styles['editor-wrapper']}`}>
		<button
			className={`button ${styles['button-format']} is-primary is-small`}
			onClick={onFormatClick}>Format</button>
		<MonacoEditor
			onMount={onEditorMount}
			value={initialValue}
			theme="vs-dark"
			height='500px'
			language='javascript'
			options={{
				wordWrap: 'on',
				minimap: {enabled: false,},
				showUnused: false,
				folding: false,
				lineNumbersMinChars: 3,
				fontSize: 16,
				scrollBeyondLastLine: false,
				automaticLayout: true,
				tabSize: 2
			}} />
	</div>
};

export default CodeEditor