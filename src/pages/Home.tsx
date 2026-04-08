import { useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'

import Button from '@/components/button/Button'
import {
  AboutCard,
  StudiesCard,
  StatusCard,
  WorkCard,
} from '@/components/cards/index'
import { studies } from '@/data/studies'

import {
  LinkedinIcon,
  GithubIcon,
} from '@/assets/icons'

import './home.css'
//import Tags from '@/components/tags/Tags'
//import '@fontsource-variable/onest'
import ProjectCard from '@/components/cards/projectCard/projectCard'

// Envuelve Responsive con WidthProvider
const ResponsiveGridLayout = WidthProvider(Responsive)

const Home = () => {
  const [layouts] = useState({
    lg: [
      { i: '1', x: 0, y: 0, w: 1, h: 7 },
      { i: '4', x: 0, y: 7, w: 1, h: 2 },
      { i: '8', x: 0, y: 9, w: 1, h: 2 },
      { i: '3', x: 1, y: 0, w: 1, h: 7 },
      { i: '5', x: 1, y: 7, w: 1, h: 2 },
      { i: '6', x: 1, y: 9, w: 1, h: 2 },
      { i: '7', x: 1, y: 11, w: 1, h: 2 },
      { i: '2', x: 2, y: 0, w: 1, h: 13 },
    ],
    md: [
      { i: '1', x: 0, y: 0, w: 2, h: 7 },
      { i: '4', x: 0, y: 7, w: 2, h: 2 },
      { i: '8', x: 0, y: 9, w: 2, h: 2 },
      { i: '3', x: 0, y: 11, w: 2, h: 7 },
      { i: '5', x: 0, y: 18, w: 1, h: 2 },
      { i: '6', x: 0, y: 20, w: 1, h: 2 },
      { i: '7', x: 0, y: 22, w: 1, h: 2 },
      { i: '2', x: 2, y: 0, w: 1, h: 14 },
    ],
    sm: [
      { i: '1', x: 0, y: 0, w: 2, h: 7 },
      { i: '4', x: 0, y: 7, w: 2, h: 2 },
      { i: '8', x: 0, y: 9, w: 2, h: 2 },
      { i: '3', x: 0, y: 11, w: 2, h: 7 },
      { i: '5', x: 0, y: 18, w: 2, h: 2 },
      { i: '6', x: 0, y: 20, w: 2, h: 2 },
      { i: '7', x: 0, y: 22, w: 2, h: 2 },
      { i: '2', x: 0, y: 24, w: 2, h: 14 },
    ],
    xs: [
      { i: '1', x: 0, y: 0, w: 1, h: 7, static: true },
      { i: '4', x: 0, y: 7, w: 1, h: 2, static: true },
      { i: '8', x: 0, y: 9, w: 1, h: 2, static: true },
      { i: '3', x: 0, y: 11, w: 1, h: 7, static: true },
      { i: '5', x: 0, y: 18, w: 1, h: 2, static: true },
      { i: '6', x: 0, y: 20, w: 1, h: 2, static: true },
      { i: '7', x: 0, y: 22, w: 1, h: 2, static: true },
      { i: '2', x: 0, y: 24, w: 1, h: 14, static: true },
    ],
    xxs: [
      { i: '1', x: 0, y: 0, w: 1, h: 7, static: true },
      { i: '4', x: 0, y: 7, w: 1, h: 2, static: true },
      { i: '8', x: 0, y: 9, w: 1, h: 2, static: true },
      { i: '3', x: 0, y: 11, w: 1, h: 7, static: true },
      { i: '5', x: 0, y: 18, w: 1, h: 2, static: true },
      { i: '6', x: 0, y: 20, w: 1, h: 2, static: true },
      { i: '7', x: 0, y: 22, w: 1, h: 2, static: true },
      { i: '2', x: 0, y: 24, w: 1, h: 14, static: true },
    ],
  })

  return (
    <div className='container-grid'>
      <ResponsiveGridLayout
        className='layout'
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={21}
        compactType={null}
        isDraggable={true}
        isResizable={false}
        margin={[32, 32]}
      >
       
        <div key='4' className='grid-item' onClick={e => e.stopPropagation()}>
          <StatusCard isSearching={true} />
        </div>
        <div key='5' className='grid-item' onClick={e => e.stopPropagation()}>
          <ProjectCard
            companyName=''
            link='https://alonyanez.github.io/login'
            projectName='Proyecto 1: Full Stack'
          />
        </div>
        <div key='6' className='grid-item' onClick={e => e.stopPropagation()}>
          <ProjectCard
            companyName=''
            link=''
            projectName='Proyecto 2: Python + Análisis'
          />
        </div>
        <div key='7' className='grid-item' onClick={e => e.stopPropagation()}>
          <ProjectCard
            companyName=''
            link=''
            projectName='Proyecto 3: DevOps'
          />
        </div>
        <div key='8' className='grid-item' onClick={e => e.stopPropagation()}>
          <ProjectCard
            companyName=''
            link='https://alonyanez.github.io/'
            projectName='Portfololio Junior Unicorn'
          />
        </div>
        <div key='2' className='grid-item' onClick={e => e.stopPropagation()}>
          <AboutCard markdownPath='/data/about-me.md'>
            <Button
              link='https://www.linkedin.com/in/javaloyan/'
              icon={<LinkedinIcon />}
              variant='icon'
              external={true}
            />
            <Button
              link='https://github.com/alonyanez'
              icon={<GithubIcon />}
              variant='icon'
              external={true}
            />
            
          </AboutCard>
        </div>
        <div key='1' className='grid-item' onClick={e => e.stopPropagation()}>
          <StudiesCard studies={studies} />
        </div>

        <div key='3' className='grid-item' onClick={e => e.stopPropagation()}>
          <WorkCard
            jobTitle='Junior Full Stack'
            companyName='NTT Data'
            date=' Mar 2024 -  Sep 2024'
            location='Sevilla, España'
          />
        </div>

        
       {/* <div key='9' className='grid-item' onClick={e => e.stopPropagation()}>
          {/*<FooterCard />
        </div>*/}
      </ResponsiveGridLayout>
    </div>
  )
}

export default Home
