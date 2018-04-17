var sketch, artboard, artboardWidth, layoutGrid, gridWidth, columns, columnsWidth, gutterWidth, oneColumn, layers, userDefaults;

function setVariables(context){
	sketch = context.api();
	userDefaults = NSUserDefaults.alloc().initWithSuiteName("com.griddy.sketch");
	artboard = context.document.currentPage().currentArtboard();
	artboardWidth = artboard.frame().width();
	layoutGrid = artboard.layout(); // class: MSLayoutGrid
	if(layoutGrid){
		gridWidth = layoutGrid.totalWidth();
		columns = layoutGrid.numberOfColumns();
		columnsWidth = (layoutGrid.columnWidth()).toFixed(2);
		gutterWidth = (layoutGrid.gutterWidth()).toFixed(2);
		oneColumn = ((gridWidth - ((columns - 1 ) * gutterWidth)) / columns).toFixed(2);
		log(columns);
		log(columnsWidth);
		log(gutterWidth);
	}else{
		gridWidth = userDefaults.objectForKey("gridWidth");
		columns = userDefaults.objectForKey("columns");
		columnsWidth = userDefaults.objectForKey("columnsWidth");
		gutterWidth = userDefaults.objectForKey("gutterWidth");
		oneColumn = userDefaults.objectForKey("oneColumn");
	}

	layers = context.selection;

	// Save Grid settings
	[userDefaults setObject:gridWidth forKey:"gridWidth"];
	[userDefaults setObject:columns forKey:"columns"];
	[userDefaults setObject:columnsWidth forKey:"columnsWidth"];
	[userDefaults setObject:gutterWidth forKey:"gutterWidth"];
	[userDefaults setObject:oneColumn forKey:"oneColumn"];
	userDefaults.synchronize();

  /** Variables
	log('artboard :' + artboard);
	log('artboardWidth :' + artboardWidth);
	log('layoutGrid :' + layoutGrid);
	log('gridWidth :' + gridWidth);
	log('columns :' + columns);
	log('columnsWidth :' + columnsWidth);
	log('gutterWidth :' + gutterWidth);
	log('oneColumn :' + oneColumn);
	log('layers :' + layers);
	**/

}

function setColumns(val){
    var columnGaps = val - 1;
    var columnWidth = (val * oneColumn) + (columnGaps * gutterWidth);


		/** Todo: Update Column Sizing to new API **/
		for(var i = 0 ; i < layers.length ; ++i){
    	layers[i].frame().width = columnWidth;
		}

		var sketch = require('sketch/dom');
		var document = sketch.Document.getSelectedDocument();
		var selection = document.selectedLayers;

		for(var i = 0 ; i < selection.layers.length ; ++i){
			var layer = selection.layers[i];
			updateParentFrames(layer);
		}

    return;
}

function setArtboardWidth(){
	for(var i = 0 ; i < layers.length ; ++i){
		layers[i].frame().width = artboardWidth;
	}
}

/*
|--------------------------------------------------------------------------
| Object Sizing
|--------------------------------------------------------------------------
*/

var resizeColumns = function(context){
	var newSize = context.command.identifier().replace('columnsSet', '');
	setVariables(context);
	setColumns(newSize);
}

var columnsSetArtboardWidth = function(context) {
	setVariables(context);
	setArtboardWidth();
};


/*
|--------------------------------------------------------------------------
| Object Alignment
|--------------------------------------------------------------------------
*/

var setAlignment = function(context){
	var alignment = context.command.identifier().replace('columnsAlign', '');
	setVariables(context);
	alignColumns(alignment);
}

function alignColumns(val){
	var col1_x = Number((artboardWidth - gridWidth) / 2);
	var xLoc;

	//log('col1_x :' + col1_x);

	if(val == 1){
		xLoc = col1_x;
	}else if(val == 0){
		xLoc = 0;
	}
	else{
		xLoc = (+columnsWidth + +gutterWidth) * (+val - 1) + +col1_x;
	}

	//log('xLoc :' + xLoc);

	var sketch = require('sketch/dom');
	var document = sketch.Document.getSelectedDocument();
	var selection = document.selectedLayers;

	for(var i = 0 ; i < selection.layers.length ; ++i){
		var layer = selection.layers[i];
		//log('layerY:' + layer.frame.y)
		if(layer.parent.type == 'Group'){
			var groupY = layer.frame.y;
			var layerY = parentOffsetInArtboard(layer).y + groupY;
		}else{
			var layerY = layer.frame.y;
		}

		//log('layerYCalculated:' + layerY);

		positionInArtboard(layer, xLoc, layerY);
	}
}

/**
 Move the selected layer to x & y coordinates relative to the artboard
**/

var sketch = require('sketch/dom');
var document = sketch.Document.getSelectedDocument();
var layer = document.selectedLayers.layers[0];

function parentOffsetInArtboard (layer) {
  var offset = {x: 0, y: 0};
  var parent = layer.parent;
  while (parent.name && parent.type !== 'Artboard') {
    offset.x += parent.frame.x;
    offset.y += parent.frame.y;
    parent = parent.parent;
		// log('offset:' + offset.y);
  }
  return offset;
}

function positionInArtboard (layer, x, y) {
  var parentOffset = parentOffsetInArtboard(layer);
  var newFrame = new sketch.Rectangle(layer.frame);
  newFrame.x = x - parentOffset.x;
  newFrame.y = y - parentOffset.y;
  layer.frame = newFrame;
  updateParentFrames(layer);
}

function updateParentFrames(layer){
  var parent = layer.parent;
  while (parent && parent.name && parent.type !== 'Artboard') {
    parent.adjustToFit();
    parent = parent.parent;
  }
}

/* Layout Settings */

function centerLayout(context){
	setVariables(context);
	var layout = MSLayoutGrid.alloc().init();
	layout.setHorizontalOffset(layoutOffset);
	layout.setIsEnabled(true);
	artboard.setLayout(layout);
}

function setLayout(context){
	var layoutSize = context.command.identifier().replace('layout', '');
	setVariables(context);
	var layout = MSLayoutGrid.alloc().init();
	layout.setTotalWidth(layoutSize);
	layout.setNumberOfColumns(12);
	layout.setGutterWidth(20);
	var layoutOffset = (artboardWidth - layoutSize) / 2;
	layout.setHorizontalOffset(layoutOffset);
	layout.setIsEnabled(true);
	artboard.setLayout(layout);
}
