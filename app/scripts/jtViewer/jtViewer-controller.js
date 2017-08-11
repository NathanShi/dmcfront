
'use strict';

angular.module('dmc.jtViewer')
    .controller('jtViewerController', ['$stateParams', '$state', "$scope", "ajax", "$location","dataFactory","toastModel",
    function ($stateParams, $state, $scope, ajax, $location, dataFactory, toastModel) {
      var viewerManager;
      var controlManager;
      var serverBaseURL= "http://52.162.245.146:8080/ConverterService_v1140";
      var json_string = "";
      var key;

      console.log("jt viewcontroller is working")

    var controlView = function(){
  	  controlManager = new PLMVisWeb.Control({
  		host: document.getElementById('content'),
  		width: document.getElementById('content').offsetWidth + 'px',
  		height: document.getElementById('content').offsetHeight + 'px'
  	});

  	viewerManager = controlManager.getExtensionManager(PLMVisWeb.Viewer);
  }
  controlView();

  console.log("control manager")
  console.log(controlManager)

  $scope.openJtFile= function(){
  	var decodeData = atob(json_string);
  	var obj = JSON.parse(decodeData);
  	viewerManager.openWithObject(obj, function(success, modelRootPsId){
  	if (success){
  		viewerManager.setVisibilityByPsId(modelRootPsId, true);
  	}
  	});
  	window.onresize = resizeImage;
  	resizeImage(null);
  }

  $scope.dmcConverter= function (){
    console.log("it works")
    var url      = document.getElementById('URLinput').value;
  	var callback = function(xhr) {
  		json_string = xhr.response;
  	};
  	dmcExport(url, callback);
  }

  var dmcExport= function(url, callback){
  	var xhr = new XMLHttpRequest();
  	xhr.open('POST', serverBaseURL+'/converter/convertDiv');
  	xhr.onload = function() {
  		callback(xhr);
  		alert('Convert Complete');
  		open();
  	}
  	xhr.send(url);
  }

  var resizeImage= function(e){
      document.body.style.padding = "0";
      document.body.style.margin = "0";
      document.body.style.overflow = "hidden";
  	var toolbarHeight = document.getElementById("toolbar").offsetHeight;
      var contentHeight = window.innerHeight - toolbarHeight;
      document.getElementById('content').style.height = contentHeight.toString() + 'px';

      var contentWidth = window.innerWidth;
      document.getElementById('content').style.width = contentWidth.toString() + 'px';

      if ('controlManager' in window && controlManager) {
  		controlManager.setSize(contentWidth, contentHeight);
  	}
  }

  window.onresize = resizeImage;
   resizeImage(null);


    }]
);
