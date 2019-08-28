import Head from 'next/head'
import { useState } from 'react'
import Hero from '../components/Hero'
import { PageContext } from '../components/Page'

export default () => {
  const [isNavigating, setIsNavigating] = useState()
  return (
    <PageContext.Provider value={{ isNavigating, setIsNavigating }}>
      <Head>
        <title>Jonah Meijers</title>
      </Head>
      <Hero />
    </PageContext.Provider>
  )
}
