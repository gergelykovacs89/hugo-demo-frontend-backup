import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecommendationsComponent} from '../home/recommendations/recommendations.component';
import {ProfileLayoutComponent} from '../profile/profile-layout/profile-layout.component';
import {StoryLayoutComponent} from '../story/story-layout/story-layout.component';
import {NewStoryComponent} from '../story/new-story/new-story.component';
import {CallbackProfileSelectComponent} from '../home/callback-profile-select/callback-profile-select.component';
import {RegisterComponent} from '../home/register/register.component';
import {LoginComponent} from '../home/login/login.component';
import {AuthGuard} from '../auth/auth.guard';

const appRoutes: Routes = [
  {path: '', component: RecommendationsComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent },
  {path: 'profile/:username', component: ProfileLayoutComponent},
  {path: 'story/:id', component: StoryLayoutComponent },
  {path: 'new-story', component: NewStoryComponent, canActivate: [AuthGuard]},
  {path: 'profiles', component: CallbackProfileSelectComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
