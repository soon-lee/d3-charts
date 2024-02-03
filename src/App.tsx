import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Donut, PiePlotItem} from "./components/PiePlot.tsx";
import {BorderText, HorizontalTitle} from "./components/TitlePlot.tsx";
import {PieChart} from "./components/PieChart.tsx";

function App() {

    const data: PiePlotItem[] = [
        {key: '0', group: 'Group1', label: 'Group1', value: 45, color: '#61dafb'},
        {key: '1', group: 'Group2', label: 'Group2', value: 67, color: '#2e114f'},
        {key: '2', group: 'Group3', label: 'Group3', value: 23, color: '#29654a'},
        {key: '3', group: 'Group4', label: 'Group4', value: 89, color: '#57f21d'},
        {key: '4', group: 'Group5', label: 'Group5', value: 32, color: '#35dae1'},
        {key: '5', group: 'Group6', label: 'Group6', value: 57, color: '#636cfe'},
        {key: '6', group: 'Group7', label: 'Group7', value: 15, color: '#551eda'},
        {key: '7', group: 'Group8', label: 'Group8', value: 73, color: '#616cfe'},
        {key: '8', group: 'Group9', label: 'Group9', value: 92, color: '#cce36a'},
        {key: '9', group: 'Group10', label: 'Group10', value: 28, color: '#616dfe'}
    ];
    const [donut, setDonut] = useState(new Donut(null));
    const config = {width: 500, height: 300,};

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card" style={{position: 'relative', width: 500, heighy: 300}}>
                <button onClick={() => setDonut(prevState => ({
                    ...prevState, enable: !donut.enable
                }))}>
                    {donut.enable ? '饼图' : '环图'}
                </button>
                <PieChart data={data} donut={donut} config={config}/>
                <HorizontalTitle data={{label: 'fhdslfnk', info: 'dfjdpfoge-jbmkfog'}}
                                 config={{title: new BorderText(null), notion: new BorderText(null)}}/>

            </div>
        </>
    )
}

export default App
