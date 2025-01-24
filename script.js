// clase tarea
class Tarea {
    constructor(nombre) {
      this.nombre = nombre;
      this.completa = false;
    }
  
    completar() {
      this.completa = !this.completa;
    }
  }
  
  // Clase gestor de tarea
  class GestorDeTareas {
    constructor() {
      this.tareas = JSON.parse(localStorage.getItem('tareas')) || [];
      this.render();
    }
  
    agregarTarea(nombre) { //metodo usado para agregar tareas a la lista
      if (nombre.trim() === '') {
        alert('La tarea no puede estar vacía');
        return;
      }
      const tarea = new Tarea(nombre);
      this.tareas.push(tarea);
      this.guardarTareas();
      this.render();
    }
  
    editarTarea(index, nuevoNombre) { //metodo para editar
      if (nuevoNombre.trim() === '') {
        alert('El nombre de la tarea no puede estar vacío');
        return;
      }
      this.tareas[index].nombre = nuevoNombre;
      this.guardarTareas();
      this.render();
    }
  
    eliminarTarea(index) { // metodo eliminar
      this.tareas.splice(index, 1);
      this.guardarTareas();
      this.render();
    }
  
    guardarTareas() { //metodo para guardar en jsonpara poder agregar a local storage
      localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }
  
    render() { //se llama render porque estoy traumado ya con 3d react y swift.
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
  
      this.tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span style="${tarea.completa ? 'text-decoration: line-through;' : ''}">
            ${tarea.nombre}
          </span>
          <div>
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Eliminar</button>
          </div>
        `;
  
        // listener para poder hacer click en el texto y que se pueda completar la tarea
        li.querySelector('span').addEventListener('click', () => {
          tarea.completar(); // llama los diferentes metodos
          this.guardarTareas(); // llama los diferentes metodos
          this.render(); // llama los diferentes metodos
        });
  
        //listener para poder editar la tarea
        li.querySelector('.edit-btn').addEventListener('click', () => {
          const nuevoNombre = prompt('Editar Tarea:', tarea.nombre);
          if (nuevoNombre !== null) this.editarTarea(index, nuevoNombre);
        });
  
        //listener para poder borrar la tarea
        li.querySelector('.delete-btn').addEventListener('click', () => {
          if (confirm('¿Estás seguro de eliminar esta tarea?')) {
            this.eliminarTarea(index);
          }
        });
  
        taskList.appendChild(li);
      });
    }
  }
  
  // principal o main
  document.addEventListener('DOMContentLoaded', () => {
    const gestorDeTareas = new GestorDeTareas();
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
  
    addTaskBtn.addEventListener('click', () => {
      gestorDeTareas.agregarTarea(taskInput.value);
      taskInput.value = '';
    });
  });