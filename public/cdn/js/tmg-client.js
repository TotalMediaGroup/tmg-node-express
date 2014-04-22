
TMG.client = {};

TMG.client.id = window.location.pathname.substr(8).toLowerCase();


TMG.client.updateSharedAssets = function(clientName) {
  $.ajax({ type:"GET", dataType:"json", url:'/ajax/list/'+clientName, data:{
  }, success: function() {
    alert("blah");
  }
});
}

TMG.client.updateUploadedAssets = function(clientName) {

}

TMG.client.displayAsset = function(assetKey) {

}
