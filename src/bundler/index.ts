import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";
import {fetchPlugin} from "./plugins/fetch-plugin";

let isServiceInitialized: boolean = false;

const bundle =  async (rawCode: string) => {
	try{
		if(!isServiceInitialized) {
			await esbuild.initialize({
				worker: true,
				wasmURL: 'https://unpkg.com/esbuild-wasm@latest/esbuild.wasm'
			});

			console.log("esbuild initialized successfully");
			isServiceInitialized = true;
		}

		const res = await esbuild.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			}
		});
		return res.outputFiles[0].text;
	}catch(err){
		console.error(err);
	}
};
export default bundle;