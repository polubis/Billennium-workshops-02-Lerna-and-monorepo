export type Validator<T> = (value: T) => boolean;
export type Validators<T> = Validator<T>[];
export type Result = Record<string, boolean>;

export const createValidator = <T>(
  validator: Validator<T>,
  name: string
): Validator<T> => {
  const namedValidator = Object.defineProperty(validator, "name", {
    value: name,
    configurable: true,
  });

  return namedValidator;
};

export const required = createValidator<string>(
  (value) => value === "",
  "required"
);

export const empty = createValidator<unknown[]>(
  (value) => value.length === 0,
  "empty"
);

export const min = (limit: number) =>
  createValidator<number>((value) => value < limit, "min");

export const minLength = (limit: number) =>
  createValidator<string | unknown[]>(
    (value) => value.length < limit,
    "minLength"
  );

export const maxLength = (limit: number) =>
  createValidator<string | unknown[]>(
    (value) => value.length > limit,
    "maxLength"
  );

export const Schema = <T>(value: T, validators: Validators<T>) => {
  return {
    result: () =>
      validators.reduce<Result>((acc, validator) => {
        // Workaround
        // Invalid type declaration inside lib.d.ts with global JS typings
        acc[(validator as any).name] = validator(value);
        return acc;
      }, {}),
    valid: (): boolean => validators.some((validator) => validator(value)),
  };
};
