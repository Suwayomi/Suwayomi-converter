import sharp from 'sharp';
import z from 'zod';
import { Readable } from 'stream';
import {
	formSchema,
	optionsSchemas,
	outputsSchema,
	resizeOptionsSchema
} from './src/schemas';

function params(
	searchParams: URLSearchParams,
	key: string,
	defaultValue: unknown
): unknown {
	const param = searchParams.get(key);
	if (param === null) return defaultValue;
	return JSON.parse(param.replaceAll('(', '{').replaceAll(')', '}'));
}

const POST = async (req: Request) => {
	const formDat = await req.formData();
	const formValid = formSchema.safeParse(Object.fromEntries(formDat.entries()));
	if (!formValid.success) return new Response('Invalid form', { status: 400 });
	const file = formValid.data.image as File;
	try {
		const s = sharp();
		const url = new URL(req.url);
		const searchParams = url.searchParams;
		const out = outputsSchema.safeParse(
			searchParams.get('out')?.replaceAll('(', '{').replaceAll(')', '}')
		);
		if (!out.success) throw new Error('Invalid output type');
		const sFormatted = format(s, out.data, params(searchParams, 'format', {}));
		const sResized = resize(sFormatted, params(searchParams, 'resize', {}));
		Readable.fromWeb(file.stream()).pipe(sResized);
		return new Response(sResized, {
			status: 200,
			headers: { 'Content-Type': 'application/octet-stream' }
		});
	} catch (error) {
		console.error(
			'an error occurred with the conversion, returning the original image'
		);
		if (error instanceof Error) console.error(error);
		return new Response(file.stream(), {
			status: 200,
			headers: { 'Content-Type': 'application/octet-stream' }
		});
	}
};

Bun.serve({
	port: 5678,
	routes: {
		'/': { POST }
	},
	fetch() {
		return new Response('Not Found', { status: 404 });
	}
});

function getOptions<T extends keyof typeof optionsSchemas>(
	key: T,
	options: unknown
) {
	const optionsValid = optionsSchemas[key].safeParse(options);
	if (!optionsValid.success) {
		console.log(optionsValid.error);
		throw new Error('Invalid ' + key + ' options:\n' + optionsValid.error);
	}
	return optionsValid.data;
}

function format<T extends z.infer<typeof outputsSchema>>(
	s: sharp.Sharp,
	outValid: T,
	options: unknown
): sharp.Sharp {
	const optionsValid = getOptions(outValid, options);
	return s.toFormat(outValid, optionsValid);
}

function resize(s: sharp.Sharp, options: unknown) {
	const optionsValid = resizeOptionsSchema.safeParse(options);
	if (!optionsValid.success)
		throw new Error('Invalid options:\n' + JSON.stringify(optionsValid.error));
	return s.resize(optionsValid.data);
}
