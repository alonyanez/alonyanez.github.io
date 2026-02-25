import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className='main.container'>
        <section className='column-left'>
          <h1> Javier Alonso </h1>
          <p>Full Stack Developer</p>
        </section>

        <section className='column-right'>
          <p>Mis primeros inicios con el portfolio</p>
        </section>
      </div>
  )
}

export default App
