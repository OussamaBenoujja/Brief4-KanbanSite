

/*
const filterprior = document.getElementById('priorityFilter');
filterprior.addEventListener("change",function(){
})*/




const filterSearch = document.querySelector('.searchbtn');
const srch_ = document.getElementById('default-search');

srch_.addEventListener("input", function (e) {
    e.preventDefault();
    const srch = document.getElementById('default-search').value.toLowerCase(); 
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => {
        let tcard = `card${index + 1}`;
        let cardElement = document.getElementById(tcard);
        const matchesSearch = !srch || task.title.toLowerCase().includes(srch);
        cardElement.style.display = matchesSearch ? "block" : "none";
    });
});


const filterbtn = document.getElementById('filterbtn');

filterbtn.addEventListener("click", function () {

    const datestart = document.getElementById('datepicker-range-start').value;
    const dateend = document.getElementById('datepicker-range-end').value;
    const priorF = document
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks.forEach((task, index) => {
        let tcard = `card${index + 1}`;
        let cardElement = document.getElementById(tcard);
        cardElement.style.display =  (task.date >= datestart && task.date <= dateend)  ? "block" : "none"; 
    });

});

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
        console.log(`Dropped card ${cardId} in zone: ${zone.id}`); 
      }

      zone.classList.remove('drop-zone-active');

      const taskList = document.getElementById('todo');
      const task1 = document.getElementById("doing");
      const task2 = document.getElementById("done");
      const todoCounter = document.getElementById("numtodo");
      const doingCounter = document.getElementById("numprogress");
      const doneCounter = document.getElementById("numpdone");
    
      todoCounter.innerHTML = taskList.childElementCount;
      doingCounter.innerHTML = task1.childElementCount;
      doneCounter.innerHTML = task2.childElementCount;

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
    const date = document.getElementById('date').value; 
    const taskel = document.getElementById('todo').id;

    console.log('Title:', title);
    console.log('Description:', dsrp);
    console.log('Color:', color); 
    console.log('Priority:', priority); 
    console.log('Priority:', date); 
    console.log('father Container:', taskel);
      const task = {
          title: title,
          description: dsrp,
          color: color,
          priority: priority,
          date: date,
          cont: taskel,
      };

      
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Task added:', task);

  this.reset();
  location.reload();

});



function displayTasks() {

  const taskList = document.getElementById('todo');
  
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const task1 = document.getElementById("doing");
  const task2 = document.getElementById("done");
  const todoCounter = document.getElementById("numtodo");
  const doingCounter = document.getElementById("numprogress");
  const doneCounter = document.getElementById("numpdone");

  todoCounter.innerHTML = taskList.childElementCount;
  doingCounter.innerHTML = task1.childElementCount;
  doneCounter.innerHTML = task2.childElementCount;
  
  if (tasks.length === 0) {
      taskList.innerHTML = '<p>No tasks available.</p>';
      return; 
  }
  let ctk;
  tasks.forEach((task, index) => {

      const taskDiv = document.createElement('div');
      taskDiv.className = 'list'; 
      taskDiv.setAttribute('draggable', 'true'); 
      taskDiv.id = `card${index + 1}`; 
      taskDiv.innerHTML = `
          <div class="cardTask" style="border-color: ${task.color}">
              <h1>${task.title}</h1>
              <p>${task.description}</p>
              <p>${task.priority}</p>
              <p>Date:${task.date}</p>
              <div>
                  <button type="button" class="delete-btn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" id="del">Delete</button>
                  <button type="button" class="edit-btn focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Edit</button>
              </div>
          </div>
      `;
      document.getElementById(task.cont).appendChild(taskDiv);
      const deleteBtn = taskDiv.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
        taskDiv.remove(); 
        removeTaskFromStorage(index); 
      });
      const editBtn = taskDiv.querySelector('.edit-btn');
      const modal = document.getElementById('crud-modal33');
      const closeModalBtn = modal.querySelector('[data-modal-toggle]');
        editBtn.addEventListener('click', () => {
          ctk = index;
          modal.classList.toggle('hidden');  
          modal.classList.toggle('flex'); 
          modal.querySelector('#title').value = task.title;
          modal.querySelector('#dsrp').value = task.description;
          modal.querySelector('#task-color').value = task.color; 
          modal.querySelector('#task-pr').value = task.priority;
          modal.querySelector('#date').value = task.date;    
        });
        closeModalBtn.addEventListener('click', () => {
          modal.classList.add('hidden');     
          modal.classList.remove('flex');
        });


      modal.addEventListener("submit", function(){
              const task_new = {
                title: modal.querySelector('#title').value,
                description: modal.querySelector('#dsrp').value,
                color: modal.querySelector('#task-color').value,
                priority: modal.querySelector('#task-pr').value,
                date: modal.querySelector('#date').value,
                cont: task.cont,
            };

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks[ctk] = task_new;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log('Task added:', task_new);

        this.reset();
        location.reload();
      })


        //this part is relate to drop and drag functions :: goint to make it it's own function later
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
              let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
              let indx = cardId.split("card");
              let indx1 = indx.toString();
              let indx2 = parseInt(indx1);
              tasks[indx2].cont = zone.id; 
              console.log(tasks);
              localStorage.setItem('tasks', JSON.stringify(tasks));
              zone.appendChild(card);
              initializeCard(card);
              console.log(`Dropped card ${cardId} in zone: ${zone.id}`); 
            }

            zone.classList.remove('drop-zone-active');
          });

          zone.addEventListener('dragleave', () => {
            zone.classList.remove('drop-zone-active');
            console.log(`Drag left zone: ${zone.id}`); 
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




