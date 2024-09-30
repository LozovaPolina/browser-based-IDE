import * as esbuild from 'esbuild-wasm';
import * as localForage from "localforage";

const URL_UNPKG = 'https://unpkg.com';

const fileCache = localForage.createInstance({
	name: 'file_cache',
});



export const unpkgPathPlugin = (inputCode: string) => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				console.log('onResolve', args);

				if(args.path === 'index.js'){
					return {path: args.path, namespace: 'a'};

				} else if(args.path.includes('./') || args.path.includes('../')) {
					return {namespace: 'a',path: new URL(args.path, `${URL_UNPKG}${args.resolveDir}/`).href}
				}

				return  {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`
				};

			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				console.log('onLoad', args);

				if (args.path === 'index.js') {
					return {
						loader: 'jsx',
						contents: inputCode,
					};
				} else {
					// check to see if we have already fetched this file
					// adn if it is in cache

					const cachedResult  = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

					// if it is, return it immediately
					if(cachedResult) {return cachedResult}

					try{
						const res = await fetch(args.path);

						if(!res.ok) {
							throw new Error('Could not ot fetch the data!');
						}

						const resData = await res.text();

						console.log(resData, 'resdata');

						const result: esbuild.OnLoadResult = {
							loader: 'jsx',
							contents: resData,
							resolveDir: new URL ('./', res.url ).pathname
						};

						// store resData in cache
						await fileCache.setItem(args.path, result);

						return result;
					}catch (err) {
						console.log(err)
					}
				}
			});
		},
	};
};