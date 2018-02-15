export class Cell{
     
     constructor(public x:number , public y:number ) {}
     public isAlive:boolean = false;

     kill():void{
        if(this.isAlive){
            this.isAlive = false;
        } 
     }
     resurrect():void{
        if(!this.isAlive){
            this.isAlive = true;
        } 
     }
}