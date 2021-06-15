#target photoshop
// Export each top layer group (artboards) as the desired file type
var folder = new Folder(activeDocument.path + '/../EXPORT/');

if (!folder.exists) {
    folder.create();
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
        saveLayer(el.layers.getByName(lname), exportName, arrNames[i], folder, false);
       }
     }
	 }
})(activeDocument)

function saveLayer(layer, lname, format, path, shouldMerge) {
  activeDocument.activeLayer = layer;
  dupLayers();
  var saveFile = File(path + "/" + lname);
  if(format === 'psd'){  
    savePSD(saveFile);  
  } else if(format === 'jpg') {
    SaveJPEG(saveFile);
  } else {
    SavePNG(saveFile);
  }
  activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

function dupLayers() {
  var actionDescriptor = new ActionDescriptor();
  var actionReference = new ActionReference();
  actionReference.putClass( charIDToTypeID('Dcmn') );
  actionDescriptor.putReference( charIDToTypeID('null'), actionReference );
  actionDescriptor.putString( charIDToTypeID('Nm  '), activeDocument.activeLayer.name );
  var ref74 = new ActionReference();
  ref74.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
  actionDescriptor.putReference( charIDToTypeID('Usng'), ref74 );
  executeAction( charIDToTypeID('Mk  '), actionDescriptor, DialogModes.NO );
};

function SavePNG(saveFile){
  var pngOptions = new PNGSaveOptions();
  pngOptions.compression = 0;
  pngOptions.interlaced = false;
  activeDocument.saveAs(new File(saveFile), pngOptions, true);
}

function SaveJPEG(saveFile){
  var jpegOptions = new JPEGSaveOptions();
  jpegOptions.quality = 12;
  jpegOptions.embedColorProfile = true;
  jpegOptions.matte = MatteType.NONE;
  jpegOptions.scans = 3;
  activeDocument.saveAs(new File(saveFile), jpegOptions, true);
}

function savePSD(saveFile) {
  var psdOptions = new PhotoshopSaveOptions();
  psdOptions.layers = true; // Preserve layers.
  psdOptions.embedColorProfile = true; // Preserve color profile.
  psdOptions.annotations = true; // Preserve annonations.
  psdOptions.alphaChannels = true; // Preserve alpha channels.
  psdOptions.spotColors = true; // Preserve spot colors.
  activeDocument.saveAs(File(saveFile), psdOptions, true);
}