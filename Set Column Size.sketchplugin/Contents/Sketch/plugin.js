var artboard;
var layoutGrid;
var gridWidth;
var columns;
var columnsWidth;
var gutterWidth;
var oneColumn;
var layers;

function setVariables(context){
	artboard = context.document.currentPage().currentArtboard();
	layoutGrid = artboard.layout(); // class: MSLayoutGrid
	gridWidth = layoutGrid.totalWidth();
	columns = layoutGrid.numberOfColumns();
	columnsWidth = Math.round(layoutGrid.columnWidth());
	gutterWidth = Math.round(layoutGrid.gutterWidth());
	oneColumn = Math.round((gridWidth - ((columns - 1 ) * gutterWidth)) / columns);
	layers = context.selection;
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
