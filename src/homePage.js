import './styles/button.css';

let  btn = document.querySelector('button');
btn.textContent = 'click me'; 
let overlayDiv = document.querySelector('.overlay');
overlayDiv.classList.add('overlay off');

export default function homePage() {
  const p = document.getElementById("hello");
  p.textContent = "Hello World";
}

export function btnEventListener(){
  btn.addEventListener('click',()=>{
  })
}