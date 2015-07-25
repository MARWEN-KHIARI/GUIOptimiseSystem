#pragma strict
@script AddComponentMenu ("Games/GuiUtil/Optimize texture")
@script RequireComponent(GUITexture)
class GUITextureOptimizeScript extends MonoBehaviour {
private var pixelInset_:Rect;
private var default_resolution_x:float; //800 x 480 WVGA Landscape
private var aspectDynamic:boolean;

function Start () {
test_max_min_Percentage();
default_resolution_x=ConfigGame.default_resolution_x;
aspectDynamic=ConfigGame.aspectDynamic;
if(guiTexture)CalculPI ();
}

function FixedUpdate () {
if(!aspectDynamic)return;
if(testChangedAspect()){
  if(guiTexture)CalculPIDynamic ();
}
}

function test_max_min_Percentage(){
if(ConfigGame.maxPercentage<=1)ConfigGame.maxPercentage=1.5;
if((ConfigGame.minPercentage<=0||ConfigGame.minPercentage>=1))ConfigGame.minPercentage=0.8;
}

function CalculPI () {
pixelInset_=guiTexture.pixelInset;
var prc:float =((Screen.width-default_resolution_x)/Screen.width)+1;
if(prc==1)return;
else if(prc>ConfigGame.maxPercentage)prc=ConfigGame.maxPercentage;
else if(prc<ConfigGame.minPercentage)prc=ConfigGame.minPercentage;
//Debug.Log("prc texture:"+prc*100);
guiTexture.pixelInset = Rect (pixelInset_.x*prc, pixelInset_.y*prc, pixelInset_.width*prc, pixelInset_.height*prc);
}

function CalculPIDynamic () {
pixelInset_=guiTexture.pixelInset;
var prc:float =((Screen.width-default_resolution_x)/Screen.width)+1;
if(prc==1)return;
else if(prc>ConfigGame.maxPercentage)prc=ConfigGame.maxPercentage;
else if(prc<ConfigGame.minPercentage)prc=ConfigGame.minPercentage;
guiTexture.pixelInset = Rect (pixelInset_.x*prc, pixelInset_.y*prc, pixelInset_.width*prc, pixelInset_.height*prc);
default_resolution_x=Screen.width;
}

private var oldAspect:boolean=true;
function testChangedAspect():boolean{
if((Screen.width>Screen.height) == oldAspect)return false;
oldAspect=(Screen.width>Screen.height);
return true;
}

}