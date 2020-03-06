
// Fixes unnecessary scrolling in mobile
let vh, vw;
function updateSize() {
  vh = window.innerHeight * 0.01;
  vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

}
window.addEventListener("resize", updateSize)
updateSize();

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = new Vue({
  el:"#app",
  data:{
    puestos:[],
    loaded:false,
  },
  methods:{},
  created(){

    async function fetchAll(){
      let resPodios = await fetch("./json/datos.json");
      let jsonPodios = await resPodios.json();     
      return jsonPodios
    }

    fetchAll()
    .then(data => {      
      app.puestos=data.puestos;
      // Forzar el spinner de carga.
      setTimeout( () =>{ app.loaded=true },1000);
    })
    .then(document.querySelector("#puestos").classList.add("growY"))
  },
  components:{
    cards:{
      props:["podio"],
      template:`
      <div class="col-11 text-center d-flex justify-content-between align-content-stretch mb-5" >
      <div  class="col-12 text-center d-flex justify-content-between align-content-stretch fade-animation">
        <div :class="item.border" style="width: 20%;" v-for="(item, index) in podio" :key="index">
          <div class="card-header">{{item.categoria}}</div>
          <div :class="item.text">
            <h3 class="card-title mt-5"><p class="categoria"> {{item.ganador}} </p></h3>
            <p class="card-text">{{item.puntos}} pts.</p>
          </div>
        </div>
        </div>
        </div>`
    }

  }

})