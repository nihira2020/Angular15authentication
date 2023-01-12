import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  constructor(private builder: FormBuilder, private service: AuthService, private toastr: ToastrService,
    private dialogref: MatDialogRef<UpdatepopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.service.getuserrole().subscribe(res => {
      this.rolelist = res;
    });
    
    

  }
  ngOnInit(): void {
    if (this.data.usercode != '' && this.data.usercode != null) {
      this.loaduserdata(this.data.usercode);
    }
  }
  rolelist: any;
  editdata: any;

  registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)
  });

  loaduserdata(code: any) {
    this.service.GetUserbyCode(code).subscribe(res => {
      this.editdata = res;
      console.log(this.editdata);
      this.registerform.setValue({
        id: this.editdata.id, name: this.editdata.name,
        password: this.editdata.password, email: this.editdata.email, gender: this.editdata.gender,
        role: this.editdata.role, isactive: this.editdata.isactive
      });
    });
  }
  UpdateUser() {
    this.service.updateuser(this.registerform.value.id, this.registerform.value).subscribe(res => {
      this.toastr.success('Updated successfully.');
      this.dialogref.close();
    });
  }

}
