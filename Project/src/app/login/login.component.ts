import { Component, OnInit } from '@angular/core';
import{Router,ActivatedRoute,Params}from'@angular/router'
import{Http} from '@angular/http';
import{AppService}from'../app.service'
import{User} from '../../models/user.model'
import { FormGroup, FormControl, Validators,FormBuilder,NgForm} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginform:FormGroup;
userlist:User[];
list:User[];
currentUser:User=this._appservice.currentUser;
constructor(private _appservice:AppService,private http:Http,private router:Router,private _formBuilder:FormBuilder)
{ }

  ngOnInit() {
    
    this ._appservice.getusers().subscribe(userlist=>{
      this.list=userlist;
      this.getJsonData();
    })
  this.loginform=this._formBuilder.group({
l_name:[],
l_email:[] ,
l_password:[]
})
  }
  getJsonData(){
    this.userlist=this.list;
  }
 onSubmit(form:NgForm){
    this.currentUser.userId=form.value.l_email;
    this.currentUser.password=form.value.l_password;
    console.log("userId is",this.currentUser.userId);
    console.log("password is",this.currentUser.password);

   for(let user of this.userlist)
    {
     if(this.currentUser.userId==user.userId&&this.currentUser.password==user.password)
       {
             this.currentUser.userName=user.userName;
             this.currentUser=user;  
           this.router.navigate(['/postticket']);
       }
    }


    
    
    form.resetForm();
 }
}
