import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {

  const _user=inject(UserService);
  const _router =inject(Router );

if(_user.isLoggedIn()==false){
  _router.navigate(['/login']);
  return false;
  
}else{
  return true;
}

};
