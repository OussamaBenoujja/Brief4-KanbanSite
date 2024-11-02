

/*
const filterprior = document.getElementById('priorityFilter');
filterprior.addEventListener("change",function(){
})*/


function sortTasksByPriority(tasks__, ad = true) {
  return tasks__.sort((a, b) => {
      if (ad) {
          return a.priority.localeCompare(b.priority);
      } else {
          return b.priority.localeCompare(a.priority);
      }
  });
}


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
      let sp = "white";
      switch(task.priority){
        case "P0":
            sp = "red";
            break;
        case "P1":
            sp = "blue";
            break;
        case "P2":
            sp = "green";
            break;
        case "P3":
            sp = "yellow";
            break;
      }
      const taskDiv = document.createElement('div');
      taskDiv.className = 'list'; 
      taskDiv.setAttribute('draggable', 'true'); 
      taskDiv.id = `card${index + 1}`; 
      taskDiv.innerHTML = `
              <div>
                
                    <div style="border-color: ${task.color};" class="cardthis relative flex flex-col min-w-0 break-words bg-gray-200 border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                      <div class="flex-auto px-1 pt-6">
                        <p class="relative z-10 mb-2 leading-normal text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 text-sm bg-clip-text">Project #2</p>
                        <a href="javascript:;">
                          <h5>${task.title}</h5>
                        </a>
                        <p class="mb-6 leading-normal text-sm">${task.description}</p>
                        <div class="flex items-center justify-between">
                            <div class="tofix101">
                                <button type="button" class="delete-btn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm   dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" id="del">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="size-6">
                                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                      </svg>
                                      </button>
                                <button type="button" class="edit-btn focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm dark:focus:ring-yellow-900">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="size-6">
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                      </svg>                              
                                </button>
                            </div>
                          <div class="prepIcon">
                            <div id="box" style="background-color: ${sp};"><p>${task.priority}</p></div>
                            <div id="box1" style="border-top: 15px solid ${sp};"></div>
                          </div>
                          <div class="mt-2">
                            <a href="javascript:;" class="relative z-20 inline-flex items-center justify-center w-10 h-10 -ml-4 text-white transition-all duration-200 border-2 border-white border-solid ease-soft-in-out text-xs rounded-circle hover:z-30">
                              <img class="w-full rounded-circle" alt="Image placeholder" src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-dashboard/assets/img/team-4.jpg" />
                            </a>
                          </div>
                        </div>
                      </div>
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




