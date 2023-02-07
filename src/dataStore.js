if(!localStorage.getItem('recent')){
	localStorage.setItem('recent', '[]')
}

export function set_item(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

export function get_item(key){
	return JSON.parse(localStorage.getItem(key))
}