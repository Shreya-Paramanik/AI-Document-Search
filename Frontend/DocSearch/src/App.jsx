import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandPage from './Components/LandPage'
import PdfViewer from './Components/PdfViewer'

import {pdfjs} from 'react-pdf';



pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {
  const [count, setCount] = useState(0)

  return (
    
       <LandPage/>
    
  )
}

export default App
