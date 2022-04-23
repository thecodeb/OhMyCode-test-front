export class Register{
  user: number;
  title: string;
  completed: boolean;

  // Constructor

  constructor(id: number, title: string, status: boolean){
    this.user = id;
    this.title = title;
    this.completed = status;
  }

}
