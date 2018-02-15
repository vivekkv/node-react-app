export default function reduxAction(type, payLoad) {
	return {
		type,
		...payLoad
	}
}