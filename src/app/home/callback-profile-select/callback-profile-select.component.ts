import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AuthorModel} from '../../shared/models/author.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as ProfileSelectAction from '../../profile/store/profile.actions';
import {AppState} from '../../store/app.reducers';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {State} from '../../profile/store/profile.reducers';

@Component({
  selector: 'app-callback-profile-select',
  templateUrl: './callback-profile-select.component.html',
  styleUrls: ['./callback-profile-select.component.css']
})
export class CallbackProfileSelectComponent implements OnInit {
  public selectedAuthorState: Observable<{
    authors: AuthorModel[],
    selectedAuthor: AuthorModel
  }>;
  manageMode = false;
  editMode = false;
  authorToEdit: string;

  authorForm: FormGroup;
  formMode = false;
  authorIndex: number;


  constructor(private auth0Service: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.selectedAuthorState = this.store.select('profile');
    this.initForm();
  }

  onSelectProfile(authorName: string) {
    this.store.dispatch(new ProfileSelectAction.SelectAuthor(authorName));
    this.router.navigate(
      ['/profile/', authorName]
    );
  }


  onDelete(authorName: string) {
    this.selectedAuthorState.subscribe((state) => {
      this.authorIndex = state.authors.findIndex(author => author.name === authorName);
    }).unsubscribe();
    this.store.dispatch(new ProfileSelectAction.DeleteAuthor({authorIndex: this.authorIndex, authorName: authorName}));
  }

  onEdit(authorName: string) {
    this.editMode = true;
    this.formMode = true;
    this.authorToEdit = authorName;
    this.selectedAuthorState.subscribe((state) => {
      this.authorIndex = state.authors.findIndex(author => author.name === authorName);
    }).unsubscribe();
    this.initForm();
  }


  onSubmit() {
    if (!this.editMode) {
      this.store.dispatch(new ProfileSelectAction.AddAuthor(this.authorForm.value));
    } else {
      this.store.dispatch(new ProfileSelectAction.UpdateAuthor({index: this.authorIndex, updatedAuthor: this.authorForm.getRawValue()}));
    }
    this.onCancel();
  }

  private initForm() {
    let authorName = '';
    let authorImagePath = '';
    let authorDescription = '';
    if (this.editMode) {
      this.store.select('profile')
        .pipe(take(1))
        .subscribe((value: State) => {
          const author = value.authors.find(authors => authors.name === this.authorToEdit);
          authorName = author.name;
          authorImagePath = author.imgPath;
          authorDescription = author.description;
        });
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

  onNewAuthor() {
    this.formMode = true;
  }

  onCancel() {
    this.formMode = false;
    this.editMode = false;
    this.authorForm.reset();
  }

  onManage() {
    this.manageMode = true;
  }

  cancelManage() {
    this.onCancel();
    this.manageMode = false;
  }
}
