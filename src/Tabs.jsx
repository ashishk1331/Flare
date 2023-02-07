import { Sparkle } from 'phosphor-react'

function cn(...classes){
	return classes.filter(Boolean).join(' ')
}

function Tab(props){
	return (
		<li
			className="cursor-pointer w-fit"
			onClick={() => props.setForm(parseInt(props.value))}
		>
			<a 
				href="#"
				className={ props.selected ? "font-bold flex items-center gap-1" : "" }
			>
				{
					props.title
				}
				{
					props.selected && <Sparkle weight="fill" />
				}
			</a>
		</li>
	)
}

export default function Tabs(props){

	return (
		<ul className="p-2 mb-2 flex items-center justify-around">
			<Tab title={'Color'} selected={props.form === 0 ? true : false} setForm={props.setForm} value="0" />
			<Tab title={'Gradient'} selected={props.form === 1 ? true : false} setForm={props.setForm} value="1" />
		</ul>
	)
}