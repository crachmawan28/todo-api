const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Ambil & tampilkan semua todo
async function loadTodos() {
  const res = await fetch('/todos');
  const todos = await res.json();

  list.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';

    li.innerHTML = `
      <span onclick="toggleTodo('${todo._id}', ${!todo.completed})">${todo.title}</span>
      <div class="actions">
        <button onclick="toggleTodo('${todo._id}', ${!todo.completed})">✓</button>
        <button class="delete-btn" onclick="deleteTodo('${todo._id}')">✕</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// Tambah todo baru
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  await fetch('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });

  input.value = '';
  loadTodos();
});

// Toggle status selesai
async function toggleTodo(id, completed) {
  await fetch(`/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  });
  loadTodos();
}

// Hapus todo
async function deleteTodo(id) {
  await fetch(`/todos/${id}`, { method: 'DELETE' });
  loadTodos();
}

// Load pertama kali halaman dibuka
loadTodos();
