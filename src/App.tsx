import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {PieChart, PieConfig} from "./components/PieChart.tsx";
import {Donut, PieItem} from "./components/PiePlot.tsx";

function App() {

    const data:PieItem[] = [
        { key:'0',group: 'Group1', label: 'Group1', value: 45 },
        { key:'1',group: 'Group2', label: 'Group2', value: 67 },
        { key:'2',group: 'Group3', label: 'Group3', value: 23 },
        { key:'3',group: 'Group4', label: 'Group4', value: 89 },
        { key:'4',group: 'Group5', label: 'Group5', value: 32 },
        { key:'5',group: 'Group6', label: 'Group6', value: 57 },
        { key:'6',group: 'Group7', label: 'Group7', value: 15 },
        { key:'7',group: 'Group8', label: 'Group8', value: 73 },
        { key:'8',group: 'Group9', label: 'Group9', value: 92 },
        { key:'9',group: 'Group10', label: 'Group10', value: 28 }
    ];
  const [donut,setDonut] = useState(new Donut(null));
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
            ...prevState,enable: !donut.enable
        }))}>
            {donut.enable ? '饼图' : '环图'}
        </button>
        <PieChart data={data} donut={donut} config={config as PieConfig} />
      </div>
    </>
  )
}

export default App
