import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth0/auth.service';
import {ProfileService} from '../../profile/profile.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private auth0Service: AuthService,
              private profileService: ProfileService) { }

  ngOnInit() {
  }

}
