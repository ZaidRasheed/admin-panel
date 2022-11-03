# Admin Panel for the grades portal project

### Checkout the grades portal project [here](https://github.com/ZaidRasheed/grades-portal)

## Tech Stack
- React.js 
- Firebase Authentication
- Firestore Database

## Project overview

- #### Admins 
1. Admins can create teacher accounts and also delete them.
2. Admins view teachers data and update some of it.
3. Admins can also enabled and disable teachers accounts to restrict their access. 
4. Admins can update their password or request an email link if they forgot the password.
## Description and Approach 
- Admins are created in the admins database and structured as follow: 
```
{
  name: string
  email: string
  id: string
  gender: string
}
  ```
- All operations by admins are done through an express api which is hosted with firebase cloud functions find the code [here](https://github.com/ZaidRasheed/backend-admin-panel).

## Demo account credentials:
- Email: demoadmin@adminpanel.com
- Password: demoadmin@adminpanel.com
---
## View project [live?](https://zaidrasheed.github.io/admin-panel/)