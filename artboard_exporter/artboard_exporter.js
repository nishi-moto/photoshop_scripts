#target photoshop
// Export each top layer group (artboards) as the desired file type
var folder = new Folder(activeDocument.path + '/../EXPORT/');
var folderpsd = new Folder(activeDocument.path + '/../EXPORT/PSD');
var folderjpeg = new Folder(activeDocument.path + '/../EXPORT/JPEG');
var folderpng = new Folder(activeDocument.path + '/../EXPORT/PNG');

if (!folder.exists) {
    folder.create();
}
if (!folderpsd.exists) {
  folderpsd.create();
}
if (!folderjpeg.exists) {
  folderjpeg.create();
}
if (!folderpng.exists) {
  folderpng.create();
}

(function getLayers(el) {
  var lname = [];

  for (var a = 0; a < el.layerSets.length; a++) {
    lname = el.layerSets[a].name;
    var arrNames = lname.split("_");
     
     for (var i = 0; i < arrNames.length; i++){
       if(i !=0){
          saveLayer(el.layers.getByName(lname), arrNames[0] + '.' + arrNames[i], arrNames[i]);
       }
     }
  }
})(activeDocument)

function saveLayer(layer, lname, format) {
  activeDocument.activeLayer = layer;
  dupLayers();
  if(format === 'psd'){ 
    savePSD(File(folderpsd + "/" + lname));   
  } else if(format === 'jpg') {
    SaveJPEG(File(folderjpeg + "/" + lname));
  } else {
    SavePNG(File(folderpng + "/" + lname));
  }
  activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

function dupLayers() {
  var actionDescriptor = new ActionDescriptor();
  var actionReference = new ActionReference();
  actionReference.putClass(charIDToTypeID('Dcmn')); // charIDToTypeID converts a string into the ID photoshop can read. 'Dcmn' = Document
  actionDescriptor.putReference(charIDToTypeID('null'), actionReference);
  actionDescriptor.putString(charIDToTypeID('Nm  '), activeDocument.activeLayer.name); // Nm = name
  var actionReference2 = new ActionReference();
  actionReference2.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt')); // 'Lyr'= Layer, 'Ornd' = ordinal, 'Trgt' = targetEnum
  actionDescriptor.putReference( charIDToTypeID('Usng'), actionReference2 );
  executeAction(charIDToTypeID('Mk  '), actionDescriptor, DialogModes.NO); // 'Mk'= Make event
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