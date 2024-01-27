/** @format */

import { z } from 'zod';

const articlesSchema = z.object({
	title: z
		.string()
		.nonempty({ message: 'campo obbligatorio' })
		.min(3, { message: 'Il nome deve contenere almeno 3 caratteri' })
		.max(30, { message: 'il nome non deve contenere più di 30 caratteri' }),
	date: z.date({ message: 'Data non valida' }),
	tag: z.string().nonempty({ message: 'Inserire almeno un valore' }),
	description: z
		.string()
		.nonempty({ message: 'La descrizione è obbligatoria' })
		.min(10, {
			message:
				"la descrizione dell'articolo deve essere di almeno 10 caratteri",
		})
		.max(5000, {
			message:
				"la descrizione dell'articolo deve essere di almeno 5000 caratteri",
		}),
	link: z.union([
		z
			.string()
			.url({ message: "la formattazione dell'url non è valida" })
			.nullish(),
		z.literal(''),
	]),
});

export { articlesSchema };
