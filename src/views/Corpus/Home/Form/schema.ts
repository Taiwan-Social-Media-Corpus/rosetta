import { z } from 'zod';

export const schema = z
  .object({
    media: z.string(),
    word: z.string().min(1, 'Required'),
    cqlEnable: z.boolean(),
    boards: z.string().array().optional(),
    postType: z.string().min(1, 'Required'),
    start: z.number().positive(),
    end: z.number().positive(),
    windowSize: z.number().positive().lte(30, 'No greater than 30'),
    fetchNumber: z.number().positive().lte(100, 'No greater than 100'),
  })
  .superRefine((data, ctx) => {
    const { word, cqlEnable, start, end } = data;
    if (start > end) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Starting year must not be later than the ending year',
        path: ['start'],
      });
    }

    const cqlPattern = /^\s*$|[(["'`].*?[)\]"'`]|[|]/g;
    const shouldDisable = !cqlPattern.test(word) && cqlEnable === true;
    const shouldEnable = cqlPattern.test(word) && cqlEnable === false;
    if (shouldDisable || shouldEnable) {
      const flag = shouldDisable ? 'disable' : 'enable';
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Please ${flag} cql query in request body`,
        path: ['cqlEnable'],
      });
    }
  });

export type ConcordanceFormValue = z.infer<typeof schema>;
