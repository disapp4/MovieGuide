export class User {
   id!: string;
   username!: string;
   roles!: Array<string>;

   hasRole(role:string): boolean {
     return  this.roles.includes(role)
   }
   print(){console.log(this.id);}
}


