import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { sendErrorResponse } from './utils/HttpError';

const app = express();

app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(
	express.json({
		type: 'application/json'
	})
);
app.use(cors());

app.set('port', process.env.PORT || 8080);

function callableWrapper<T>(cF: (req: Request) => Promise<T>) {
	return async (req: Request, res: Response) => {
		try {
			const result = await cF(req);
			res.status(200).send(result ?? { isSuccess: true });
		} catch (err) {
			await sendErrorResponse(err, req, res);
		}
	};
}

export default app;
