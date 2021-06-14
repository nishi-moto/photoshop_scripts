#target photoshop
// Export each top layer group (artboards) as the desired file type
var destStatics = new Folder(activeDocument.path + '/../EXPORT/');
var doc = activeDocument;
if (!destStatics.exists) {
    destStatics.create();
}

(function getLayers(el) {
	 for (var a = 0; a < el.layerSets.length; a++) {
		 var lname = el.layerSets[a].name;
     var exportName = '';

     var arrNames = lname.split("_");
     
     for (var i = 0; i < arrNames.length; i++){
       if(i !=0){
        if( arrNames[i] === 'jpg'){
          exportName = arrNames[0]+'.'+arrNames[i];
        } else if( arrNames[i] === 'png'){
          exportName = arrNames[0]+'.'+arrNames[i];
        } else if( arrNames[i] === 'psd'){
          exportName = arrNames[0]+'.'+arrNames[i];
        }
        saveLayer(el.layers.getByName(lname), exportName, arrNames[i], destStatics, true);
       }
     }
	 }
})(doc)

function saveLayer(layer, lname, format, path, shouldMerge) {
  activeDocument.activeLayer = layer;
  dupLayers();
  if(format !== 'psd'){
    if (shouldMerge === undefined || shouldMerge === true) {
      activeDocument.mergeVisibleLayers();
    }
    activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);
    var saveFile = File(path + "/" + lname);
    SavePNG(saveFile);
  } else {
    var saveFile = File(path + "/" + lname);
    savePSD(saveFile);   
  }
  app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

function dupLayers() {
  var desc143 = new ActionDescriptor();
  var ref73 = new ActionReference();
  ref73.putClass( charIDToTypeID('Dcmn') );
  desc143.putReference( charIDToTypeID('null'), ref73 );
  desc143.putString( charIDToTypeID('Nm  '), activeDocument.activeLayer.name );
  var ref74 = new ActionReference();
  ref74.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
  desc143.putReference( charIDToTypeID('Usng'), ref74 );
  executeAction( charIDToTypeID('Mk  '), desc143, DialogModes.NO );
};

function SavePNG(saveFile){
  var pngOpts = new ExportOptionsSaveForWeb;
  pngOpts.format = SaveDocumentType.PNG
  pngOpts.PNG8 = true;
  pngOpts.transparency = true;
  pngOpts.interlaced = false;
  pngOpts.quality = 100;
  activeDocument.exportDocument(new File(saveFile), ExportType.SAVEFORWEB, pngOpts);
}

function savePSD(saveFile) {
  var psd_Opt = new PhotoshopSaveOptions();
  psd_Opt.layers = true; // Preserve layers.
  psd_Opt.embedColorProfile = true; // Preserve color profile.
  psd_Opt.annotations = true; // Preserve annonations.
  psd_Opt.alphaChannels = true; // Preserve alpha channels.
  psd_Opt.spotColors = true; // Preserve spot colors.
  app.activeDocument.saveAs(File(saveFile), psd_Opt, true);
}