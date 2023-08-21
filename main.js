//Se llaman los id de la sección perfil y agregar tarea

const fecha = document.getElementById("fecha");
const lista = document.getElementById("lista");
const input = document.getElementById("input");
const botonEnter = document.getElementById("enter");
const advertencia = document.getElementById("advertencia");
const subtitulo = document.querySelector(".seccion-tarea")
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-throgh"; 
let id
let LIST

//Función de fecha

const FECHA = new Date()
fecha.innerHTML=FECHA.toLocaleDateString('es-MX',{ weekday:'long', month:'long', day:'numeric'} )

//Se crea funcón agregar tarea

function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }

  const REALIZADO = realizado ?check : uncheck  //si está realizado marcá el check
  const LINE = realizado ?lineThrough : ''     // si esta realizado tachalo

  const elemento =`
  <li id="elemento">
  <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
  <p class="text ${LINE}">${tarea}</p>
  <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
  </li>
`

  lista.insertAdjacentHTML("beforeend", elemento);
  
  
}

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}

botonEnter.addEventListener("click", () => {
  const tarea = input.value; //puedo saber que valor tiene el imput y asignarselo a tarea
  tarea? advertencia.innerHTML = `` :advertencia.innerHTML = `<span class="alert">No ingresaste una tarea</span>`

  if (tarea) {
    agregarTarea(tarea, id, false, false);
    LIST.push({
        nombre:tarea,
        id:id,
        realizado:false,
        eliminado:false
    })
  }

  localStorage.setItem('TODO', JSON.stringify(LIST))
  input.value = "";
  id++;
});

//Hacer funcionar enter

document.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const tarea = input.value;
    tarea? advertencia.innerHTML = `` :advertencia.innerHTML = `<span class="alert">No ingresaste una tarea</span>`
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LIST.push({
        nombre:tarea,
        id:id,
        realizado:false,
        eliminado:false
    })
    }

    localStorage.setItem('TODO', JSON.stringify(LIST))
    input.value = "";
    id++;
  }
});

//Eventos de los check y borrar

lista.addEventListener('click', function(e){
    const element = e.target 
    const elementData = element.attributes.data.value
    console.log(elementData)
    if (elementData === 'realizado'){
        tareaRealizada(element)
    }else if (elementData === 'eliminado'){
        tareaEliminada(element)
    }

  localStorage.setItem('TODO', JSON.stringify(LIST))
})

//Uso del Local Storage
// localStorage.setItem('TODO', JSON.stringify(LIST))
// localStorage.getItem('TODO')



let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}else{
    LIST = []
    id=0
}

function cargarLista(DATA){
    DATA.forEach(function (i) {
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
    });
}