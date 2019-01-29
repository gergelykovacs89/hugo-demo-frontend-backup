import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {AuthorModel} from '../../shared/models/author.model';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-callback-profile-select',
  templateUrl: './callback-profile-select.component.html',
  styleUrls: ['./callback-profile-select.component.css']
})
export class CallbackProfileSelectComponent implements OnInit {
  authors: AuthorModel[];



  constructor(private auth0Service: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.auth0Service.getAuthors().subscribe((authors) => {
      this.authors = authors;
    });
  }


  onSelectProfile(authorId: string, authorName: string) {
    this.auth0Service.loginAuthor(authorId);
    this.router.navigate(
      ['/profile/', authorName]
    );
  }



}
