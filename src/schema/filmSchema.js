/** @format */

import { z } from 'zod';

const currentYear = new Date().getFullYear();

const filmSchema = z.object({
	title: z
		.string()
		.nonempty({ message: 'campo obbligatorio' })
		.min(3, { message: 'Il nome deve contenere almeno 3 caratteri' })
		.max(30, { message: 'il nome non deve contenere più di 30 caratteri' }),
	director: z
		.string()
		.nonempty({ message: 'campo obbligatorio' })
		.min(6, {
			message: 'il nome deve essere di almeno 6 caratteri',
		})
		.max(40, {
			message: 'il nome non può superare di 40 caratteri',
		}),
	productions: z.array(
		z.object({
			productionName: z
				.string()
				.nonempty({ message: 'Inserire almeno una produzione' })
				.min(6, {
					message: 'Il nome deve essere di almeno 6 caratteri',
				})
				.max(40, {
					message: 'Il nome non può superare i 40 caratteri',
				}),
		})
	),
	producers: z.array(
		z.object({
			producerName: z
				.string()
				.nonempty({ message: 'Inserire almeno un produttore' })
				.min(6, {
					message: 'Il nome deve essere di almeno 6 caratteri',
				})
				.max(40, {
					message: 'Il nome deve superare i 40 caratteri',
				}),
		})
	),
	coProductions: z.array(
		z.object({
			coProductionName: z.union([
				z
					.string()
					.min(6, {
						message: 'il nome deve essere di almeno 6 caratteri',
					})
					.max(40, {
						message: 'il nome non può superare i 40 caratteri',
					})
					.nullish(),
				z.literal(''),
			]),
		})
	),
	coProducers: z.array(
		z.object({
			coProducerName: z.union([
				z
					.string()
					.min(6, {
						message: 'il nome deve essere di almeno 6 caratteri',
					})
					.max(40, {
						message: 'il nome non può superare i 40 caratteri',
					})
					.nullish(),
				z.literal(''),
			]),
		})
	),
	actors: z.array(
		z.object({
			actorName: z
				.string()
				.nonempty({ message: 'Inserire almeno un Attore' })
				.min(6, {
					message: 'il nome deve essere di almeno 6 caratteri',
				})
				.max(40, {
					message: 'il nome non può superare i 40 caratteri',
				}),
			actorRole: z
				.string()
				.nonempty({ message: 'Inserire almeno un Ruolo' })
				.min(6, {
					message: 'il nome deve essere di almeno 6 caratteri',
				})
				.max(40, {
					message: 'il nome non può superare i 40 caratteri',
				}),
		})
	),
	screenwriters: z.array(
		z.object({
			screenwriterName: z
				.string()
				.nonempty({ message: 'Inserire almeno uno sceneggiatore' })
				.min(6, {
					message: 'il nome deve essere di almeno 6 caratteri',
				})
				.max(40, {
					message: 'il nome non può superare i 40 caratteri',
				}),
		})
	),
	genre: z.string().nonempty({ message: 'Inserire almeno un genere' }),
	directorOfPhotography: z
		.string()
		.nonempty({ message: 'campo obbligatorio' })
		.min(6, {
			message: 'il nome deve essere di almeno 6 caratteri',
		})
		.max(40, {
			message: 'il nome non può superare i 40 caratteri',
		}),
	editing: z
		.string()
		.nonempty({ message: 'campo obbligatorio' })
		.min(6, {
			message: 'il nome deve essere di almeno 6 caratteri',
		})
		.max(40, {
			message: 'il nome non può superare i 40 caratteri',
		}),
	scenography: z
		.string()
		.nonempty({ message: 'campo obbligatorio' })
		.min(6, {
			message: 'il nome essere di almeno 6 caratteri',
		})
		.max(40, {
			message: 'il nome non può superare i 40 caratteri',
		}),
	costumes: z
		.string()
		.nonempty({ message: 'campo obbligatorio' })
		.min(6, {
			message: 'il nome deve essere di almeno 6 caratteri',
		})
		.max(40, {
			message: 'il nome non può superare i 40 caratteri',
		}),
	music: z
		.string()
		.nonempty({ message: 'campo obbligatorio' })
		.min(6, {
			message: 'il nome deve essere di almeno 6 caratteri',
		})
		.max(40, {
			message: 'il nome non può superare i 40 caratteri',
		}),
	sound: z
		.string()
		.nonempty({ message: 'campo obbligatorio' })
		.min(6, {
			message: 'il nome deve essere di almeno 6 caratteri',
		})
		.max(40, {
			message: 'il nome non può superare i 40 caratteri',
		}),
	soundDesign: z
		.string()
		.nonempty({ message: 'campo obbligatorio' })
		.min(6, {
			message: 'il nome deve essere di almeno 6 caratteri',
		})
		.max(40, {
			message: 'il nome non può superare i 40 caratteri',
		}),
	casting: z
		.string()
		.nonempty({ message: 'campo obbligatorio' })
		.min(6, {
			message: 'il nome deve essere di almeno 6 caratteri',
		})
		.max(40, {
			message: 'il nome non può superare i 40 caratteri',
		}),
	lineProducer: z
		.string()
		.nonempty({ message: 'campo obbligatorio' })
		.min(6, {
			message: 'il nome deve essere di almeno 6 caratteri',
		})
		.max(40, {
			message: 'il nome non può superare i 40 caratteri',
		}),
	executiveProducers: z.array(
		z.object({
			executiveProducerName: z
				.string()
				.nonempty({ message: 'Inserire almeno un produttore esecutivo' })
				.min(6, {
					message: 'il nome deve essere di almeno 6 caratteri',
				})
				.max(40, {
					message: 'il nome non può superare i 40 caratteri',
				}),
		})
	),
	distributor: z.union([
		z
			.string()
			.min(6, {
				message: 'il nome deve essere di almeno 6 caratteri',
			})
			.max(40, {
				message: 'il nome non può superare i 40 caratteri',
			})
			.nullish(),
		z.literal(''),
	]),
	salesAgent: z.union([
		z
			.string()
			.min(6, {
				message: 'il nome deve essere di almeno 6 caratteri',
			})
			.max(40, {
				message: 'il nome non può superare i 40 caratteri',
			})
			.nullish(),
		z.literal(''),
	]),
	firstAssistantDirector: z
		.string()
		.nonempty({ message: 'campo obbligatorio' })
		.min(6, {
			message: 'il nome deve essere di almeno 6 caratteri',
		})
		.max(40, {
			message: 'il nome non può superare i 40 caratteri',
		}),
	synopsis: z
		.string()
		.nonempty({ message: 'La sinossi è obbligatoria' })
		.min(10, {
			message:
				'la descrizione del prodotto audiovisivo deve essere di almeno 10 caratteri',
		})
		.max(300, {
			message:
				'la descrizione del prodotto audiovisivo non può superare i 300 caratteri',
		}),
	productionNotes: z.union([
		z
			.string()
			.min(10, {
				message: 'le note di produzione devono essere di almeno 10 caratteri',
			})
			.max(300, {
				message:
					'le note di produzione non possono essere superiori ai 300 10 caratteri',
			})
			.nullish(),
		z.literal(''),
	]),
	duration: z
		.number()
		.positive({ message: 'Il numero deve essere superiore a 0' })
		.min(1, { message: 'La durata deve essere maggiore di 0 minuti' })
		.max(300, { message: 'La durata non può essere maggiore di 300 minuti' }),
	year: z
		.number()
		.positive({ message: 'Il numero deve essere superiore a 0' })
		.min(2014, { message: "L'anno non può essere inferiore al 2014" })
		.max(currentYear, {
			message: "L' anno non può essere superiore a quello corrente",
		}),
	festivals: z.array(
		z.object({
			festivalName: z.union([
				z
					.string()
					.min(10, {
						message: 'il nome deve essere di almeno 10 caratteri',
					})
					.max(50, {
						message: 'il nome non può superare i 50 caratteri',
					})
					.nullish(),
				z.literal(''),
			]),
		})
	),
	type: z.string().nonempty({ message: 'Inserire almeno un valore' }),
	trailer: z.union([
		z
			.string()
			.url({ message: "la formattazione dell'url non è valida" })
			.nullish(),
		z.literal(''),
	]),
	imdb: z.union([
		z
			.string()
			.url({ message: "la formattazione dell'url non è valida" })
			.nullish(),
		z.literal(''),
	]),
	instagram: z.union([
		z
			.string()
			.url({ message: "la formattazione dell'url non è valida" })
			.nullish(),
		z.literal(''),
	]),
	facebook: z.union([
		z
			.string()
			.url({ message: "la formattazione dell'url non è valida" })
			.nullish(),
		z.literal(''),
	]),
});

export { filmSchema };
