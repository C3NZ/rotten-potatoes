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
	console.log('click');
	console.log(commentId);
	axios.delete(`/reviews/comments/${commentId}`).then(response => {
		comment = document.getElementById(commentId);
		console.log(comment)
		comment.parentNode.removeChild(comment);
	}).catch(error => {
		console.log(error);
		alert("there was an error deleting the comment1")
	})
}
