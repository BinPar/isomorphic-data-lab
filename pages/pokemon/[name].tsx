import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import fetcher from '../../libs/fetcher';

const pokemonListAPI = 'https://pokeapi.co/api/v2/pokemon/?limit=2000';

interface Pokemon {
  name: string;
}

interface ListData {
  results: Pokemon[];
}

interface PokemonType {
  name: string;
}
interface PokemonTypes {
  slot: number;
  type: PokemonType;
}
interface PokemonData {
  results: Pokemon[];
  sprites: {
    front_default: string;
  };
  types: PokemonTypes[];
  height: number;
  weight: number;
}
interface PokemonPageData {
  name: string;
  initialData: PokemonData;
}

const getURL = (pokemonName: string): string =>
  `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

const Pokemon = ({ name, initialData }: PokemonPageData): JSX.Element => {
  const router = useRouter();
  const { data } = useSWR<PokemonData>(getURL(name), fetcher, { initialData });
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{name}</h1>
      {data ? (
        <div>
          <figure>
            <img src={data.sprites.front_default} alt={name} />
          </figure>
          <p>
            height:
            {data.height}
          </p>
          <p>
            weight:
            {data.weight}
          </p>
          <ul>
            {data.types.map(({ type }) => (
              <li key={type.name}>{type.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        'loading...'
      )}
      <br />
      <br />
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  );
};

export async function getStaticProps({
  params,
}): Promise<{
  props: PokemonPageData;
}> {
  const data = await fetcher<PokemonData>(getURL(params.name));
  return { props: { initialData: data, name: params.name } };
}

export async function getStaticPaths(): Promise<{
  paths: {
    params: {
      name: string;
    };
  }[];
  fallback: boolean;
}> {
  const data = await fetcher<ListData>(pokemonListAPI);

  const paths = data.results.map((pokemon: { name: string }) => ({
    params: { name: pokemon.name },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default Pokemon;
