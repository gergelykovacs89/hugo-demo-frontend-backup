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
  editMode = false;
  showForm = false;
  authorForm: FormGroup;
  authors: AuthorModel[];
  editedAuthor: AuthorModel;


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
    this.authorForm.get('name').disable();
    this.editMode = true;
    this.showForm = true;
    this.editedAuthor = this.authors.find(author => author.name === authorName);
    this.initForm();
  }


  onSubmit() {
    if (this.editMode) {
      this.authorForm.value.name = this.editedAuthor.name;
      this.authorForm.value._id = this.editedAuthor._id;
      this.authorService.updateAuthor(this.authorForm.value)
        .subscribe((updatedAuthor: AuthorModel) => {
          const authorToUpdateIndex = this.authors.findIndex(author => author.name === updatedAuthor.name);
          this.authors[authorToUpdateIndex] = updatedAuthor;
          this.authService.authors.next(this.authors);
          this.editMode = !this.editMode;
          this.showForm = !this.showForm;
          this.authorForm.reset();
        });
    } else {
      this.authorService.addAuthor(this.authorForm.value)
        .subscribe((author: AuthorModel) => {
          this.authors.push(author);
          this.authService.authors.next(this.authors);
          this.showForm = !this.showForm;
          this.authorForm.reset();
        });
    }
  }

  private initForm() {
    let authorName = '';
    let authorImagePath = '';
    let authorDescription = '';
    if (this.editMode) {
      authorName = this.editedAuthor.name;
      authorImagePath = this.editedAuthor.imgPath;
      authorDescription = this.editedAuthor.description;
    }
    this.authorForm = new FormGroup({
      'name': new FormControl(authorName, Validators.required),
      'imgPath': new FormControl(authorImagePath, Validators.required),
      'description': new FormControl(authorDescription, Validators.required)
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.editMode = false;
    this.editedAuthor = undefined;
    if (this.showForm) {
      this.initForm();
    }
  }
}


