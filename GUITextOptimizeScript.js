#pragma strict
@script AddComponentMenu ("Games/GuiUtil/Optimize text")
@script RequireComponent(GUIText)
class GUITextOptimizeScript extends MonoBehaviour {
private var default_resolution_x:float;
private var aspectDynamic:boolean;

function Start () {
//yield WaitForSeconds(waitForSeconds);
default_resolution_x=ConfigGame.default_resolution_x;
aspectDynamic=ConfigGame.aspectDynamic;
CalculPI ();
}

function FixedUpdate () {
if(!aspectDynamic)return;
if(testChangedAspect()){
  CalculPIDynamic ();
}
}

function CalculPI () {
var prc:float = ((Screen.width-default_resolution_x)/Screen.width)+1;
if(prc>ConfigGame.maxPercentage)prc=ConfigGame.maxPercentage;
else if(prc<ConfigGame.minPercentage)prc=ConfigGame.minPercentage;

guiText.fontSize=Mathf.CeilToInt(guiText.fontSize*prc);
}

function CalculPIDynamic () {
var prc:float =((Screen.width-default_resolution_x)/Screen.width)+1;
if(prc==1)return;
else if(prc>ConfigGame.maxPercentage)prc=ConfigGame.maxPercentage;
else if(prc<ConfigGame.minPercentage)prc=ConfigGame.minPercentage;
guiText.fontSize=Mathf.CeilToInt(guiText.fontSize*prc);
default_resolution_x=Screen.width;
}


private var oldAspect:boolean=true;
function testChangedAspect():boolean{
if((Screen.width>Screen.height) == oldAspect)return false;
oldAspect=(Screen.width>Screen.height);
return true;
}

}