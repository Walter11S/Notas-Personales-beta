// Obtener referencias a los elementos del DOM
const noteInput = document.getElementById('noteInput');
const saveButton = document.getElementById('saveButton');
const savedNotesContainer = document.getElementById('savedNotes');

// Evento click del botón "Guardar Nota"
saveButton.addEventListener('click', () => {
  const noteText = noteInput.value;
  if (noteText.trim() !== '') {
    saveNoteToLocalStorage(noteText);
  }
});

// Función para guardar una nota en el localStorage
function saveNoteToLocalStorage(noteText) {
  const timestamp = Date.now();
  const noteObject = { text: noteText, timestamp: timestamp };
  localStorage.setItem(`note_${timestamp}`, JSON.stringify(noteObject));
  saveNoteToDOM(noteObject);
}

// Función para guardar una nota en el DOM
function saveNoteToDOM(noteObject) {
  const noteElement = document.createElement('div');
  noteElement.className = 'note';

  const noteContent = document.createElement('div');
  noteContent.textContent = noteObject.text;
  noteElement.appendChild(noteContent);

  const editButton = document.createElement('button');
  editButton.textContent = 'Editar';
  editButton.className = 'editButton';
  noteElement.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.className = 'deleteButton';
  noteElement.appendChild(deleteButton);

  savedNotesContainer.appendChild(noteElement);
  noteInput.value = '';

  // Evento click del botón "Editar Nota"
  editButton.addEventListener('click', () => {
    noteInput.value = noteObject.text;
    removeNoteFromLocalStorage(noteObject.timestamp);
    savedNotesContainer.removeChild(noteElement);
  });

  // Evento click del botón "Eliminar Nota"
  deleteButton.addEventListener('click', () => {
    removeNoteFromLocalStorage(noteObject.timestamp);
    savedNotesContainer.removeChild(noteElement);
  });
}

// Función para eliminar una nota del localStorage
function removeNoteFromLocalStorage(timestamp) {
  localStorage.removeItem(`note_${timestamp}`);
}

// Cargar notas almacenadas en el localStorage
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('note_')) {
      const noteObject = JSON.parse(localStorage.getItem(key));
      saveNoteToDOM(noteObject);
    }
  }
});

// Función para guardar una nota en el DOM
function saveNoteToDOM(noteObject) {
  const noteElement = document.createElement('div');
  noteElement.className = 'note';

  const noteContent = document.createElement('div');
  noteContent.textContent = noteObject.text;
  noteElement.appendChild(noteContent);

  const dateElement = document.createElement('div');
  dateElement.textContent = formatDate(noteObject.timestamp);
  dateElement.className = 'date';
  noteElement.appendChild(dateElement);

  const editButton = document.createElement('button');
  editButton.textContent = 'Editar';
  editButton.className = 'editButton';
  noteElement.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.className = 'deleteButton';
  noteElement.appendChild(deleteButton);

  savedNotesContainer.appendChild(noteElement);
  noteInput.value = '';

  // Evento click del botón "Editar Nota"
  editButton.addEventListener('click', () => {
    noteInput.value = noteObject.text;
    removeNoteFromLocalStorage(noteObject.timestamp);
    savedNotesContainer.removeChild(noteElement);
  });

  // Evento click del botón "Eliminar Nota"
  deleteButton.addEventListener('click', () => {
    removeNoteFromLocalStorage(noteObject.timestamp);
    savedNotesContainer.removeChild(noteElement);
  });
}

// Función para formatear la fecha
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleString('es-ES', options);
}

// ...
