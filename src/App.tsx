import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {PieChart, PieConfig, PieItem} from "./components/PieChart.tsx";

function App() {

    const data:PieItem[] = [
        { group: 'Group1', label: 'Group1', value: 45 },
        { group: 'Group2', label: 'Group2', value: 67 },
        { group: 'Group3', label: 'Group3', value: 23 },
        { group: 'Group4', label: 'Group4', value: 89 },
        { group: 'Group5', label: 'Group5', value: 32 },
        { group: 'Group6', label: 'Group6', value: 57 },
        { group: 'Group7', label: 'Group7', value: 15 },
        { group: 'Group8', label: 'Group8', value: 73 },
        { group: 'Group9', label: 'Group9', value: 92 },
        { group: 'Group10', label: 'Group10', value: 28 }
    ];
  const [donut,setDonut] = useState({enabled:false,rate:0.5});
  const config = {width:500,height:300,};

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setDonut(prevState => ({
            ...prevState,enabled: !donut.enabled
        }))}>
            {donut.enabled ? '饼图' : '环图'}
        </button>
        <PieChart data={data} donut={donut} config={config as PieConfig} />
      </div>
    </>
  )
}

export default App
