import * as esbuild from "esbuild-wasm";

const URL_UNPKG = "https://unpkg.com";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // handle root entry file of 'index.ts'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.ts", namespace: "a" };
      });
      // handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        return {
          namespace: "a",
          path: new URL(args.path, `${URL_UNPKG}${args.resolveDir}/`).href,
        };
      });
      // handle main file of module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
