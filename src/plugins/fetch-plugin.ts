import * as esbuild from "esbuild-wasm";
import localForage from "localforage";

const fileCache = localForage.createInstance({
	name: 'file_cache',
});

export const fetchPlugin = (inputCode: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				// check to see if we have already fetched this file
				// adn if it is in cache

				const cachedResult  = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

				// if it is, return it immediately
				if(cachedResult) {return cachedResult}
			});
			build.onLoad({filter: /(^index\.js$)/}, () => {
				return {
					loader: 'jsx',
					contents: inputCode,
				};
			});

			build.onLoad({filter: /.css$/}, async (args) => {

				try{
					const res = await fetch(args.path);

					if(!res.ok) {
						throw new Error('Could not ot fetch the data!');
					}

					const resData = await res.text();

					const escaped = resData
						.replace(/\n/g, '')
						.replace(/"/g, '\\"')
						.replace(/'/g, "\\'");

					const contents = `
							const style = document.createElement('style');
							style.innerText = '${escaped}';
							document.head.appendChild(style);
						`;

					const result: esbuild.OnLoadResult = {
						loader: 'jsx',
						contents,
						resolveDir: new URL ('./', res.url ).pathname
					};

					// store resData in cache
					await fileCache.setItem(args.path, result);

					return result;
				}catch (err) {
					console.log(err)
				}
			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				console.log('onLoad', args);
					try{
						const res = await fetch(args.path);

						if(!res.ok) {
							throw new Error('Could not ot fetch the data!');
						}

						const resData = await res.text();
						// console.log(resData, 'resData');

						const result: esbuild.OnLoadResult = {
							loader: 'jsx',
							contents:resData,
							resolveDir: new URL ('./', res.url ).pathname
						};

						// store resData in cache
						await fileCache.setItem(args.path, result);

						return result;
					}catch (err) {
						console.log(err)
					}

			});
		}
	}
}