import { Hash, Circle, Sparkle } from 'phosphor-react'
import { useState } from 'react'

import { hex } from './ColorFunc.js'

export default function AddColorForm(props){

	const icon_size = 24
	
	/* state variables for form */
	const [ color, setColor ] = useState('')

	return (
		<>
		{/*  form to change color  */}
			<form
				className="pb-2"
				onSubmit={(e) => {
					e.preventDefault()
					let c = hex(e.target.color.value)
					if((/^[0-9a-fA-F]{3,6}$/gm).test(c)){ return }
					props.add_color(c)
				}}
			>

				<div className="flex items-center gap-3 p-2 px-3 rounded-xl border-[#d3d3d3] my-4 border-2">
					<Hash size={icon_size} />
					<Circle 
						size={icon_size} 
						weight="fill" 
						style={{
							fill:'#' + (color ? color : 'fff')
						}}
					/>
					<input
						name="color"
						type="text" 
						className="uppercase bg-transparent w-max outline-none" 
						maxLength="6" 
						value={color} 
						onChange={(e) => setColor(e.target.value.substring(0,6)) }
					/>
				</div>

				<button type="submit" className="w-full text-center p-1 py-3 border-2 border-black rounded-xl uppercase tracking-wider font-medium" >
					<p className="flex items-center mx-auto gap-1 w-fit">
						Splash!
						<Sparkle weight="fill" className="inline-block" />
					</p>
				</button>
			</form>
		</>
	)
}