// Tarea Class
class Tarea {
    constructor(nombre) {
      this.nombre = nombre;
      this.completa = false;
    }
  
    completar() {
      this.completa = !this.completa;
    }
  }
  
  // GestorDeTareas Class
  class GestorDeTareas {
    constructor() {
      this.tareas = JSON.parse(localStorage.getItem('tareas')) || [];
      this.render();
    }
  
    agregarTarea(nombre) {
      if (nombre.trim() === '') {
        alert('La tarea no puede estar vacía');
        return;
      }
      const tarea = new Tarea(nombre);
      this.tareas.push(tarea);
      this.guardarTareas();
      this.render();
    }
  
    editarTarea(index, nuevoNombre) {
      if (nuevoNombre.trim() === '') {
        alert('El nombre de la tarea no puede estar vacío');
        return;
      }
      this.tareas[index].nombre = nuevoNombre;
      this.guardarTareas();
      this.render();
    }
  
    eliminarTarea(index) {
      this.tareas.splice(index, 1);
      this.guardarTareas();
      this.render();
    }
  
    guardarTareas() {
      localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }
  
    render() {
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
  
        // listener para el click de completado de tarea
        li.querySelector('span').addEventListener('click', () => {
          tarea.completar();
          this.guardarTareas();
          this.render();
        });
  
        li.querySelector('.edit-btn').addEventListener('click', () => {
          const nuevoNombre = prompt('Editar Tarea:', tarea.nombre);
          if (nuevoNombre !== null) this.editarTarea(index, nuevoNombre);
        });
  
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