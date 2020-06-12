class List{
    constructor(){
        this.items = [];
    }
    push(element){
        function chongfu(additem){
            return additem.music_id != element.music_id;
          }
        if(this.items.length == 0){
            this.items.push(element);
        }else if(this.items.every(chongfu)){
            this.items.push(element);
        }
        
    }
  
}
const nplaylist = new List();
const likelist = new List();
const recentplay = new List();
const addmenusong = new List();
export {nplaylist,likelist,recentplay,addmenusong};