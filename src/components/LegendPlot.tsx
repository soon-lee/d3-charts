
export const LegendPlot = ({shape}) => {

    const dealShape = ()=>{
        if(shape === 'circle'){
            return <circle cx="15" cy="50" r="10" fill="red" />
        }else if(shape === 'square'){
            return <rect x="40" y="40" width="10" height="10" fill="red" />
        }else if(shape === 'triangle'){
            return <polygon points="60,40 65,50 70,40" fill="red" />
        }else if(shape === 'diamond'){
            return <polygon points="80,40 100,40 100,50 80,50" fill="red" />
        }else if(shape === 'line'){
            return <line x1="0" y1="0" x2="10" y2="10" stroke="red" />
        }
    }

    return <g>
        {dealShape()}
        <text></text>
    </g>
}