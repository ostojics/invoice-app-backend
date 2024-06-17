import { Injectable } from '@nestjs/common';

export interface CurrentUser {
  email: string;
  city: string;
  address: string;
  country: string;
  name: string;
}
@Injectable()
export class UsersService {
  getCurrentUser() {
    const currentUser: CurrentUser = {
      email: 'marko@gmail.com',
      city: 'Belgrade',
      address: 'Knez Mihailova',
      country: 'Serbia',
      name: 'Marko Popović',
    };

    return currentUser;
  }
}
