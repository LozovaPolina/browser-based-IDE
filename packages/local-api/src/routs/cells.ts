import express from "express";

import fs from 'fs/promises';
import * as path from "node:path";

type Cell = {
	id: string;
	content: string;
	type: 'text' | 'code';
}
type LocalApiError = {
	code: string;
}
export const createCellsRouter = (filename: string, dir: string) => {
	const router = express.Router();
	router.use(express.json())

	const fullPath = path.join(dir, filename);

	router.get('/cells', async (req, res) => {
		const isLocalApiError = (err: any): err is LocalApiError => {
			return typeof err.code === "string";
		};

		try {
			//Read the file
			const result = await fs.readFile(fullPath, {encoding: 'utf-8'});

			res.send(JSON.parse(result));

		} catch (e) {
			if (isLocalApiError(e)) {
				if (e.code === "ENOENT") {
					await fs.writeFile(fullPath, "[]", "utf-8");
					res.send([]);
				}
			}
		}
	})


	router.post('/cells', async (req, res) => {
		// Take the list of cells from the request obj
		// serialize them
		const {cells}: { cells: Cell[] } = req.body;


		//Write the cells into the file
		await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

		res.send({status: 'ok'})
	});

	return router;
};
