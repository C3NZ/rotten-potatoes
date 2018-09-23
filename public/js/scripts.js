document.getElementById("newComment").addEventListener("submit", e => {
	e.preventDefault();

	let comment = {}
	const inputs = document.getElementsByClassName('form-control');

	for(var i = 0; i < inputs.length; i++){
		comment[inputs[i].name] = inputs[i].value;
	}

	let commentData = new FormData();
	commentData.append('title', document.getElementById('comment-title').value)
	commentData.append('content', document.getElementById('comment-content').value)
	console.log(commentData)
	const options ={
		headers: {
			'Content-Type':'multipart/form-data'
		}
	}

	document.getElementById('comment-title').value = '';
	document.getElementById('comment-content').value = '';
	console.log(options);

	axios.post('/reviews/comments', comment).then(function(response) {
		
		comments = document.getElementById('comments')
		comments.innerHTML = 
			`
			<div class="card">
				<div class="card-block">
					<h4 class="card-fowl">${response.data.comment.title}</h4>
					<p class="card-text">${response.data.comment.content}</p>
					<p>
						<form method="POST" action="/reviews/comments/${response.data.comment_id}?_method=DELETE">
						<button class="btn btn-link" type="submit">Delete</button>
						</form>
					</p>
				</div>
			</div>
			` + comments.innerHTML;
	});
})
