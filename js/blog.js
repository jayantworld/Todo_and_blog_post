let posts = JSON.parse(localStorage.getItem('posts')) || [];
let editIndex = null;

function savePosts() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function addPost() {
  const title = document.getElementById('titleInput').value.trim();
  const content = document.getElementById('contentInput').value.trim();
  if (!title || !content) return alert("Both fields are required.");

  if (editIndex !== null) {
    posts[editIndex] = { title, content };
    editIndex = null;
  } else {
    posts.unshift({ title, content });
  }
  savePosts();
  renderPosts();
  document.getElementById('titleInput').value = '';
  document.getElementById('contentInput').value = '';
}

function renderPosts() {
  const container = document.getElementById('postsContainer');
  container.innerHTML = '';
  posts.forEach((post, index) => {
    const card = document.createElement('div');
    card.className = 'card mb-3';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.innerHTML = `
      <h5 class="card-title post-preview" onclick="viewPost(${index})">${post.title}</h5>
      <p class="card-text">${post.content.substring(0, 100)}...</p>
      <button class="btn btn-sm btn-warning edit-btn" onclick="editPost(${index})">Edit</button>
      <button class="btn btn-sm btn-danger delete-btn" onclick="deletePost(${index})">Delete</button>
    `;

    card.appendChild(cardBody);
    container.appendChild(card);
  });
}

function viewPost(index) {
  document.getElementById('modalTitle').innerText = posts[index].title;
  document.getElementById('modalContent').innerText = posts[index].content;
  document.getElementById('fullPostModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('fullPostModal').style.display = 'none';
}

function deletePost(index) {
  if (confirm("Delete this post?")) {
    posts.splice(index, 1);
    savePosts();
    renderPosts();
  }
}

function editPost(index) {
  document.getElementById('titleInput').value = posts[index].title;
  document.getElementById('contentInput').value = posts[index].content;
  editIndex = index;
}

document.addEventListener('DOMContentLoaded', renderPosts);
