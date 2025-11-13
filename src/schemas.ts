import z from 'zod';

const jpegOptionsSchema = z.object({
	quality: z.number().min(1).max(100).optional(),
	progressive: z.boolean().optional(),
	chromaSubsampling: z.string().optional(),
	optimiseCoding: z.boolean().optional(),
	optimizeCoding: z.boolean().optional(),
	// cspell:disable-next-line
	mozjpeg: z.boolean().optional(),
	trellisQuantisation: z.boolean().optional(),
	// cspell:disable-next-line
	overshootDeringing: z.boolean().optional(),
	optimiseScans: z.boolean().optional(),
	optimizeScans: z.boolean().optional(),
	quantisationTable: z.number().optional(),
	quantizationTable: z.number().optional(),
	force: z.boolean().optional()
});

const pngOptionsSchema = z.object({
	progressive: z.boolean().optional(),
	compressionLevel: z.number().min(0).max(9).optional(),
	adaptiveFiltering: z.boolean().optional(),
	palette: z.boolean().optional(),
	quality: z.number().min(1).max(100).optional(),
	effort: z.number().min(1).max(10).optional(),
	colours: z.number().min(1).max(256).optional(),
	colors: z.number().min(1).max(256).optional(),
	dither: z.number().min(0).max(1).optional(),
	force: z.boolean().optional()
});

const webpOptionsSchema = z.object({
	quality: z.number().min(1).max(100).optional(),
	alphaQuality: z.number().min(1).max(100).optional(),
	lossless: z.boolean().optional(),
	nearLossless: z.boolean().optional(),
	smartSubsample: z.boolean().optional(),
	// cspell:disable-next-line
	smartDeblock: z.boolean().optional(),
	preset: z
		.union([
			z.literal('default'),
			z.literal('photo'),
			z.literal('picture'),
			z.literal('drawing'),
			z.literal('icon'),
			z.literal('text')
		])
		.optional(),
	effort: z.number().min(1).max(6).optional(),
	loop: z.number().min(0).optional(),
	delay: z
		.union([z.number().min(0).optional(), z.number().min(0).array()])
		.optional(),
	minSize: z.boolean().optional(),
	mixed: z.boolean().optional(),
	force: z.boolean().optional()
});

const gifOptionsSchema = z.object({
	reuse: z.boolean().optional(),
	progressive: z.boolean().optional(),
	colours: z.number().min(2).max(256).optional(),
	colors: z.number().min(2).max(256).optional(),
	effort: z.number().min(1).max(10).optional(),
	dither: z.number().min(0).max(1).optional(),
	interFrameMaxError: z.number().min(0).max(32).optional(),
	interPaletteMaxError: z.number().min(0).max(256).optional(),
	keepDuplicateFrames: z.boolean().optional(),
	loop: z.number().min(0).optional(),
	delay: z
		.union([z.number().min(0).optional(), z.number().min(0).array()])
		.optional(),
	force: z.boolean().optional()
});

const jp2OptionsSchema = z.object({
	quality: z.number().min(1).max(100).optional(),
	lossless: z.boolean().optional(),
	tileWidth: z.number().min(1).optional(),
	tileHeight: z.number().min(1).optional(),
	chromaSubsampling: z
		.union([z.literal('4:4:4'), z.literal('4:2:0')])
		.optional(),
	force: z.boolean().optional()
});

const tiffOptionsSchema = z.object({
	quality: z.number().min(1).max(100).optional(),
	force: z.boolean().optional(),
	compression: z.string().optional(),
	// cspell:disable-next-line
	bigtiff: z.boolean().optional(),
	predictor: z.string().optional(),
	pyramid: z.boolean().optional(),
	tile: z.boolean().optional(),
	tileWidth: z.number().min(1).optional(),
	tileHeight: z.number().min(1).optional(),
	// cspell:disable-next-line
	xres: z.number().min(1).optional(),
	// cspell:disable-next-line
	yres: z.number().min(1).optional(),
	resolutionUnit: z.union([z.literal('inch'), z.literal('cm')]).optional(),
	// cspell:disable-next-line
	bitdepth: z
		.union([z.literal(8), z.literal(2), z.literal(1), z.literal(4)])
		.optional(),
	// cspell:disable-next-line
	miniswhite: z.boolean().optional()
});

const avifOptionsSchema = z.object({
	quality: z.number().min(1).max(100).optional(),
	lossless: z.boolean().optional(),
	effort: z.number().min(0).max(9).optional(),
	chromaSubsampling: z.string().optional(),
	// cspell:disable-next-line
	bitdepth: z.union([z.literal(8), z.literal(10), z.literal(12)]).optional()
});

const heifOptionsSchema = z.object({
	compression: z.union([z.literal('av1'), z.literal('hevc')]).optional(),
	quality: z.number().min(1).max(100).optional(),
	lossless: z.boolean().optional(),
	effort: z.number().min(0).max(9).optional(),
	chromaSubsampling: z.string().optional(),
	// cspell:disable-next-line
	bitdepth: z.union([z.literal(8), z.literal(10), z.literal(12)]).optional()
});

const jxlOptionsSchema = z.object({
	distance: z.number().min(0).max(15).optional(),
	quality: z.number().min(1).max(100).optional(),
	decodingTier: z.number().min(0).max(4).optional(),
	lossless: z.boolean().optional(),
	effort: z.number().min(1).max(9).optional(),
	loop: z.number().min(0).optional(),
	delay: z
		.union([z.number().min(0).optional(), z.number().min(0).array()])
		.optional()
});

const rawOptionsSchema = z.object({
	depth: z
		.union([
			z.literal('char'),
			z.literal('complex'),
			z.literal('double'),
			// cspell:disable-next-line
			z.literal('dpcomplex'),
			z.literal('float'),
			z.literal('int'),
			z.literal('short'),
			z.literal('uchar'),
			z.literal('uint'),
			z.literal('ushort')
		])
		.optional()
});

export const outputsSchema = z.union([
	z.literal('jpeg'),
	z.literal('png'),
	z.literal('webp'),
	z.literal('gif'),
	// not supported in the base build of sharp
	// z.literal('jp2'),
	z.literal('tiff'),
	z.literal('avif'),
	z.literal('heif'),
	// not supported in the base build of sharp
	// z.literal('jxl'),
	z.literal('raw')
]);

export const resizeOptionsSchema = z.object({
	width: z.number().min(1).optional(),
	height: z.number().min(1).optional(),
	fit: z
		.union([
			z.literal('cover'),
			z.literal('contain'),
			z.literal('fill'),
			z.literal('inside'),
			z.literal('outside')
		])
		.optional(),
	position: z.string().or(z.number()).optional(),
	background: z
		.union([
			z.string(),
			z.object({
				r: z.number().min(0).max(255).optional(),
				g: z.number().min(0).max(255).optional(),
				b: z.number().min(0).max(255).optional(),
				alpha: z.number().min(0).max(1).optional()
			})
		])
		.optional(),
	kernel: z
		.union([
			z.literal('nearest'),
			z.literal('cubic'),
			z.literal('linear'),
			z.literal('mitchell'),
			// cspell:disable-next-line
			z.literal('lanczos2'),
			// cspell:disable-next-line
			z.literal('lanczos3'),
			z.literal('mks2013'),
			z.literal('mks2021')
		])
		.optional(),
	withoutEnlargement: z.boolean().optional(),
	withoutReduction: z.boolean().optional(),
	fastShrinkOnLoad: z.boolean().optional()
});

export const formSchema = z.object({
	image: z.instanceof(File)
});

export const optionsSchemas = {
	jpeg: jpegOptionsSchema,
	png: pngOptionsSchema,
	webp: webpOptionsSchema,
	gif: gifOptionsSchema,
	jp2: jp2OptionsSchema,
	tiff: tiffOptionsSchema,
	avif: avifOptionsSchema,
	heif: heifOptionsSchema,
	jxl: jxlOptionsSchema,
	raw: rawOptionsSchema
};
