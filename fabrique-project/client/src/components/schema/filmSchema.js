import { z } from "zod";

const filmSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Il titolo deve contenere almeno 3 caratteri" })
    .max(30, { message: "il titolo non deve contenere più di 20 caratteri" }),
  director: z
    .string()
    .min(6, {
      message: "il nome del regista deve essere di almeno 6 caratteri",
    })
    .max(30, {
      message: "il nome del regista non può superare di 30 caratteri",
    }),
  production: z
    .string()
    .min(6, {
      message:
        "Il nome della società di produzione deve essere di almeno 6 caratteri",
    })
    .max(30, {
      message:
        "Il nome della società di produzione non può superare i 30 caratteri",
    }),
  screenwriter: z
    .string()
    .min(6, {
      message: "il nome dello sceneggiatore deve essere di almeno 6 caratteri",
    })
    .max(30, {
      message: "il nome dello sceneggiatore non può superare i 40 caratteri",
    }),
  directorOfPhotography: z
    .string()
    .min(6, {
      message:
        "il nome del direttore della fotografia deve essere di almeno 6 caratteri",
    })
    .max(30, {
      message:
        "il nome del direttore della fotografia non può superare i 40 caratteri",
    }),
  description: z
    .string()
    .min(10, {
      message:
        "la descrizione del prodotto audiovisivo deve essere di almeno 10 caratteri",
    })
    .max(300, {
      message:
        "la descrizione del prodotto audiovisivo non può superare i 300 caratteri",
    }),
  duration: z
    .string()
    .min(1, { message: "la durata deve essere maggiore di 0 minuti" })
    .max(3, { message: "la durata non può essere maggiore di 999 minuti" }),
  year: z
    .string()
    .min(4, { message: "l'anno deve avere 4 cifre" })
    .max(4, { message: "l'anno deve avere 4 cifre" }),
  type: z.string().min(1, { message: "Inserire un campo valido" }),
});

export { filmSchema };
