export function isAuthorized() {

	let login_user = localStorage.getItem("login_user");

	if(!login_user) {
		return false
	}

	return true
}