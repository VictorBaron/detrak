export class NoErrorThrownError extends Error {}

export const getError = <TError>(call: () => unknown): TError => {
  try {
    call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};
