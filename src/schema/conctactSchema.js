/** @format */

import { z } from 'zod';

const contactSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Il nome deve contenere almeno 3 caratteri' })
		.max(15, { message: 'il nome non deve contenere più di 15 caratteri' }),
	surname: z
		.string()
		.min(1, { message: 'Il cognome deve contenere almeno 3 caratteri' })
		.max(20, { message: 'il cognome non deve contenere più di 20 caratteri' }),
	role: z
		.string()
		.min(5, {
			message: 'il ruolo deve essere di almeno 5 caratteri',
		})
		.max(30, {
			message: 'il ruolo non deve contenere più di 30 caratteri',
		}),
	bio: z
		.string()
		.min(10, {
			message: 'la biografia del contatto deve essere di almeno 10 caratteri',
		})
		.max(300, {
			message: 'la biografia del contatto non può superare i 300 caratteri',
		}),
	email: z
		.string()
		.email({
			message:
				"l'email non è ben formattata inserire la @ e nella seconda parte la dicitura che posticipa il punto",
		})
		.min(10, { message: "l'email deve essere almeno di 10 caratteri" })
		.max(40, { message: "l'email non deve esuperare i 40 caratteri" }),
	phoneNumber: z.union([
		z
			.number()
			.min(1000000000, {
				message: 'Il numero di telefono deve essere di almeno 10 cifre',
			})
			.max(999999999999999, {
				message: 'Il numero di telefono non può superare le 15 cifre',
			})
			.nullish(),
		z.literal(''),
	]),
});

export { contactSchema };
