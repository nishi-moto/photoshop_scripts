# Artboard Exporter

* Made with [ExtendScript](https://www.adobe.com/devnet/scripting/estk.html).

* Documentation [here](https://www.adobe.com/content/dam/acom/en/devnet/photoshop/pdfs/photoshop-javascript-ref-2020.pdf).

* List for Photoshop constants [here](http://web.archive.org/web/20140121053819/http://www.pcpix.com/Photoshop/char.htm).

* More documentation [here](http://jongware.mit.edu/pscs5js_html/psjscs5/index_Color%20classes%20for%20Adobe%20Photoshop.html) and [here](http://objjob.phrogz.net/pshop/hierarchy).

<br/>

**Current supported formats: PNG, JPG and PSD**

<BR/>

## How to use: 


### Naming your artboards:

* In each artboard, name your file without the use of "_". Example: "NameOfYourArtboard".
* If you want it to be exported to PNG, simply and "_png" in the end of the name. So, the name will be "NameOfYourArboard_png". Same goes for PSD and JPG, so "NameOfYourArtboard_psd", for example.
* If you want to export the same file for multiple extensions, add the desired extension as already explained again. For example, "NameOfYourArtobard_psd_png_jpg" will export "NameOfYourArtobard.psd", "NameOfYourArtobard.png" and "NameOfYourArtobard.jpg".

### Using the script:
* In your Photoshop, go to File > Scripts > Browse ...
* Load the artboard_exporter.js file and wait. *Voila!*
* You will find your exported files in the "EXPORT" folder, one level above as your current psd file.

