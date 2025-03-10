import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const loginGuard: CanActivateFn = (route, state) => {

  const _user=inject(UserService);
  const _router =inject(Router );

if(_user.isLoggedIn()==true){
  _router.navigate(['/client']);
  return false;
  
}else{
  return true;
}
};
