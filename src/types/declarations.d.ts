// declarations.d.ts
declare module '*.module.css' {
	const styles: { [key: string]: string };
	export default styles;
}

declare module 'monaco-jsx-highlighter'