


document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.list');
  const dropZones = document.querySelectorAll('.drop');

  function initializeCard(card) {
    card.setAttribute('draggable', true);

    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', card.id);
      console.log(`Dragging card: ${card.id}`); 
    });
  }

  function initializeDropZone(zone) {
    console.log(`Initializing drop zone: ${zone.id}`); 

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('drop-zone-active');
      console.log(`Drag over zone: ${zone.id}`); 
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      const cardId = e.dataTransfer.getData('text');
      const card = document.getElementById(cardId);

      if (card) {
        zone.appendChild(card);
        initializeCard(card);
        console.log(`Dropped card ${cardId} in zone: ${zone.id}`); // Debugging
      }

      zone.classList.remove('drop-zone-active');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drop-zone-active');
      console.log(`Drag left zone: ${zone.id}`); // Debugging
    });
  }
  
  cards.forEach(initializeCard);
  dropZones.forEach(initializeDropZone);
});



document.addEventListener('DOMContentLoaded', function() {
  const modalBtn = document.getElementById('addtaskbtn');
  const modal = document.getElementById('crud-modal');
  const closeModalBtn = modal.querySelector('[data-modal-toggle]');

  modalBtn.addEventListener('click', () => {
    modal.classList.toggle('hidden');  
    modal.classList.toggle('flex');    
  });

  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');     
    modal.classList.remove('flex');
  });
});



document.getElementById('modal-form').addEventListener('submit', function(event) {
  
  event.preventDefault();

  
    
    const title = document.getElementById('title').value;
    const dsrp = document.getElementById('dsrp').value;
    const color = document.getElementById('task-color').value; 
    const priority = document.getElementById('task-pr').value; 

    console.log('Title:', title);
    console.log('Description:', dsrp);
    console.log('Color:', color); 
    console.log('Priority:', priority); 


      
      const task = {
          title: title,
          description: dsrp,
          color: color,
          priority: priority,
          
      };

      
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Task added:', task);



  this.reset();
});



function displayTasks() {

  const taskList = document.getElementById('todo');
  
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  
  if (tasks.length === 0) {
      taskList.innerHTML = '<p>No tasks available.</p>';
      return; 
  }

  tasks.forEach((task, index) => {
    
      const taskDiv = document.createElement('div');
      taskDiv.className = 'list'; 
      taskDiv.setAttribute('draggable', 'true'); 
      taskDiv.id = `card${index + 1}`; 

      
      taskDiv.innerHTML = `
          <div class="cardTask">
              <h1>${task.title}</h1>
              <p>${task.description}</p>
              <div>
                  <button type="button" class="delete-btn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" id="del">Delete</button>
                  <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Edit</button>
              </div>
          </div>
      `;

      taskList.appendChild(taskDiv);
      const deleteBtn = taskDiv.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
        taskDiv.remove(); 
        removeTaskFromStorage(index); 
      });
        
        const cards = document.querySelectorAll('.list');
        const dropZones = document.querySelectorAll('.drop');

        function initializeCard(card) {
          card.setAttribute('draggable', true);

          card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', card.id);
            console.log(`Dragging card: ${card.id}`); 
          });
        }

        function initializeDropZone(zone) {
          console.log(`Initializing drop zone: ${zone.id}`); 

          zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drop-zone-active');
            console.log(`Drag over zone: ${zone.id}`); 
          });

          zone.addEventListener('drop', (e) => {
            e.preventDefault();
            const cardId = e.dataTransfer.getData('text');
            const card = document.getElementById(cardId);

            if (card) {
              zone.appendChild(card);
              initializeCard(card);
              console.log(`Dropped card ${cardId} in zone: ${zone.id}`); // Debugging
            }

            zone.classList.remove('drop-zone-active');
          });

          zone.addEventListener('dragleave', () => {
            zone.classList.remove('drop-zone-active');
            console.log(`Drag left zone: ${zone.id}`); // Debugging
          });
        }
        
        cards.forEach(initializeCard);
        dropZones.forEach(initializeDropZone);
  });
}


function removeTaskFromStorage(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1); 
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

window.onload = displayTasks;




