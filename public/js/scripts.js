document.getElementById("newComment").addEventListener("submit", e => {
	e.preventDefault();

	let comment = {}
	const inputs = document.getElementsByClassName('form-control');

	for(var i = 0; i < inputs.length; i++){
		comment[inputs[i].name] = inputs[i].value;
	}

	document.getElementById('comment-title').value = '';
	document.getElementById('comment-content').value = '';

	axios.post('/reviews/comments', comment).then(function(response) {
		
		comments = document.getElementById('comments')
		comment = response.data.comment;
		comments.innerHTML = 
			`
			<div class="card" id="${comment._id}">
				<div class="card-block">
					<h4 class="card-fowl">${comment.title}</h4>
					<p class="card-text">${comment.content}</p>
					<p>
						<button onclick="deleteComment(&quot;${comment._id}&quot;)" class="btn btn-primary delete-comment" id="${comment._id}">Delete</button>
					</p>
				</div>
			</div>
			` + comments.innerHTML;
	}).catch(error => {
		console.log(error)
	});
});

function deleteComment(commentId) {
	axios.delete(`/reviews/comments/${commentId}`).then(response => {
		comment = document.getElementById(commentId);
		comment.parentNode.removeChild(comment);
	}).catch(error => {
		console.log(error);
		alert("there was an error deleting the comment1")
	})
}
