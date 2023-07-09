/** @format */

import { z } from 'zod';

const currentYear = new Date().getFullYear();

const filmSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'Il titolo deve contenere almeno 3 caratteri' })
		.max(30, { message: 'il titolo non deve contenere più di 20 caratteri' }),
	director: z
		.string()
		.min(6, {
			message: 'il nome del regista deve essere di almeno 6 caratteri',
		})
		.max(30, {
			message: 'il nome del regista non può superare di 30 caratteri',
		}),
	genres: z
		.array(
			z.object({
				genreName: z.string(),
			})
		)
		.nullable()
		.refine((value) => value.some((genre) => genre.genreName), {
			message: 'È necessario selezionare almeno un genere',
		}),
	productions: z.array(
		z.object({
			productionName: z
				.string()
				.min(6, {
					message:
						'Il nome della società di produzione deve essere di almeno 6 caratteri',
				})
				.max(50, {
					message:
						'Il nome della società di produzione non può superare i 50 caratteri',
				}),
		})
	),
	screenwriters: z.array(
		z.object({
			screenwriterName: z
				.string()
				.min(6, {
					message:
						'il nome dello sceneggiatore deve essere di almeno 6 caratteri',
				})
				.max(30, {
					message:
						'il nome dello sceneggiatore non può superare i 30 caratteri',
				}),
		})
	),
	directorOfPhotography: z
		.string()
		.min(6, {
			message:
				'il nome del direttore della fotografia deve essere di almeno 6 caratteri',
		})
		.max(30, {
			message:
				'il nome del direttore della fotografia non può superare i 40 caratteri',
		}),
	synopsis: z
		.string()
		.min(10, {
			message:
				'la descrizione del prodotto audiovisivo deve essere di almeno 10 caratteri',
		})
		.max(300, {
			message:
				'la descrizione del prodotto audiovisivo non può superare i 300 caratteri',
		}),
	duration: z
		.number()
		.positive({ message: 'Il numero deve essere superiore a 0' })
		.min(1, { message: 'la durata deve essere maggiore di 0 minuti' })
		.max(999, { message: 'la durata non può essere maggiore di 999 minuti' }),
	year: z
		.number()
		.positive({ message: 'Il numero deve essere superiore a 0' })
		.min(1930, { message: "l'anno deve avere essere maggiore di 1930" })
		.max(currentYear, {
			message: "l'anno non può essere superiore all'anno corrente",
		}),
	festivals: z.array(
		z.object({
			festivalName: z
				.string()
				.min(10, {
					message: 'il nome del festival deve essere di almeno 10 caratteri',
				})
				.max(50, {
					message: 'il nome del festival non può superare i 50 caratteri',
				}),
		})
	),
	type: z.string().nonempty({ message: 'Inserire almeno un valore' }),
});

export { filmSchema };
