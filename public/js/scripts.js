document.getElementById("newComment").addEventListener("submit", e => {
	e.preventDefault();

	let comment = {}
	const inputs = document.getElementsByClassName('form-control');

	for(var i = 0; i < inputs.length; i++){
		comment[inputs[i].name] = inputs[i].value;
	}

	axios.post('/reviews/comments', comment)
		.then(function(response) {
			console.log(response)
		})
		.catch(function(error) {
			console.log(error);
			alert('There was a problem saving your comment. Please try again.');
		})

	axios.post('/user', comment)
		.then(function(response) {
			console.log(response);
			this.reset();

			document.getElementById('comments').prepend(
				`
					<div class="card">
						<div class="card-block">
							<h4 class="card-fowl">${response.title}</h4>
							<p class="card-text">${response.content}</p>
							<p>
								<form method="POST" action="/reviews/comments/${response._id}?_method=DELETE">
									<button class="btn btn-link" type="submit">Delete</button>
								</form>
							</p>
						</div>
					</div>
				`
			);
		})
})
