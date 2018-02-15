export function showValidations(msg, validations) {

  highlightComponents(validations);
}

function highlightComponents(validations) {

  for (var i in validations) {

    
    if (document.getElementsByName(i).length > 0) {

      if (_.find(document.getElementsByName(i)[0].parentNode.classList, (c) => {
          return c == "Select"
        })) {

        document.getElementsByName(i)[0].parentNode.childNodes[1].classList.add('input-error');

      } else {

        document.getElementsByName(i)[0].classList.add('input-error');
      }
    }
  }
}

export function clearValidation() {

  let errorElements = document.getElementsByClassName("input-error");

  if (errorElements && errorElements.length > 0) {
    
    for (let index in errorElements) {

      if (errorElements[index].classList && errorElements[index].classList.length > 0) {

        errorElements[index].classList.remove("input-error")
      }
    }
  }
  
}