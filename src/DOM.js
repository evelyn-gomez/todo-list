import { doc } from 'prettier';
import './styles/main.css'; 

let homepage = document.querySelector('.homepage'); 

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
  };
  
  openModal(){
    this.modalBtn.addEventListener('click',()=>{
      this.__removeHiddenClass(this.overlayDiv);
      this.__removeHiddenClass(this.modalParent); 
      this.__addHiddenClass(homepage); 
    });
  };
  
  closeModal(){
    this.overlayDiv.addEventListener('click', ()=>{
      this.__addHiddenClass(this.overlayDiv);
      this.__addHiddenClass(this.modalParent); 
      this.__removeHiddenClass(homepage); 
    })
  }
}

export let modal = new Modal(); 





