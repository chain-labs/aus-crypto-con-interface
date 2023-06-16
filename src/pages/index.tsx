import React from 'react'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title key="title">Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-full items-center justify-center bg-yellow-200 text-black">
        <h1 className="text-sm font-bold underline">Hello world!</h1>
      </main>
    </>
  )
}