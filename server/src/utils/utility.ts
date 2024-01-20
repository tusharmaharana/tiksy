import { PrismaClient } from '@prisma/client';

export function getPrismaClient() {
	const prismaClient = new PrismaClient({
		log: [
			{
				emit: 'stdout',
				level: 'error'
			}
		]
	});
	return prismaClient;
}

export function createDate(copyValue?: Date | string | null) {
	if (!copyValue) {
		return new Date();
	}
	if (copyValue instanceof Date) {
		return new Date(copyValue.getTime());
	}
	// The assumption here is that if copyValue is string, it will be in ISO 8601 format.
	return new Date(copyValue);
}
