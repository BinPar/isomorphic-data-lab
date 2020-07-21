import fetch from 'isomorphic-unfetch';

const fetcher = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const res = await fetch(input, init);
  return res.json() as unknown as T;
};

export default fetcher;
