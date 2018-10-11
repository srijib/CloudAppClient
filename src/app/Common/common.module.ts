import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBox } from './messagebox.component/messagebox.component';
import { Inputbox } from './inputbox.component/inputbox.component';
import { FillPipe } from './fillPipe';
import { PagingNav } from './paging.component/paging.component';
import { TakePipe } from './takePipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContextmenuComponent } from './contex-menu.component/context-menu.component';
import { NavagationBar } from './nav-bar.component/nav-bar.component';
import { Loader } from './loader.component/loader.component';
import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularDraggableModule
  ],
  declarations: [
    ContextmenuComponent,
    MessageBox,
    Inputbox,
    NavagationBar,
    FillPipe,
    PagingNav,
    TakePipe,
    Loader
  ],
  exports: [
    ContextmenuComponent,
    MessageBox,
    Inputbox,
    NavagationBar,
    FillPipe,
    PagingNav,
    TakePipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Loader,
    AngularDraggableModule
  ]
})
export class SharedModule { }
