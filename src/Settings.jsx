import { Compass, Sparkle, PersonSimpleRun, Hash, Circle } from 'phosphor-react'
import { set_item, get_item } from './dataStore.js'
import { useState, useEffect } from 'react'

import AddColorForm from './AddColorForm'
import AddGradientForm from './AddGradientForm'
import NavBar from './NavBar'
import Recent from './Recent'
import Tabs from './Tabs'

export default function Settings(props){

	/* state variables for recent library */
	const [ recent, setRecent ] = useState(get_item('recent'))
	const [ current, setCurrent ] = useState(recent[0] || {})

	/* state for form selection */
	const [ form, setForm ] = useState(0)

	const icon_size = 24;

	const is_present_in_recent = (key) => {
		return (recent.filter(i => i.key === key).length > 0) ? true : false;
	}

	// function to update bg color and add to the recent used array
	const add_color = (hex) => {
		props.apply_body_color(hex.value)
		if(!is_present_in_recent(hex.key)){ 
			let newRecent = [hex, ...recent]
			setRecent(newRecent)
			set_item('recent', newRecent)
		}
		setCurrent(hex)
	}

	const apply_gradient = (gradient) => {
		let { angle, from, to } = gradient.value
		props.apply_body_gradient(
			angle + 'deg',
			from.value,
			to.value
		)
		if(!is_present_in_recent(gradient.key)){
			let newRecent = [gradient, ...recent]
			setRecent(newRecent)
			set_item('recent', newRecent)
		}
		setCurrent(gradient)
	}

	function undo_last(){
		let list = recent.slice(1)

		if(list.length) {
			let first_item = list[0]
			if(first_item['type'] === 'gradient'){
				apply_gradient(first_item)
			} else {
				add_color(first_item)
			}
		}
		
		setRecent(list)
		set_item('recent', list)
	}


	function remove(key){
		let list = recent.filter(i => i.key !== key)

		setRecent(list)
		set_item('recent', list)
	}

	function toTop(key){
		let item = recent.filter(i => i.key === key)[0]
		let list = [item, ...recent.filter(i => i.key !== key)]

		setRecent(list)
		set_item('recent', list)	
	}

	useEffect(() => {
		if(recent.length < 1){
			setCurrent(null)
		}
	}, [recent])

	return (
		<main className="max-w-[360px] mx-auto bg-[#fff] px-6 pb-12 rounded-b-2xl border-2 border-[#d3d3d3] border-t-0">

			{/*  header conating title  */}
			<NavBar
				apply_body_color={props.apply_body_color}
				setMenuState={props.setMenuState}
				add_color={add_color}
				undo_last={undo_last}
			/>

			{/*  tabs to switch between color and gradient form  */}
			<Tabs form={form} setForm={setForm} />

			{/*color form*/}
			{
				(form === 0) ?
				<AddColorForm add_color={add_color} />
				:
				<AddGradientForm 
					icon_size={icon_size}
					apply_gradient={apply_gradient}
				/>
			}

			{/*  divider  */}
			<hr className="w-full h-[2px] my-8 bg-[#d3d3d3]" />

			{/*  recent tab  */}
			<Recent 
				recent={recent}
				apply_body_gradient={props.apply_body_gradient}
				apply_body_color={props.apply_body_color}
				remove={remove}
				toTop={toTop}
				current={current}
				setCurrent={setCurrent}
			/>

		</main>
	)
}