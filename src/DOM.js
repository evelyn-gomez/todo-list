import './styles/main.css'; 

export let homepage = document.querySelector('.homepage'); 

let yo =  document.querySelector('.form'); 
console.log(yo); 

class Modal{
  // homepage; 
  /** @type Element */
  modalBtn; 
  modalParent; 
  overlayDiv; 

  constructor(){
      this.modalBtn = document.querySelector('.open-modal button');
      this.modalBtn.textContent = 'New Task'; 
      this.overlayDiv = document.querySelector('.overlay-modal'); 
      this.modalParent = document.querySelector('.modal-parent'); 
  }

  __removeHiddenClass(div){
    div.classList.remove('hidden'); 
  }
  __addHiddenClass(div){
    div.classList.add('hidden'); 
  }
  
  open(){
    this.modalBtn.addEventListener('click',()=>{
      this.__addHiddenClass(homepage); 
      this.__removeHiddenClass(this.overlayDiv);
      this.__removeHiddenClass(this.modalParent); 
    });
  }
  
  close(){
    this.overlayDiv.addEventListener('click', ()=>{
      this.__addHiddenClass(this.modalParent); 
      this.__addHiddenClass(this.overlayDiv);
      this.__removeHiddenClass(homepage); 
    })
  }
}
//Need the container that it click's
//to be the one that has the eventListener
//right now it's set to overlayDIV.addEventLlistern
export let modal = new Modal(); 









