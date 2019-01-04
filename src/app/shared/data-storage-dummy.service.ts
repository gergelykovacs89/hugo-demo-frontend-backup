import {Injectable} from '@angular/core';
import {AuthorModel} from './models/author.model';
import {UserModel} from './models/user.model';


@Injectable({
  providedIn: 'root'
})
export class DataStorageDummyService {
  public users: UserModel[] = [
    new UserModel(1,
      'Gergely Kovács',
      'gergelyk89@gmail.com',
      'password'),

    new UserModel(2,
      'Döm Dödöm',
      'domdodom@gmail.com',
      'password')
  ];


  public authors: AuthorModel[] = [
    new AuthorModel('https://f4.bcbits.com/img/a1365259373_10.jpg', 'Optimista üzemlakatos',
      'halvanyretek'),
    new AuthorModel('https://i.kym-cdn.com/photos/images/original/000/482/848/a06.png', '“Dude, sucking at sumthin’ is the first step towards being sorta good at something.”',
      'dömdödöm'),
    new AuthorModel('https://lomioes.com/wp-content/uploads/2017/10/big-mouth-temporada-2-netflix.jpg', 'No, this is a crayon!',
      'nick'),
    new AuthorModel('https://images.fatherly.com/wp-content/uploads/2017/09/hormone-monster-1.jpg', '"Hello my precious, little ravioli."',
      'hormone monster'),
    new AuthorModel('https://pbs.twimg.com/profile_images/940930305984262144/at8wC1EL_400x400.jpg', '"Am I okay?"',
      'dj pendeho'),
    new AuthorModel('https://art.pixilart.com/76b30bb5ee255a6.png', '',
      'frisk'),
    new AuthorModel('https://res.cloudinary.com/teepublic/image/private/s--naiKfxPu--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1452631288/production/designs/393432_1.jpg', '"OK."',
      'saitama'),
    new AuthorModel('https://myanimelist.cdn-dena.com/s/common/uploaded_files/1447845500-b7b215212b9a1184ddaa141acbe5c075.png', '"And that was educational!"',
      'kintaro')
  ];


  constructor() {
  }

  getUserById(userId): UserModel {
    return this.users.find(u => u.id === userId);
  }
}
