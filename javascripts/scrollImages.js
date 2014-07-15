
function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload !='function')
		window.onload=func;
	else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement,targetElement){

	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement)
		parent.appendChild(newElement);
	else
		{
			parent.insertBefore(newElement,targetElement.nextSibling);
		}
}

function addClass(element,value){

	if(!element.className){
		element.className=value;
	}
	else{
		newClassName=element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className=newClassName;
	}
}
function removeClass(element){
	if(element.className){
		element.className="";
	}
}
// highpage
function highlightPage(){

	if(!document.getElementById)
		return false;
	if(!document.getElementsByTagName)
		return false;
	var nav=document.getElementById('nav');
	var picwall=document.getElementById('pic-wall');
	if(picwall==null)return false;
	if(picwall.getElementsByTagName('h1').length==0)
		return false;
	 var h1=picwall.getElementsByTagName('h1')[0];

     var h2=picwall.getElementsByTagName('h2')[0];
     var h3=picwall.getElementsByTagName('h3')[0];
	 var links=nav.getElementsByTagName('a');
	 var linkurl;
	 var linktext;

	for (var i =1;i<links.length;i++)
	{    linkurl=links[i].getAttribute("href");
		linktext=links[i].getAttribute("rel");

		if(window.location.href.indexOf(linkurl)!=-1){
			if(linkurl.indexOf("index.html")!=-1)
			{h1.lastChild.nodeValue="校青志中心";
		     h2.lastChild.nodeValue=linktext;
		     addClass(links[i],"here");}
		 
		else{
			addClass(links[i],"here");
			h1.lastChild.nodeValue=links[i].lastChild.nodeValue;
			h2.lastChild.nodeValue=linktext;
             }
         }
	}

}

addLoadEvent(highlightPage);

 if(!document.getElementsByClassName){  
        document.getElementsByClassName = function(className, element){  
            var children = (element || document).getElementsByTagName('*');  
            var elements = new Array();  
            for (var i=0; i<children.length; i++){  
                var child = children[i];  
                var classNames = child.className.split(' ');  
                for (var j=0; j<classNames.length; j++){  
                    if (classNames[j] == className){   
                        elements.push(child);  
                        break;  
                    }  
                }  
            }   
            return elements;  
        };  
    }  

function register(){
     if(!document.getElementById)
		return false;
	if(!document.getElementsByTagName)
		return false;
	var content=document.getElementById('content');

	var login_box=document.getElementsByClassName('box-login',content);
	if(login_box.length==0)
		return false;
	var login_box_first=login_box[0];
	var login_box_second=login_box[1];
	var register =document.getElementById('register');
	var  back=document.getElementById('back');
	if(register==null)
		return false;
	register.onclick=function(){
  login_box_first.className="box-login nodisplay";
  login_box_second.className="box-login display";
}
	back.onclick=function(){
 login_box_first.className="box-login display";
  login_box_second.className="box-login nodisplay";
	}


}
addLoadEvent(register);


//绉诲姩鍏冪礌鍑芥暟
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem=document.getElementById(elementID);

	if(elem.movement){
	clearTimeout(elem.movement);	
	}
	if(final_x==0&&final_y==0){
	 	elem.style.left="0px";
	 	return;
	 }
	if(!elem.style.left)
	elem.style.left = "0px";
	if(!elem.style.top)
	elem.style.top = "0px";
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	 if(xpos==final_x&&ypos==final_y) return true;

	 if(xpos < final_x){
	 	var dist = Math.ceil((final_x-xpos)/10);
	 	xpos = xpos + dist;
	 }
	if(xpos > final_x){
		var dist = Math.ceil((xpos-final_x)/10);
		xpos = xpos - dist;
	}
	if(ypos < final_y){
		var dist = Math.ceil((final_y-ypos)/10);
		ypos = ypos + dist;
	}
	if(ypos > final_y){
		var dist = Math.ceil((ypos-final_y)/10);
		ypos = ypos - dist;
	}
	
	elem.style.left=xpos + "px";
	elem.style.top=ypos + "px";
	var repeat ="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}
// 璁剧珛绉诲姩
function move(elemID,i,width,height,pictureNum){
	moveElement(elemID,i*width,height,10);
	if(i%pictureNum!=0||i==0)
		i++;
	else{
		i=0;
	}
	var repeat="move("+"'"+elemID+"'"+","+i+","+i*width+","+height+","+pictureNum+")";
	 setTimeout(repeat,3000);
}
   var t;
   var i=0;
   var width=-418;
   var height=0;
  var pictureNum=4;
  var elemID="slidepicture";
   var slidethumbs = document.getElementById('slidethumbs');
   var links=slidethumbs.getElementsByTagName('li');
   var pre=0;
function slidepicturemove(){
	removeClass(links[pre]);
	addClass(links[i],"current");
	pre=i;
   moveElement(elemID,i*width,height,30);
    if(i==pictureNum)
    	i=-1;
    i++;
t=setTimeout("slidepicturemove()",2000);
}
addLoadEvent(slidepicturemove);



function slidethumbsmouseover(){
var slidethumbs2=document.getElementById('slidethumbs');
var links2=slidethumbs2.getElementsByTagName('li');
 for(var j=0;j<links2.length;j++)
   {
        links2[j].number=j;
   		links2[j].onmouseover=function(){
     	addClass(this,"current");
     	i=this.number;
     	clearTimeout(t);
     	slidepicturemove();
      };
      links2[j].onmouseout=function(){
      	removeClass(this);
      	
      };

    }
}
addLoadEvent(slidethumbsmouseover);

function slidehumbsbtn(){
var prev_btn=document.getElementById('prev-btn');
var next_btn=document.getElementById('next-btn');
var slidemain = document.getElementById('slidemain');
next_btn.onclick=function(){
      clearTimeout(t);
     slidepicturemove();
};
prev_btn.onclick=function(){
	if(i!=1)
	{
	if(i==0)
		i=3;
	 else i=i-2;
	}
      clearTimeout(t);
     slidepicturemove();

};




}
addLoadEvent(slidehumbsbtn);
