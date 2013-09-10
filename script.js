/************************************************************************************
*
*  @ author: Zakeria Hassan
*  @ email: admin@bzcareer.com
*  @ description: THIS IS A LINKED LIST DATA STRUCTURE USED TO GENERATE A GRAPH..
*
*************************************************************************************/
var DateLinkedList = function(e){

    var self = {},
        start, end,length=0;
    var Node = function (v) {
        this.data = v;
        this.next = {};
        this.prev = {};
    };
    
    // UTILITY FUNCTIONS TO WORK WITH DATE....    
    
    self.toDate=function(dt){
	if(dt){
	 return new Date(dt.split("\/")[2],(parseInt(dt.split("\/")[1])-1)+"",dt.split("\/")[0]);
	}
	 return undefined;
    };

    self.indexOfArray = function (list, search) {
      var id = -1;
      for (var i = 0; i < list.length; i++) {
          if (search == list[i]) {
              id = i
          }
      }
      return id;
   };

	self.rewind=function(){
	var pc = $("#from").val();//"18/02/13";
	var formatter = new Data();
	var key = [];
	var d = new Data(formatter.format(stack.start.data.toDate()));
	var i = 0;
	if (d.toDate() > toDate(pc)) {
	    while (d.format(d.prevDate(i)) != pc) {
		i++;
		this.insert(new Data(d.format(d.prevDate(i)), 0, 0, 0));
	    }
	}
	return key;
	}
	

	self.toMinMax=function(){
	var current=this.start;
	var key=[];
	var nstk=new DateLinkedList();
	var d=new Date();
	var dnow=new Date(d.getFullYear(), d.getMonth(), d.getDate());
	if(this.start.data.toDate() > toDate($("#from").val())){
		stack.rewind();
		current=this.start;
	}	
	while(current.next.data){
      if( $("#to").val()==""|| toDate($("#to").val()).toString()==dnow.toString() ){
	if(current.next.data.prevDate() >= toDate($("#from").val())){
	  nstk.push(new Data(current.data.myDate, current.data.myClicks, current.data.myApplication, current.data.myImpressions));
	}
      }	
	else if($("#from").val()=="" && $("#to").val()!=""){
	  if( current.next.data.prevDate(2) <= toDate($("#to").val()) ){
	    nstk.push(new Data(current.data.myDate, current.data.myClicks, current.data.myApplication, current.data.myImpressions));
	  }
	} else {
	if(current.next.data.prevDate() >= toDate($("#from").val()) && current.next.data.prevDate(2) <= toDate($("#to").val())){
	  nstk.push(new Data(current.data.myDate, current.data.myClicks, current.data.myApplication, current.data.myImpressions));
	}

      }	
	  current=current.next;	
       }
 if( $("#to").val()!=""&& toDate($("#to").val()).toString()==dnow.toString() ){
nstk.push(new Data(current.data.myDate, current.data.myClicks, current.data.myApplication, current.data.myImpressions));
	}

	stack=nstk;
	return nstk.values();
	};	

	self.values=function(){
	var current=this.start;
	var key=[];
	while(current.next.data){  
	  key.push(current.data.toArray());
	  current=current.next;
	  }
	return key ;
	}; 
   self.split=function(from, to){
	var current = stack.start;
	var key = [];
	while (current.next.data) {
	 if (toDate(to) >= toDate(current.data.myDate) && toDate(from) <= toDate(current.data.myDate)) {
		key.push(current.data.toArray());
	    }
	    current = current.next;
	}
	return key;
};

    self.keys=function(){
	var current=this.start;
	var key=[];
	while(current.next.data){
	key.push(current.data.myDate);
	current=current.next;
	}
	return key;
    };

	self.getSummary=function(){
		var current = stack.start;
		var click =0,impress=0, apply=0;
		while (current.next.data) {
		 //Data {myDate: "04/03/2013", myClicks: 39, myApplication: 0, myImpressions: 0, toDate: function…}

		click+=current.data.myClicks; impress +=current.data.myImpressions; apply +=current.data.myApplication;
 	    current = current.next;
	}
		$("#sumClick").html(click);
		$("#sumApply").html(apply);
		$("#sumImpression").html(impress);
		return [click,impress, apply];
	}
    //Methods...
   self.insert=function(v){
        var n= new Node(v);
        if(this.start===null){
          this.push(v);
            return;
        }else{
            this.start.prev=n;
            n.next=this.start;
            this.start=n;
        }
        this.length++;
        return n;
    };
    
    self.push = function (v) {
        var n = new Node(v);
     if (this.start == null) {
            this.length=0;
	    this.start = this.end = n;
        } else {
            this.end.next = n;
            n.prev=this.end;
            this.end = n;
        }
	    this.length++; 
      return n;
    };

    self.pop = function () {
        var v = this.start;
        this.start = this.start.next;
        this.length--;
	return v;
    }
    self.remove = function (idx) {
        var i = 0;
        this.length--;
        var current = this.start,
            previous;
        if (idx === 0) {
            this.first = current.next;
        } else {
            while (i++ < idx) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        return current.data;
    };
    return self;
};
/***************************************
 * @explaination: Data is the node which is added to the Linkedin list...
 *
 **************************************/

 var Data=function(dt,clk,app,imp){
	this.myDate=dt;
        this.myClicks=clk;
        this.myApplication=app;
        this.myImpressions=imp;
	this.toDate=function(){
          return toDate(this.myDate);
   	};
	this.getKey=function(){
	  return this.myDate;
	};
	this.prevDate=function(n){
          var d=new Date();
          d= toDate(this.myDate);
	if(!n)
          d.setDate(d.getDate()-1)
        else
          d.setDate(d.getDate()-n)

	return d;
   	};
	this.nextDate=function(n){
	   var d=new Date();
           d= toDate(this.myDate);
	if(!n)
           d.setDate(d.getDate()+1)
        else
           d.setDate(d.getDate()+n)
	 
	  return d;
	};
	this.toArray=function(){
	 return [datePretty(this.myDate),this.myClicks, this.myApplication, this.myImpressions];
	};
	//UTILITY FUNCTION FOR FORMATING dates to dd/mm/yy....
	this.format=function(d){
	var dd= ( d.getDate() < 10 ) ? '0'+d.getDate() : d.getDate() ;
	var mm= (( d.getMonth() + 1 ) < 10 ) ? '0' + ( d.getMonth() + 1) : (d.getMonth() + 1);
	var yy= d.getFullYear().toString();
	return dd+"/"+mm+"/"+yy;
	};
  return this;    
};

