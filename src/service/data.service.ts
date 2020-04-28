export class DataService{

  private data: string[] = [ "First"];

  getData(): string[] {
    return this.data;
  }
  addData(storage: string){
    this.data.push(storage);
  }
}
