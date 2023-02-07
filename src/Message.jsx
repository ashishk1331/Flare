import { CheckCircle } from 'phosphor-react'

export default function Message(props){
	return (
		<div className="flex w-[360px] bg-[white] p-4 rounded-2xl absolute bottom-0 left-1/2 -translate-x-1/2 mb-4 shadow-xl transition-all">
			<div className="mx-auto flex items-center gap-2">
				<CheckCircle weight="fill" size={24} />
				<p>{props.message}</p>
			</div>
		</div>
	)
}