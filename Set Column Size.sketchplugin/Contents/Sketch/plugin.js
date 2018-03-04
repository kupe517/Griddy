var sketch, artboard, layoutGrid, gridWidth, columns, columnsWidth, gutterWidth, oneColumn, layers, userDefaults;

function setVariables(context){
	sketch = context.api();
	userDefaults = NSUserDefaults.alloc().initWithSuiteName("com.griddy.sketch");
	artboard = context.document.currentPage().currentArtboard();
	layoutGrid = artboard.layout(); // class: MSLayoutGrid
	if(layoutGrid){
		gridWidth = layoutGrid.totalWidth();
		columns = layoutGrid.numberOfColumns();
		columnsWidth = Math.round(layoutGrid.columnWidth());
		gutterWidth = Math.round(layoutGrid.gutterWidth());
		oneColumn = Math.round((gridWidth - ((columns - 1 ) * gutterWidth)) / columns);
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

}

function setColumns(val){
    var columnGaps = val - 1;
    var columnWidth = (val * oneColumn) + (columnGaps * gutterWidth);

		for(var i = 0 ; i < layers.length ; ++i){
    	layers[i].frame().width = columnWidth;
		}

    return;
}

var columnsSet1 = function(context) {
	setVariables(context);
	setColumns(1);
};

var columnsSet2 = function(context) {
	setVariables(context);
	setColumns(2);
};

var columnsSet3 = function(context) {
	setVariables(context);
	setColumns(3);
};

var columnsSet4 = function(context) {
	setVariables(context);
	setColumns(4);
};

var columnsSet5 = function(context) {
	setVariables(context);
	setColumns(5);
};

var columnsSet6 = function(context) {
	setVariables(context);
	setColumns(6);
};

var columnsSet7 = function(context) {
	setVariables(context);
	setColumns(7);
};

var columnsSet8 = function(context) {
	setVariables(context);
	setColumns(8);
};

var columnsSet9 = function(context) {
	setVariables(context);
	setColumns(9);
};

var columnsSet10 = function(context) {
	setVariables(context);
	setColumns(10);
};

var columnsSet11 = function(context) {
	setVariables(context);
	setColumns(11);
};

var columnsSet12 = function(context) {
	setVariables(context);
	setColumns(12);
};
