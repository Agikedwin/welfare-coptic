export default class User {
  constructor(uid, full_name, email,user_id,user_role,date_joined,phone_number) {
    this.uid = uid;
    this.user_id = user_id
    this.user_role = user_role 
    this.date_joined = date_joined 
    this.phone_number = phone_number 
    this.full_name = full_name;
    this.email = email;    
    this.createdAt = new Date();
  }
}


