export default interface Users {
    id: number;
    username: string;
    fullName:string;
    email: string;
    mobilenumber: string;
    role:number;
    address1: string;
    landmark?: string;
    city: string;
    state: string;
    pin: string;
  
    userpic?: string;
  
    isdeleted: boolean;
    isactive: boolean;
  
    createdAt: Date;
    updatedAt: Date;
  }