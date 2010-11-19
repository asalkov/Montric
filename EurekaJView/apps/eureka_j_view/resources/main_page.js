// ==========================================================================
// Project:   EurekaJView - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals EurekaJView */

// This page describes the main user interface for your application.  
EurekaJView.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'middleView topView bottomView instrumentationTypeView instrumentationTypeScrollView chartGroupView'.w(),
    
	topView: SC.ToolbarView.design({
		childViews: 'logoView loadTreeView'.w(),
		layout: {top: 0, left: 0, right: 0, height: 40 },
		anchorLocation: SC.ANCHOR_TOP,
		
		logoView: SC.LabelView.design({
			layout: {centerY: 0, height: 40, top: 5, left: 10, width: 200 },
			controlSize: SC.LARGE_CONTROL_SIZE,
			fontWeight: SC.BOLD_WEIGHT,
			value: 'EurekaJ Profiler'
		}),
		
		loadTreeView: SC.ButtonView.design({
			layout: { centerY: 0, height: 30, right: 10, width: 150},
			title: "Load Chart Data",
			action: 'addRandomData',
            target: 'EurekaJView.chartController'
		})
	}),
	
	middleView: SC.View.design({
		childViews: 'selectedInstrumentationTypeLabelView testFlotChart'.w(),
		hasHorizontalScroller: NO,
		layout: { top: 39, bottom: 39, left: 300, right: 0},
		backgroundColor: 'white',
		
		selectedInstrumentationTypeLabelView: SC.LabelView.design({
			layout: {centerY: 0, height: 30, top: 5, left: 10 },
			controlSize: SC.LARGE_CONTROL_SIZE,
			fontWeight: SC.BOLD_WEIGHT,
			fontColor: 'black',
			valueBinding: 'EurekaJView.instrumentationTypeController.selectedInstrumentationTypePath'
		}).classNames('blacklabel'),

		testFlotChart: Flot.GraphView.design({
            layout: { top: 100, right: 40, bottom: 100, left: 40 },
			//data: [SC.Object.create({label: 'set1', data:[[0,0]]})],
            dataBinding: 'EurekaJView.chartController.arrangedObjects',
            //optionsBinding: 'EurekaJView.chartController.options',
            debugInConsole: NO,
        }),
		  
		
	}),
	
	instrumentationTypeView: SC.View.design({
		childViews: 'instrumentationTypeLabelView'.w(),
		layout: {top: 41, bottom: 391, left: 0, width: 306 },
		anchorLocation: SC.ANCHOR_TOP,
		backgroundColor: "#4D4D4D",
		
		instrumentationTypeLabelView: SC.LabelView.design({
			layout: {centerY: 0, height: 30, top: 5, left: 10 },
			controlSize: SC.LARGE_CONTROL_SIZE,
			fontWeight: SC.REGULAR_WEIGHT,
			textAlign: SC.ALIGN_CENTER,
			value: 'Instrumentation Menu'
		}),
	}),
	
	instrumentationTypeScrollView: SC.ScrollView.design({
		layout: {top: 71, bottom: 393, left: 2, width: 299 },
		hasHorizontalScroller: YES,
		hasVerticalScroller: YES,

		contentView: SC.SourceListView.design({
			backgroundColor: '#F0F8FF',
			contentValueKey: "name",
			rowHeight: 18,
			contentBinding: 'EurekaJView.instrumentationTypeController.arrangedObjects',
			selectionBinding: 'EurekaJView.instrumentationTypeController.selection'

		}),
	}),
	
	chartGroupView: SC.View.design({
		layout: {height: 350, bottom: 41, left: 0, width: 306 },
		childViews: 'chartGroupLabelView chartGroupScrollView'.w(),
		anchorLocation: SC.ANCHOR_TOP,
		backgroundColor: "#4D4D4D",
		
		chartGroupLabelView: SC.LabelView.design({
			llayout: {centerY: 0, height: 30, top: 5, left: 10 },
			controlSize: SC.LARGE_CONTROL_SIZE,
			fontWeight: SC.REGULAR_WEIGHT,
			textAlign: SC.ALIGN_CENTER,
			value: 'Available Charts'
		}),
		
		chartGroupScrollView: SC.ScrollView.design({
			layout: {height: 318, bottom: 2, left: 2, width: 299 },
			hasHorizontalScroller: YES,
			hasVerticalScroller: YES,

			contentView: SC.ListView.design({
				backgroundColor: '#F0F8FF',
				contentValueKey: "name",
				contentBinding: 'EurekaJView.instrumentationChartController.arrangedObjects',
				selectionBinding: 'EurekaJView.instrumentationChartController.selection'

			}),
		}),
	}),
	
	bottomView: SC.ToolbarView.design({
		//childViews: 'selectedInstrumentationPathViewT'.w(),
		layout: { bottom: 0, left: 0, right: 0, height: 40 },
		anchorLocation: SC.ANCHOR_BOTTOM,
		
		/*selectedInstrumentationPathViewT: SC.LabelView.design({
			layout: {centerY: 0, height: 40, top: 5, left: 10},
			controlSize: SC.LARGE_CONTROL_SIZE,
			fontWeight: SC.BOLD_WEIGHT,
			valueBinding: 'EurekaJView.instrumentationTreeController.selectedInstrumentationPath'
		})*/
	})
  })

});
