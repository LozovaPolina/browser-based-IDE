import * as esbuild from 'esbuild-wasm';
const URL_UNPKG = 'https://unpkg.com'
export const unpkgPathPlugin = () => {
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
						contents: `
					  import message from 'react-dom';
					  console.log(message);
                	`,
					};
				}else {

					try{
						const res = await fetch(args.path);

						if(!res.ok) {
							throw new Error('Could not ot fetch the data!');
						}
						const resData = await res.text();

						console.log(resData, 'resdata')
						return {
							loader: 'jsx',
							contents: resData,
							resolveDir: new URL ('./', res.url ).pathname
						}
					}catch (err) {
						console.log(err)
					}
				}



			});
		},
	};
};