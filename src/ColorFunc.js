export const hex = (hexcode) => {
	if(typeof hexcode === 'object'){
		hexcode = hexcode.value
	}
	if(!hexcode.startsWith('#')){
		hexcode = '#' + hexcode
	}
	return {
		key: hexcode.replaceAll('#', ''),
		type: 'color',
		code: 'hex',
		value: hexcode
	}
}

export const gradient = (deg, fromColor , toColor) => {
	if(typeof fromColor === 'object'){
		fromColor = fromColor.value
	}
	if(typeof toColor === 'object'){
		toColor = toColor.value
	}
	return {
		key: deg + fromColor.replaceAll('#', '') + toColor.replaceAll('#', ''),
		type: 'gradient',
		value: {
			'angle': deg,
			'from': hex(fromColor),
			'to': hex(toColor)
		}
	}
}