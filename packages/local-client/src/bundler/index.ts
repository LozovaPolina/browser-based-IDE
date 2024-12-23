import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let isServiceInitialized: boolean = false;

const bundle = async (rawCode: string) => {
  try {
    if (!isServiceInitialized) {
      await esbuild.initialize({
        worker: true,
        wasmURL: "https://unpkg.com/esbuild-wasm@latest/esbuild.wasm",
      });

      console.log("esbuild initialized successfully");
      isServiceInitialized = true;
    }

    const res = await esbuild.build({
      entryPoints: ["index.ts"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });
    return {
      code: res.outputFiles[0].text,
      err: "",
    };
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);

      return {
        code: "",
        err: err.message,
      };
    }
    return {
      code: "",
      err: "Something wen wrong. Please, try again.",
    };
  }
};
export default bundle;
