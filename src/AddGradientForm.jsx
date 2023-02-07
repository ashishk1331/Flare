import { Compass, Hash, Circle, ArrowLineLeft, ArrowLineRight, Sparkle } from 'phosphor-react'
import { useState } from 'react'

import { hex, gradient } from './ColorFunc.js'

export default function AddGradientForm(props){

	// state variables for gradient form
	const [ deg, setDeg ] = useState(45) // for degrees input
	const [ fromColor, setFromColor ] = useState('') // for from color of gradient
	const [ toColor, setToColor ] = useState('') // for to color of gradient

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				let degrees = parseInt(e.target.degree.value)
				degrees %= 360

				let from = e.target.fromColor.value
				if(!(/^[0-9a-fA-F]{3,6}$/gm).test(from)){ return }

				let to = e.target.toColor.value
				if(!(/^[0-9a-fA-F]{3,6}$/gm).test(to)){ return }

				let g = gradient(degrees, hex(from), hex(to))
				props.apply_gradient(g)
			}}
		>
			<label htmlFor="degree" className="cursor-pointer flex items-center gap-1">
				degree
			</label>
			<div className="flex items-center gap-2 p-1 px-3 rounded-xl border-[#d3d3d3] mb-4 mt-1 border-2">
				<Compass size={props.icon_size * 1.4} />
				<input
					id="degree"
					name="degree"
					type="text"
					className="uppercase bg-transparent w-full outline-none"
					value={deg} 
					onChange={(e) => setDeg(e.target.value) }
				/>
				<p className="ml-auto">deg</p>
			</div>

			<label htmlFor="from" className="cursor-pointer flex items-center gap-1">
				<ArrowLineLeft weight="fill" size={16} />
				From color
			</label>
			<div className="flex items-center gap-3 p-2 px-3 rounded-xl border-[#d3d3d3] mb-4 mt-1 border-2">
				<Hash size={props.icon_size} />
				<Circle 
					size={props.icon_size} 
					weight="fill" 
					style={{
						fill:'#' + (fromColor ? fromColor : 'fff')
					}}
				/>
				<input
					id="from"
					name="fromColor"
					type="text" 
					className="uppercase bg-transparent w-max outline-none" 
					maxLength="6" 
					value={fromColor} 
					onChange={(e) => setFromColor(e.target.value.substring(0,6)) }
				/>
			</div>

			<label htmlFor="to" className="cursor-pointer flex items-center gap-1">
				<ArrowLineRight weight="fill" size={16} />
				To color
			</label>
			<div className="flex items-center gap-3 p-2 px-3 rounded-xl border-[#d3d3d3] mb-4 mt-1 border-2">
				<Hash size={props.icon_size} />
				<Circle 
					size={props.icon_size} 
					weight="fill" 
					style={{
						fill:'#' + (toColor ? toColor : 'fff')
					}}
				/>
				<input
					id="to"
					name="toColor"
					type="text" 
					className="uppercase bg-transparent w-max outline-none" 
					maxLength="6" 
					value={toColor} 
					onChange={(e) => setToColor(e.target.value.substring(0,6)) }
				/>
			</div>

			<button type="submit" className="w-full text-center p-1 py-3 border-2 border-black rounded-xl uppercase tracking-wider font-medium">
				<p className="flex items-center mx-auto gap-1 w-fit">
					Splash!
					<Sparkle weight="fill" className="inline-block" />
				</p>
			</button>
		</form>
	)
}