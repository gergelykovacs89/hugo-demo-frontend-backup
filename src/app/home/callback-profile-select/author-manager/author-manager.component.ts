import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../profile/profile.service';
import {AuthorModel} from '../../../shared/models/author.model';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-author-manager',
  templateUrl: './author-manager.component.html',
  styleUrls: ['./author-manager.component.css']
})
export class AuthorManagerComponent implements OnInit {
  manageMode = false;
  editMode = false;
  showForm = false;
  authorForm: FormGroup;
  authors: AuthorModel[];


  constructor(private authorService: ProfileService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.initForm();
    this.authService.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }

  onDelete(authorName: string) {

  }

  onEdit(authorName: string) {
  }


  onSubmit() {
    this.authorService.addAuthor(this.authorForm.value)
      .subscribe((author: AuthorModel) => {
        this.authors.push(author);
        this.authService.authors.next(this.authors);
        this.showForm = !this.showForm;
        this.authorForm.reset();
      });
  }

  private initForm() {
    let authorName = '';
    let authorImagePath = '';
    let authorDescription = '';
    if (this.editMode) {

    }

    this.authorForm = new FormGroup({
      'name': new FormControl(authorName, Validators.required),
      'imgPath': new FormControl(authorImagePath, Validators.required),
      'description': new FormControl(authorDescription, Validators.required)
    });

    if (this.editMode) {
      this.authorForm.get('name').disable();
    }
  }
}


