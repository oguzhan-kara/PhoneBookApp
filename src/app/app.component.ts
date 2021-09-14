import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from './contact';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

   public contacts: Contact[] = [];

   constructor(private contactService: ContactService){}

   ngOnInit(){
      this.getContacts();
   }

   public getContacts(): void{
         this.contactService.getContacts().subscribe(
           (response: Contact[]) =>{
            this.contacts = response;
           },
               (error: HttpErrorResponse) => {
                 alert(error.message);
               }
         );
   }

   public onAddContact(addForm: NgForm): void{
     document.getElementById('add-contact-form')?.click();
     
     this.contactService.addContact(addForm.value).subscribe(
       (response: Contact) => {
         console.log(response);
         this.getContacts();
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     );
     addForm.reset();
   }


//public onOpenModal(contact: Contact, mode: string): void{
//  const container = document.getElementById('main-container');
//      const button = document.createElement('button');
//      button.type = 'button';
//      button.style.display = 'none';
//      button.setAttribute('data-toggle','modal');
//      if(mode == 'add'){
//        button.setAttribute('data-target','addContactModal');
//      }
//     //if(mode == 'edit'){
//     //  button.setAttribute('data-target','addContactModal');
//     //}
//     //if(mode == 'delete'){
//     //  button.setAttribute('data-target','addContactModal');
//     //}
//     container?.appendChild(button);
//     button.click();
//   }
}
