import React from 'react'
import BasicDetails from './basic-details'
import { Separator } from './ui/separator'
import Projects from './projects'
import GitHub from './github'

export default function Editor() {
  return (
    <section>
      <BasicDetails />
      <Separator className='my-10' />
      <Projects />
      <Separator className='my-10' />
      <GitHub />
    </section>
  )
}