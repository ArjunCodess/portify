import React from 'react'
import BasicDetails from './basic-details'
import { Separator } from './ui/separator'
import Projects from './projects'
import GitHub from './github'
import ProductHunt from './product-hunt'
import DevTo from './devto'

export default function Editor() {
  return (
    <section>
      <BasicDetails />
      <Separator className='my-10' />
      <Projects />
      <Separator className='my-10' />
      <GitHub />
      <Separator className='my-10' />
      <ProductHunt />
      <Separator className='my-10' />
      <DevTo />
    </section>
  )
}