import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { ViewStudentComponent } from './student/view-student/view-student.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'students',
    component: StudentComponent
  },
  {
    path: 'students/:id',
    component: ViewStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
