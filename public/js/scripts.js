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
		comment = response.data.comment;
		comments.innerHTML = 
			`
			<div class="card">
				<div class="card-block">
					<h4 class="card-fowl">${comment.title}</h4>
					<p class="card-text">${comment.content}</p>
					<p>
						<form method="POST" action="/reviews/comments/${comment._id}?_method=DELETE">
						<button onclick=class="btn btn-primary delete-comment" id="${comment._id} "data-comment-id="${comment._id}">Delete</button>
						</form>
					</p>
				</div>
			</div>
			` + comments.innerHTML;
	}).catch(error => {
		console.log(error)
	});
});

function deleteComment(commentId) {
	console.log('click');
	axios.delete(`/reviews/comments/${commentId}`)
}
document.querySelector('.delete-comment').addEventListener('click', e => {
		console.log('click');
		let commentId = e.getAttribute('data-comment-id');
		axios.delete(`/reviews/comments/${commentId})`).then(response => {
		console.log(response)
		comment = document.getElementById(commentId);
		comment.parentNode.removeChild(comment);
	}).catch(error => {
		console.log(error)
		alert("there was an error deleting this comment");
	})
	});
