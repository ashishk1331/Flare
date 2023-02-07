import { Sparkle, PersonSimpleRun, ArrowLineUp, Copy, Trash, Circle } from 'phosphor-react'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Message from './Message'

function ColorCircle(props){
	return (
		<li
			className="w-[50px] h-[50px] rounded-full m-auto cursor-pointer"
			role="button"
			style={{
				backgroundColor: props.i.value,
				border: props.current?.key === props.i.key ? '3px solid white' : '',
				outline: props.current?.key === props.i.key ? '3px solid black' : ''
			}}
			onClick={() => {
				props.setCurrent(props.i)
				props.apply_body_color(props.i.value)
			}}
		/>
	)
}

function GradientBlock(props){

	let deg = props.i.value.angle + 'deg',
	from = props.i.value.from.value,
	to = props.i.value.to.value;

	return (
		<li
			className="w-full h-[50px] rounded-xl m-auto cursor-pointer"
			role="button"
			style={{
				background: `linear-gradient(${deg}, ${from}, ${to})`,
				border: props.current?.key === props.i.key ? '3px solid white' : '',
				outline: props.current?.key === props.i.key ? '3px solid black' : ''
			}}
			onClick={() => {
				props.setCurrent(props.i)
				props.apply_body_gradient(deg, from, to)
			}}
		/>
	)
}

export default function Recent(props){

	const [ copied, setCopied ] = useState(false)
	const icon_size = 24

	return (
		<div>
			<h3 className="flex items-center gap-1 mb-4 ml-2">
				<PersonSimpleRun weight="fill" />
				recently used
			</h3>
			{
				props.current && props.recent && <section className="flex items-center justify-around w-full rounded-md mb-4 bg-gray-100">
					<div className="flex items-start">
						<div className="min-w-[24px] min-h-[24px] rounded-full"
							style={{
								background: (props.current?.type === 'gradient') ? `linear-gradient(${props.current.value.angle + 'deg'}, ${props.current.value.from.value}, ${props.current.value.to.value})` : props.current.value
							}}
						></div>
						<h1 className="ml-1">Selected</h1>
					</div>

					<button className="p-3" onClick={() => props.toTop(props.current.key)}>
						<ArrowLineUp size={icon_size} />
					</button>

					<CopyToClipboard 
						text={(props.current?.type === 'gradient') ? props.current.value.from.value+'-'+props.current.value.to.value : props.current.value }
						onCopy={() => {
							console.log('copied')
							setCopied(true)
							setTimeout(() => {
								setCopied(false)
							}, 1500)
					}}>
						<button className="p-3">
							<Copy size={icon_size} weight="fill" />
						</button>
					</CopyToClipboard>

					<button className="p-3 text-red-500" onClick={() => {
						props.setCurrent(null)
						props.remove(props.current.key)
					}}>
						<Trash size={icon_size} weight="fill" />
					</button>
				</section>				
			}
			{
				props.recent.length ?
				<ul className="grid grid-cols-5 gap-4 justify-around">
					{
						props.recent.map((i, index) => {
							return (
								i.type === 'color' ?
								<ColorCircle 
									key={i.key}
									i={i}
									current={props.current}
									setCurrent={props.setCurrent}
									apply_body_color={props.apply_body_color}
								/>
								:
								<GradientBlock
									key={i.key}
									i={i}
									current={props.current}
									setCurrent={props.setCurrent}
									apply_body_gradient={props.apply_body_gradient}
								/>
							)
						})
					}
				</ul>
				:
				<p className="italic text-gray-400 flex items-center gap-1">
					add some sparks
					<Sparkle weight="fill" className="rotate-[6deg]" />
				</p>
			}
			{
				copied && <Message message="copied"/>
			}
		</div>
	)
}