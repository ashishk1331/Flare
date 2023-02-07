import { Moon, ShuffleSimple, X, ArrowUUpLeft, Taxi, DotsThreeVertical } from 'phosphor-react'
import uniqolor from 'uniqolor'
import { useState } from 'react'

import { hex } from './ColorFunc.js'

export default function NavBar(props){

	const [ menu, setMenu ] = useState(false)
	const icon_size = 24

	return (
		<nav className="flex flex-col w-full py-3">
			<section className="flex items-center w-full">
				<button className="p-3" onClick={() => props.setMenuState(false)}>
					<X size={icon_size} />
				</button>
				<h1 className="ml-2 text-lg tracking-wider uppercase">
					flare
				</h1>
				<button className="ml-auto p-3" onClick={() => props.undo_last()}>
					<ArrowUUpLeft size={icon_size} />
				</button>
				<button className="p-3" onClick={() => setMenu(!menu)}>
					<DotsThreeVertical size={icon_size} />
				</button>
			</section>
			{
				menu && <section className="flex items-center justify-around w-full bg-gray-100 rounded-md">
					<button className="p-3" onClick={() => props.apply_body_color('#311434')}>
						<Moon weight="fill" size={icon_size} />
					</button>
					<button className="p-3" onClick={() => props.add_color(hex(uniqolor.random()['color']))}>
						<ShuffleSimple size={icon_size} />
					</button>			
				</section>
			}
		</nav>
	)
}