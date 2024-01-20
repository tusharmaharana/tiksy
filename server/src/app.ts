import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { HttpError, sendErrorResponse } from './utils/HttpError';
import { ZodArray, ZodEffects, ZodObject, ZodRecord } from 'zod';
import { get, set } from 'lodash';
import { HttpStatusCode } from './utils/HttpStatusCodes';
import { ZAgentReqBody, ZTicketReqBody } from './types/common';
import * as agentController from './controllers/agentController';
import * as ticketController from './controllers/ticketController';

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

app.post(
	'/api/support-agents',
	checkRequestSchema({
		expectedProps: { body: ['agent'] },
		zodValidation: [{ bodyProp: 'agent', zodSchema: ZAgentReqBody }]
	}),
	callableWrapper(agentController.addAgentApi)
);

app.post(
	'/api/support-tickets',
	checkRequestSchema({
		expectedProps: { body: ['ticket'] },
		zodValidation: [{ bodyProp: 'ticket', zodSchema: ZTicketReqBody }]
	}),
	callableWrapper(ticketController.addTicketApi)
);
app.get('/api/support-tickets', callableWrapper(ticketController.fetchAllTickets));

interface ICheckSchemaParams {
	expectedProps?: { body?: string[]; params?: string[]; query?: string[] } | null;
	zodValidation?: { bodyProp?: string; zodSchema: ZodObject<any, any> | ZodArray<any, any> | ZodRecord<any> | ZodEffects<any> }[];
}

function checkRequestSchema<T>(params: ICheckSchemaParams) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (params.expectedProps) {
				if (params.expectedProps.body?.length) {
					for (const bodyProp of params.expectedProps.body) {
						if (get(req.body, bodyProp) === undefined) {
							throw new HttpError(HttpStatusCode.BAD_REQUEST, 'Invalid request', {
								message: `${bodyProp} is missing from request body properties`
							});
						}
					}
				}
				if (params.expectedProps.params?.length) {
					for (const paramProp of params.expectedProps.params) {
						if (!get(req.params, paramProp)) {
							throw new HttpError(HttpStatusCode.BAD_REQUEST, 'Invalid request', {
								message: `${paramProp} is missing from request url params`
							});
						}
					}
				}
				if (params.expectedProps?.query?.length) {
					for (const queryProp of params.expectedProps.query) {
						if (!get(req.query, queryProp)) {
							throw new HttpError(HttpStatusCode.BAD_REQUEST, 'Invalid request', {
								message: `${queryProp} is missing from request url query`
							});
						}
					}
				}
			}
			if (params.zodValidation) {
				for (const validation of params.zodValidation) {
					const zodObject = validation.zodSchema;
					const obj = validation.bodyProp ? get(req.body, validation.bodyProp) : req.body;
					const result = zodObject.safeParse(obj);
					if (!result.success) {
						throw new HttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, `System encountered an internal error.`, {
							message: `Failed to validate the request schema for ${
								validation.bodyProp ? `${validation.bodyProp} in req body` : 'req body'
							}`,
							objects: result.error.errors
						});
					} else {
						// Mutate the body props to remove unwanted parts of the schema such as any extra keys
						if (validation.bodyProp) {
							set(req.body, validation.bodyProp, result.data);
						} else {
							req.body = result.data;
						}
					}
				}
			}
			next();
		} catch (err) {
			sendErrorResponse(err, req, res);
		}
	};
}

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
