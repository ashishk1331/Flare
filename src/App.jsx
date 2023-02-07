import Settings from './Settings'
import Message from './Message'
import { CaretDown } from 'phosphor-react'

import { useState } from 'react'

function apply_body_color(value){
    document.body.style.background = ''
    document.body.style.backgroundColor = value
}

function apply_body_gradient(deg, from, to){
    document.body.style.background = `linear-gradient(${deg}, ${from}, ${to}) no-repeat`;
    document.body.style.background = `linear-gradient(${deg}, ${from}, ${to}) no-repeat`;
    document.body.style.background = `-moz-linear-gradient(${deg}, ${from}, ${to}) no-repeat`;
    document.body.style.background = `-webkit-linear-gradient(${deg}, ${from}, ${to}) no-repeat`;
}

/*
background: #93A967;
background: -webkit-linear-gradient(top left, #93A967, #36D6DC);
background: -moz-linear-gradient(top left, #93A967, #36D6DC);
background: linear-gradient(to bottom right, #93A967, #36D6DC);
*/


export default function App(){
    
    // state variables
    const [ baseColor, setBaseColor ] = useState('#06d6a0')
    const [ menuState, setMenuState ] = useState(false)

    return (
        <>
            {
                menuState ?
                <Settings baseColor={baseColor} apply_body_color={apply_body_color} setMenuState={setMenuState} apply_body_gradient={apply_body_gradient} />
                :
                <button className="max-w-[100px] w-[100px] h-[48px] bg-white text-black border-2 border-[#d3d3d3] border-t-0 rounded-b-xl flex mx-auto opacity-25 hover:opacity-100 transition" onClick={() => setMenuState(true)} >
                    <CaretDown size={24} weight="bold" className="m-auto" />
                </button>
            }
            {/*<Message />*/}
        </>
    )
}