export class UserCardPropsDto {
  constructor() {
    // this.fullName = '';
    // this.photoUrl = '';
    this.id = '';
    this.teamId = '';
    this.email = '';
    this.position = '';
    this.currUserPos = '';
    this.onItemChange = '';
    this.store = '';
  }

  public fullName: string = '';
  public photoUrl!: string;
  public id: string;
  public teamId: string;
  public email: string;
  public position: string;
  public currUserPos: string;
  public onItemChange: any;
  public store?: any;
}
