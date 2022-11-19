import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  myForm;
  token;
  userData;
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  ngOnInit() {
    this.myForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  login() {
    console.log(this.myForm.value);
    this.http.post('https://reqres.in/api/login', this.myForm.value).subscribe(
      (res:any) => {
        if (res) {
          console.log(res);
          if(res.token){
            localStorage.setItem('Auth',res.token);
            this.getListOfuser()
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getListOfuser(){
    this.http.get('https://reqres.in/api/unknown').subscribe((res:any)=>{
      console.log(res);
      this.userData=res.data;
    })
  }
}
