import { Response, Request } from 'express';
import { HttpStatusCode } from './HttpStatusCodes';
import { Log } from './Log';

export class HttpError extends Error {
	errorCode: HttpStatusCode;
	errorInfo: { message: string; objects?: Array<any> | Record<string, string> } | null;

	constructor(
		errorCode: HttpStatusCode,
		m: string | null,
		errorInfo: { message: string; objects?: Array<any> | Record<string, string> } | null = null
	) {
		super(m ?? '');
		this.errorCode = errorCode;
		this.errorInfo = errorInfo;
		// Set the prototype explicitly.
		Object.setPrototypeOf(this, HttpError.prototype);
	}

	sendResponse(res: Response) {
		return res.status(this.errorCode).send({ message: this.message });
	}
}

export async function sendErrorResponse(err: Error, req: Request, res: Response, defaultMsg: string | null = null) {
	Log.i(`New Action`);
	const errorMessage = (err instanceof HttpError && err?.errorInfo?.message) || err?.message || defaultMsg || 'Error occurred';
	if (err instanceof HttpError) {
		Log.e(err?.errorInfo?.message ?? err?.message ?? 'Error occurred', err, err.errorInfo?.objects);
		err.sendResponse(res);
	} else {
		Log.e(err?.message ?? 'Error occurred', err);
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ message: defaultMsg ?? err?.message ?? 'An unknown error occurred' });
	}
}
