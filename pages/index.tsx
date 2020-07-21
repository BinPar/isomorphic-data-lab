import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import styled from 'styled-components';
import fetcher from '../libs/fetcher';


const pokemonListAPI = 'https://pokeapi.co/api/v2/pokemon/';

interface Pokemon {
  name: string;
}

interface ListData {
  results: Pokemon[];
}
interface IndexData {
  initialData: ListData;
}

const Anchor = styled.a`
  color: red;
`

const Index = ({ initialData }: IndexData): JSX.Element => {
  const { data } = useSWR<ListData>(pokemonListAPI, fetcher, { initialData });

  return (
    <React.Fragment>
      <Head>
        <title>Hello BinPar!</title>
        <link rel="stylesheet" type="text/css" href="/styles.css" />
      </Head>
      <h1>BinPar Pokedex:</h1>
      <div>
        {data && data.results
          ? data.results.map((pokemon) => (
            <p key={pokemon.name}>
              <Link href="/pokemon/[name]" as={`/pokemon/${pokemon.name}`}>
                <Anchor href={`/${pokemon.name}`}>{pokemon.name}</Anchor>
              </Link>
            </p>
            ))
          : 'loading...'}
      </div>
    </React.Fragment>
  );
};

export async function getStaticProps(): Promise<{
  props: IndexData;
}> {
  const data = await fetcher<ListData>(pokemonListAPI);
  return { props: { initialData: data } };
}

export default Index;
