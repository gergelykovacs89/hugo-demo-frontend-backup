import { Component, OnInit } from '@angular/core';
import {AuthorModel} from '../../../shared/models/author.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProfileService} from '../../profile.service';

@Component({
  selector: 'app-profile-cube',
  templateUrl: './profile-cube.component.html',
  styleUrls: ['./profile-cube.component.css']
})
export class ProfileCubeComponent implements OnInit {
  id: number;
  author: AuthorModel;

  constructor(private profileService: ProfileService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.author = this.profileService.getUserAuthor(this.id);
        }
      );
  }

}
