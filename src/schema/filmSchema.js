import { z } from 'zod';

const currentYear = new Date().getFullYear();

const filmSchema = z.object({
  title: z
    .string()
	.nonempty({ message: 'Il titolo è obbligatorio' })
    .min(3, { message: 'Il titolo deve contenere almeno 3 caratteri' })
    .max(30, { message: 'il titolo non deve contenere più di 20 caratteri' }),
  director: z
    .string()
	.nonempty({ message: 'Il regista è obbligatorio' })
    .min(6, {
      message: 'il nome del regista deve essere di almeno 6 caratteri',
    })
    .max(30, {
      message: 'il nome del regista non può superare di 30 caratteri',
    }),
  productions: z.array(
    z.object({
      productionName: z
        .string()
		.nonempty({ message: 'Almeno una produzione è obbligatoria' })
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
		.nonempty({ message: 'Almeno uno sceneggiatore è obbligatorio' })
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
  genre: z.string().nonempty({ message: 'Inserire almeno un genere' }),
  directorOfPhotography: z
    .string()
	  .nonempty({ message: 'Il direttore della fotografia è obbligatorio' })
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
	  .nonempty({ message: 'La sinossi è obbligatoria' })
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
    .min(1, { message: 'La durata deve essere maggiore di 0 minuti' })
    .max(300, { message: 'La durata non può essere maggiore di 300 minuti' }), 
  year: z
  	.number()
    .positive({ message: 'Il numero deve essere superiore a 0' })
    .min(2014, { message: "L' anno non può essere inferiore al 2014" })
    .max(currentYear, { message:  "L' anno non può essere superiore a quello corrente" }),
  festivals: z.array(
    z.object({
      festivalName: z
	    .union(
			[
				z.string()
				.min(10, {
				  message:
					'il nome del festival deve essere di almeno 10 caratteri',
				})
				.max(50, {
				  message:
					'il nome del festival non può superare i 50 caratteri',
				})
				.nullish(), 
				z.literal(""),
			]
		)
    })
  ),
  type: z.string().nonempty({ message: 'Inserire almeno un valore' }),
  trailer: z
  	.union(
		[z.string()
		.url(
				{message: "la formattazione dell'url non è valida"}
			)
		.nullish(), 
		z.literal("")
	]),
  imdb:z
  	.union(
		[z.string()
		.url(
				{message: "la formattazione dell'url non è valida"}
			)
		.nullish(), 
		z.literal("")
	]),
  instagram: z
	.union(
		[z.string()
		.url(
				{message: "la formattazione dell'url non è valida"}
			)
		.nullish(), 
		z.literal("")
	]),
  facebook: z
	.union(
		[z.string()
		.url(
				{message: "la formattazione dell'url non è valida"}
			)
		.nullish(), 
		z.literal("")
	]),
});

export { filmSchema };
