//Remove all genres that don't have any movie listings
$(document).ready(function() {
	elements = document.getElementsByClassName('overall-container');
	//Iterate through the list of movie genres and remove any that have no movies
	for(i = 0; i < elements.length; i++){
		currentElement = elements[i];
		if (currentElement.getElementsByClassName('movie-container').length == 0){
			currentElement.parentNode.removeChild(currentElement);	
		}
	}
	//<Manually removing the last node in the list for now 
	elements[13].parentNode.removeChild(elements[13]);
})
