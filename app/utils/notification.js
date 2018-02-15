export function alertError(message) {

	message = message ? message : "something wrong happed while processing your request !"
	
	var x = document.getElementById("snackbar")
	x.innerHTML = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

export function alertSuccess(message){

	var x = document.getElementById("snackbar")
	x.innerHTML = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

export function alertResponse(response) {

	if (response.completed && response.data.success) {

		let message = response.data.message ? response.data.message : "Action completed successfully !";
        alertSuccess(message);
        
	} else if (response.completed && !response.data.success) {

        let message = response.data.message ? response.data.message : null;
		alertError(message);

	} else {

		alertError();
	}

}

export function showLoader() {
	
	document.getElementById("loaderWrapper").style.display = 'block'
}


export function hideLoader() {
	
	document.getElementById("loaderWrapper").style.display = 'none'
}