var rawMockData = rawMockData || {};

rawMockData.ngArchitecture = {
  "angularVersion": null,
  "apps": ["az-ci"],
  "modules": [{
    "name": "az-ci",
    "deps": ["ngAnimate", "ngCookies", "az-ci-config", "ui.router", "angular-data.DSCacheFactory", "duScroll", "ngDropdowns", "ui.bootstrap"],
    "components": [{
      "name": "apiProcessors",
      "deps": [],
      "type": "service"
    }, {
      "name": "apiService",
      "deps": ["$http", "$q", "CONFIG", "DSCacheFactory", "env", "apiProcessors"],
      "type": "service"
    }, {
      "name": "newsData",
      "deps": ["$q", "$http", "CONFIG", "apiService"],
      "type": "service"
    }, {
      "name": "azClTableKeys",
      "deps": ["clView", "CONFIG"],
      "type": "directive"
    }, {
      "name": "clChartModel",
      "deps": ["CONFIG", "clColorMapping", "clControlsModel", "dev", "regexp"],
      "type": "service"
    }, {
      "name": "clEventsCharts",
      "deps": ["$rootScope", "eventsProcessor", "clChartModel", "clControlsModel", "Event", "clControlsEventsFilter"],
      "type": "service"
    }, {
      "name": "CLCompaniesCtrl",
      "deps": ["$scope", "$rootScope", "clChartModel", "clControlsModel", "clView", "dev", "$log"],
      "type": "controller"
    }, {
      "name": "clCompaniesDrug",
      "deps": ["$rootScope", "clChartModel", "dev"],
      "type": "directive"
    }, {
      "name": "eventFactory",
      "deps": ["Event", "$filter"],
      "type": "service"
    }, {
      "name": "Event",
      "deps": ["CONFIG", "util"],
      "type": "service"
    }, {
      "name": "eventsProcessor",
      "deps": ["$filter", "Event", "util", "CONFIG", "eventFactory"],
      "type": "service"
    }, {
      "name": "azEventsGroupChart",
      "deps": ["$rootScope", "$parse", "clChartModel", "clEventsCharts", "eventsTooltip", "CONFIG", "SVG_EVENTS", "$filter", "util", "eventsDrawData"],
      "type": "directive"
    }, {
      "name": "azEventsTable",
      "deps": ["$window", "$rootScope", "$state", "$filter", "clControlsModel", "clEventsCharts", "$timeout"],
      "type": "directive"
    }, {
      "name": "clControlsEventsFilter",
      "deps": ["CONFIG", "SVG_EVENTS", "util", "$filter"],
      "type": "service"
    }, {
      "name": "CLEventsCtrl",
      "deps": ["clView", "clControlsModel", "$scope", "eventsForDrugs", "clEventsCharts"],
      "type": "controller"
    }, {
      "name": "eventsDrawData",
      "deps": ["eventsProcessor", "clChartModel", "clControlsModel", "clEventsCharts"],
      "type": "service"
    }, {
      "name": "eventsTooltip",
      "deps": ["$filter", "chartTooltip", "clColorMapping"],
      "type": "service"
    }, {
      "name": "CLPipelineCtrl",
      "deps": ["$scope", "clControlsModel", "clView", "tourService"],
      "type": "controller"
    }, {
      "name": "clPipelineDrug",
      "deps": ["$rootScope", "clChartModel"],
      "type": "directive"
    }, {
      "name": "trialsSVGPatterns",
      "deps": ["CONFIG"],
      "type": "service"
    }, {
      "name": "azLandscapeAxisX",
      "deps": ["clEventsCharts"],
      "type": "directive"
    }, {
      "name": "azTrialsDrugChart",
      "deps": ["$rootScope", "$parse", "clChartModel", "trialsSVGPatterns", "CONFIG", "$filter", "clTrialsTooltip", "util", "clEventsCharts"],
      "type": "directive"
    }, {
      "name": "azTrialsDrugLabel",
      "deps": ["$parse", "$filter", "clColorMapping", "clControlsModel"],
      "type": "directive"
    }, {
      "name": "azTrialsTable",
      "deps": ["$window", "$rootScope", "$state", "$filter", "$timeout", "clControlsModel", "clEventsCharts", "trialsSVGPatterns", "clTrialsTooltip"],
      "type": "directive"
    }, {
      "name": "ClTrialsCtrl",
      "deps": ["$scope", "clControlsModel", "clView", "eventsForDrugs", "clEventsCharts"],
      "type": "controller"
    }, {
      "name": "clTrialsTooltip",
      "deps": ["$filter", "chartTooltip", "clColorMapping"],
      "type": "service"
    }, {
      "name": "CompetitiveLandscapeCtrl",
      "deps": ["$scope", "$log", "productName", "clChartModel", "clControlsModel", "clColorMapping"],
      "type": "controller"
    }, {
      "name": "clView",
      "deps": ["apiService", "clChartModel", "clControlsModel", "$rootScope", "$timeout"],
      "type": "service"
    }, {
      "name": "clColorMapping",
      "deps": ["CONFIG"],
      "type": "service"
    }, {
      "name": "clControlsModel",
      "deps": ["$state", "CONFIG", "ORDERING", "clColorMapping", "location"],
      "type": "service"
    }, {
      "name": "clControlsTab",
      "deps": ["$state"],
      "type": "directive"
    }, {
      "name": "clControls",
      "deps": ["$rootScope", "CONFIG", "clColorMapping", "$state", "util", "location", "clControlsModel", "clControlsEventsFilter", "regexp", "clView", "FEATURES"],
      "type": "directive"
    }, {
      "name": "visSlider",
      "deps": ["$stateParams", "$state"],
      "type": "directive"
    }, {
      "name": "ProductContext",
      "deps": ["apiService", "$window", "$location"],
      "type": "service"
    }, {
      "name": "ContextCtrl",
      "deps": ["$scope", "$state", "$timeout", "$stateParams", "$rootScope", "ProductContext", "apiService", "CONFIG"],
      "type": "controller"
    }, {
      "name": "dev",
      "deps": ["$rootScope", "$window", "$q", "currentEnvironment"],
      "type": "service"
    }, {
      "name": "PlaygroundCtrl",
      "deps": [],
      "type": "controller"
    }, {
      "name": "dfChartExportAnalystController",
      "deps": ["$scope"],
      "type": "controller"
    }, {
      "name": "dfChartExport",
      "deps": ["$window", "$state", "$filter", "$compile", "$timeout", "apiService", "dfChartManager"],
      "type": "directive"
    }, {
      "name": "dfChartManager",
      "deps": ["$stateParams", "$filter", "chartTooltip"],
      "type": "service"
    }, {
      "name": "dfChart",
      "deps": ["$window", "$state", "$filter", "dfChartManager"],
      "type": "directive"
    }, {
      "name": "ColorMapping",
      "deps": [],
      "type": "service"
    }, {
      "name": "dfAnalystControls",
      "deps": ["ColorMapping", "dfUtils"],
      "type": "directive"
    }, {
      "name": "dfCompetitorControls",
      "deps": ["ColorMapping", "dfUtils"],
      "type": "directive"
    }, {
      "name": "dfControls",
      "type": "directive"
    }, {
      "name": "dfExportButton",
      "deps": [],
      "type": "directive"
    }, {
      "name": "dfRegionControls",
      "deps": ["ColorMapping", "dfUtils"],
      "type": "directive"
    }, {
      "name": "dfResetButton",
      "deps": [],
      "type": "directive"
    }, {
      "name": "dfControlsModel",
      "type": "service"
    }, {
      "name": "ForecastsCtrl",
      "deps": ["$scope", "$state", "$stateParams", "$filter", "$window", "$timeout", "apiService", "forecasts", "competitors", "dfControlsModel", "dfGraphModel", "product", "isExport", "dfUtils", "tourService", "ProductContext", "dev"],
      "type": "controller"
    }, {
      "name": "dfGraphModel",
      "type": "service"
    }, {
      "name": "dfUtils",
      "deps": [],
      "type": "service"
    }, {
      "name": "faceting",
      "type": "service"
    }, {
      "name": "queries",
      "deps": ["ColorMapping"],
      "type": "service"
    }, {
      "name": "DFCSVExport",
      "deps": ["$filter"],
      "type": "service"
    }, {
      "name": "dfTable",
      "deps": ["$state", "$filter", "DFCSVExport"],
      "type": "directive"
    }, {
      "name": "azDrugSummaryTable",
      "deps": ["$window", "$rootScope", "$state", "$filter", "$timeout", "clControlsModel", "clEventsCharts", "trialsSVGPatterns", "clControlsEventsFilter"],
      "type": "directive"
    }, {
      "name": "dsChart",
      "deps": [],
      "type": "directive"
    }, {
      "name": "DrugSummaryCtrl",
      "deps": ["$scope", "$modal", "apiService", "ProductContext", "drugDetails", "$sce", "clEventsCharts", "HtmlHelper", "events", "tourService"],
      "type": "controller"
    }, {
      "name": "ngFocus",
      "deps": ["$timeout"],
      "type": "directive"
    }, {
      "name": "checkbox",
      "deps": ["$timeout"],
      "type": "directive"
    }, {
      "name": "radio",
      "type": "directive"
    }, {
      "name": "toggle",
      "type": "directive"
    }, {
      "name": "HomeCtrl",
      "deps": ["$scope", "$state", "$timeout", "apiService", "ProductContext", "tourService"],
      "type": "controller"
    }, {
      "name": "InfoCtrl",
      "deps": ["$scope", "$window", "tourService"],
      "type": "controller"
    }, {
      "name": "newsCategoriesMeta",
      "deps": [],
      "type": "service"
    }, {
      "name": "nfCategoriesControls",
      "deps": ["$location", "$anchorScroll", "newsCategoriesMeta"],
      "type": "directive"
    }, {
      "name": "nfDateRangeControls",
      "deps": ["$location", "nfControlsModel"],
      "type": "directive"
    }, {
      "name": "nfControlsModel",
      "deps": [],
      "type": "service"
    }, {
      "name": "nfRefineSearch",
      "deps": [],
      "type": "directive"
    }, {
      "name": "newsFlowCategoryReplace",
      "deps": [],
      "type": "filter"
    }, {
      "name": "NewsFlowCtrl",
      "deps": ["$log", "$scope", "nfControlsModel", "newsData", "ProductContext", "newsCategoriesMeta", "tourService"],
      "type": "controller"
    }, {
      "name": "analystName",
      "deps": ["$filter"],
      "type": "filter"
    }, {
      "name": "brokerId",
      "deps": ["$filter"],
      "type": "filter"
    }, {
      "name": "chartTooltip",
      "deps": ["$window"],
      "type": "service"
    }, {
      "name": "collapsible",
      "deps": [],
      "type": "directive"
    }, {
      "name": "companyName",
      "deps": [],
      "type": "filter"
    }, {
      "name": "companyOriginator",
      "deps": ["$filter"],
      "type": "filter"
    }, {
      "name": "cssClass",
      "deps": [],
      "type": "filter"
    }, {
      "name": "azCheckboxContainer",
      "deps": ["$parse"],
      "type": "directive"
    }, {
      "name": "azCompanySymbol",
      "deps": ["clColorMapping", "$parse"],
      "type": "directive"
    }, {
      "name": "azDrawer",
      "deps": [],
      "type": "directive"
    }, {
      "name": "azPositionBelow",
      "deps": [],
      "type": "directive"
    }, {
      "name": "azShowHistoricEvents",
      "deps": ["clControlsEventsFilter", "clEventsCharts", "$rootScope"],
      "type": "directive"
    }, {
      "name": "azSvgImg",
      "deps": ["$parse"],
      "type": "directive"
    }, {
      "name": "azSvgPatterns",
      "deps": ["trialsSVGPatterns"],
      "type": "directive"
    }, {
      "name": "azSyncScrollChild",
      "deps": [],
      "type": "directive"
    }, {
      "name": "azSyncScroll",
      "deps": ["$timeout"],
      "type": "directive"
    }, {
      "name": "selectAll",
      "deps": ["$parse"],
      "type": "directive"
    }, {
      "name": "drugName",
      "deps": ["$filter"],
      "type": "filter"
    }, {
      "name": "groupTitle",
      "deps": ["$filter"],
      "type": "filter"
    }, {
      "name": "HtmlHelper",
      "deps": [],
      "type": "service"
    }, {
      "name": "indicationsList",
      "deps": ["$filter"],
      "type": "filter"
    }, {
      "name": "location",
      "deps": ["$state"],
      "type": "service"
    }, {
      "name": "name",
      "deps": ["$filter"],
      "type": "filter"
    }, {
      "name": "orderObjectBy",
      "deps": [],
      "type": "filter"
    }, {
      "name": "pluralize",
      "deps": ["$filter"],
      "type": "filter"
    }, {
      "name": "rdSearchUrl",
      "deps": ["CONFIG"],
      "type": "filter"
    }, {
      "name": "regexp",
      "type": "value"
    }, {
      "name": "regionName",
      "deps": ["$filter"],
      "type": "filter"
    }, {
      "name": "toArray",
      "deps": [],
      "type": "filter"
    }, {
      "name": "util",
      "deps": ["CONFIG", "SVG_EVENTS", "$rootScope"],
      "type": "service"
    }, {
      "name": "azTour",
      "type": "directive"
    }, {
      "name": "tourService",
      "deps": ["$cookies", "$cookieStore", "$location", "$state"],
      "type": "service"
    }]
  }, {
    "name": "ngAnimate",
    "deps": ["ng"],
    "components": [{
      "name": "ngAnimateChildren",
      "deps": [],
      "type": "directive"
    }, {
      "name": "$$animateReflow",
      "type": "service"
    }]
  }, {
    "name": "ng",
    "deps": ["ngLocale"],
    "components": []
  }, {
    "name": "ngLocale",
    "deps": [],
    "components": [{
      "name": "$locale",
      "deps": [],
      "type": "service"
    }]
  }, {
    "name": "ngCookies",
    "deps": ["ng"],
    "components": [{
      "name": "$cookies",
      "type": "service"
    }, {
      "name": "$cookieStore",
      "type": "service"
    }]
  }, {
    "name": "az-ci-config",
    "deps": [],
    "components": [{
      "name": "SVG_EVENTS",
      "type": "constant"
    }, {
      "name": "ORDERING",
      "type": "constant"
    }, {
      "name": "CONFIG",
      "type": "constant"
    }, {
      "name": "FEATURES",
      "type": "constant"
    }, {
      "name": "ENV_OPTIONS",
      "type": "constant"
    }, {
      "name": "ENV_HOSTNAMES",
      "type": "constant"
    }, {
      "name": "env",
      "deps": ["$window", "ENV_OPTIONS", "currentEnvironment"],
      "type": "service"
    }, {
      "name": "currentEnvironment",
      "deps": ["ENV_HOSTNAMES"],
      "type": "service"
    }, {
      "name": "DEBUG",
      "deps": ["$window"],
      "type": "service"
    }]
  }, {
    "name": "ui.router",
    "deps": ["ui.router.state"],
    "components": []
  }, {
    "name": "ui.router.state",
    "deps": ["ui.router.router", "ui.router.util"],
    "components": [{
      "name": "$stateParams",
      "type": "value"
    }, {
      "name": "$state",
      "deps": ["$urlRouterProvider", "$urlMatcherFactoryProvider", "$locationProvider"],
      "type": "service"
    }, {
      "name": "$view",
      "deps": [],
      "type": "service"
    }, {
      "name": "$uiViewScroll",
      "deps": [],
      "type": "service"
    }, {
      "name": "uiView",
      "deps": ["$state", "$injector", "$uiViewScroll"],
      "type": "directive"
    }, {
      "name": "uiView",
      "deps": ["$compile", "$controller", "$state"],
      "type": "directive"
    }, {
      "name": "uiSref",
      "deps": ["$state", "$timeout"],
      "type": "directive"
    }, {
      "name": "uiSrefActive",
      "deps": ["$state", "$stateParams", "$interpolate"],
      "type": "directive"
    }, {
      "name": "isState",
      "deps": ["$state"],
      "type": "filter"
    }, {
      "name": "includedByState",
      "deps": ["$state"],
      "type": "filter"
    }]
  }, {
    "name": "ui.router.router",
    "deps": ["ui.router.util"],
    "components": [{
      "name": "$urlRouter",
      "deps": ["$urlMatcherFactoryProvider"],
      "type": "service"
    }]
  }, {
    "name": "ui.router.util",
    "deps": ["ng"],
    "components": [{
      "name": "$resolve",
      "deps": ["$q", "$injector"],
      "type": "service"
    }, {
      "name": "$templateFactory",
      "deps": ["$http", "$templateCache", "$injector"],
      "type": "service"
    }, {
      "name": "$urlMatcherFactory",
      "deps": [],
      "type": "service"
    }]
  }, {
    "name": "angular-data.DSCacheFactory",
    "deps": ["ng", "angular-data.DSBinaryHeap"],
    "components": [{
      "name": "DSCacheFactory",
      "deps": [],
      "type": "service"
    }]
  }, {
    "name": "angular-data.DSBinaryHeap",
    "deps": [],
    "components": [{
      "name": "DSBinaryHeap",
      "deps": [],
      "type": "service"
    }]
  }, {
    "name": "duScroll",
    "deps": ["duScroll.scrollspy", "duScroll.requestAnimation", "duScroll.smoothScroll", "duScroll.scrollContainer", "duScroll.scrollHelpers"],
    "components": [{
      "name": "duScrollDuration",
      "type": "value"
    }, {
      "name": "duScrollGreedy",
      "type": "value"
    }, {
      "name": "duScrollEasing",
      "deps": ["x"],
      "type": "value"
    }]
  }, {
    "name": "duScroll.scrollspy",
    "deps": ["duScroll.spyAPI"],
    "components": [{
      "name": "duScrollspy",
      "type": "directive"
    }]
  }, {
    "name": "duScroll.spyAPI",
    "deps": ["duScroll.scrollContainerAPI"],
    "components": [{
      "name": "spyAPI",
      "type": "service"
    }]
  }, {
    "name": "duScroll.scrollContainerAPI",
    "deps": [],
    "components": [{
      "name": "scrollContainerAPI",
      "type": "service"
    }]
  }, {
    "name": "duScroll.requestAnimation",
    "deps": ["duScroll.polyfill"],
    "components": [{
      "name": "requestAnimation",
      "type": "service"
    }, {
      "name": "cancelAnimation",
      "type": "service"
    }]
  }, {
    "name": "duScroll.polyfill",
    "deps": [],
    "components": [{
      "name": "polyfill",
      "type": "service"
    }]
  }, {
    "name": "duScroll.smoothScroll",
    "deps": ["duScroll.scrollHelpers", "duScroll.scrollContainerAPI"],
    "components": [{
      "name": "duSmoothScroll",
      "type": "directive"
    }]
  }, {
    "name": "duScroll.scrollHelpers",
    "deps": [],
    "components": []
  }, {
    "name": "duScroll.scrollContainer",
    "deps": ["duScroll.scrollContainerAPI"],
    "components": [{
      "name": "duScrollContainer",
      "type": "directive"
    }]
  }, {
    "name": "ngDropdowns",
    "deps": [],
    "components": [{
      "name": "dropdownSelect",
      "type": "directive"
    }, {
      "name": "dropdownSelectItem",
      "type": "directive"
    }, {
      "name": "dropdownMenu",
      "type": "directive"
    }, {
      "name": "dropdownMenuItem",
      "type": "directive"
    }, {
      "name": "DropdownService",
      "type": "service"
    }]
  }, {
    "name": "ui.bootstrap",
    "deps": ["ui.bootstrap.tpls", "ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.dateparser", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdown", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"],
    "components": []
  }, {
    "name": "ui.bootstrap.tpls",
    "deps": ["template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/day.html", "template/datepicker/month.html", "template/datepicker/popup.html", "template/datepicker/year.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html"],
    "components": []
  }, {
    "name": "template/accordion/accordion-group.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/accordion/accordion.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/alert/alert.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/carousel/carousel.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/carousel/slide.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/datepicker/datepicker.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/datepicker/day.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/datepicker/month.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/datepicker/popup.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/datepicker/year.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/modal/backdrop.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/modal/window.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/pagination/pager.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/pagination/pagination.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/tooltip/tooltip-html-unsafe-popup.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/tooltip/tooltip-popup.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/popover/popover.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/progressbar/bar.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/progressbar/progress.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/progressbar/progressbar.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/rating/rating.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/tabs/tab.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/tabs/tabset.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/timepicker/timepicker.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/typeahead/typeahead-match.html",
    "deps": [],
    "components": []
  }, {
    "name": "template/typeahead/typeahead-popup.html",
    "deps": [],
    "components": []
  }, {
    "name": "ui.bootstrap.transition",
    "deps": [],
    "components": [{
      "name": "$transition",
      "type": "service"
    }]
  }, {
    "name": "ui.bootstrap.collapse",
    "deps": ["ui.bootstrap.transition"],
    "components": [{
      "name": "collapse",
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.accordion",
    "deps": ["ui.bootstrap.collapse"],
    "components": [{
      "name": "accordionConfig",
      "type": "constant"
    }, {
      "name": "AccordionController",
      "type": "controller"
    }, {
      "name": "accordion",
      "deps": [],
      "type": "directive"
    }, {
      "name": "accordionGroup",
      "deps": [],
      "type": "directive"
    }, {
      "name": "accordionHeading",
      "deps": [],
      "type": "directive"
    }, {
      "name": "accordionTransclude",
      "deps": [],
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.alert",
    "deps": [],
    "components": [{
      "name": "AlertController",
      "type": "controller"
    }, {
      "name": "alert",
      "deps": [],
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.bindHtml",
    "deps": [],
    "components": [{
      "name": "bindHtmlUnsafe",
      "deps": [],
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.buttons",
    "deps": [],
    "components": [{
      "name": "buttonConfig",
      "type": "constant"
    }, {
      "name": "ButtonsController",
      "type": "controller"
    }, {
      "name": "btnRadio",
      "deps": [],
      "type": "directive"
    }, {
      "name": "btnCheckbox",
      "deps": [],
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.carousel",
    "deps": ["ui.bootstrap.transition"],
    "components": [{
      "name": "CarouselController",
      "type": "controller"
    }, {
      "name": "carousel",
      "type": "directive"
    }, {
      "name": "slide",
      "deps": [],
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.dateparser",
    "deps": [],
    "components": [{
      "name": "dateParser",
      "type": "service"
    }]
  }, {
    "name": "ui.bootstrap.position",
    "deps": [],
    "components": [{
      "name": "$position",
      "type": "service"
    }]
  }, {
    "name": "ui.bootstrap.datepicker",
    "deps": ["ui.bootstrap.dateparser", "ui.bootstrap.position"],
    "components": [{
      "name": "datepickerPopupConfig",
      "type": "constant"
    }, {
      "name": "datepickerConfig",
      "type": "constant"
    }, {
      "name": "DatepickerController",
      "type": "controller"
    }, {
      "name": "datepicker",
      "deps": [],
      "type": "directive"
    }, {
      "name": "daypicker",
      "type": "directive"
    }, {
      "name": "monthpicker",
      "type": "directive"
    }, {
      "name": "yearpicker",
      "type": "directive"
    }, {
      "name": "datepickerPopup",
      "type": "directive"
    }, {
      "name": "datepickerPopupWrap",
      "deps": [],
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.dropdown",
    "deps": [],
    "components": [{
      "name": "dropdownConfig",
      "type": "constant"
    }, {
      "name": "dropdownService",
      "type": "service"
    }, {
      "name": "DropdownController",
      "type": "controller"
    }, {
      "name": "dropdown",
      "deps": [],
      "type": "directive"
    }, {
      "name": "dropdownToggle",
      "deps": [],
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.modal",
    "deps": ["ui.bootstrap.transition"],
    "components": [{
      "name": "$$stackedMap",
      "deps": [],
      "type": "service"
    }, {
      "name": "modalBackdrop",
      "type": "directive"
    }, {
      "name": "modalWindow",
      "type": "directive"
    }, {
      "name": "$modalStack",
      "type": "service"
    }, {
      "name": "$modal",
      "deps": [],
      "type": "service"
    }]
  }, {
    "name": "ui.bootstrap.pagination",
    "deps": [],
    "components": [{
      "name": "pagerConfig",
      "type": "constant"
    }, {
      "name": "paginationConfig",
      "type": "constant"
    }, {
      "name": "PaginationController",
      "type": "controller"
    }, {
      "name": "pagination",
      "type": "directive"
    }, {
      "name": "pager",
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.tooltip",
    "deps": ["ui.bootstrap.position", "ui.bootstrap.bindHtml"],
    "components": [{
      "name": "$tooltip",
      "deps": [],
      "type": "service"
    }, {
      "name": "tooltipPopup",
      "deps": [],
      "type": "directive"
    }, {
      "name": "tooltip",
      "type": "directive"
    }, {
      "name": "tooltipHtmlUnsafePopup",
      "deps": [],
      "type": "directive"
    }, {
      "name": "tooltipHtmlUnsafe",
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.popover",
    "deps": ["ui.bootstrap.tooltip"],
    "components": [{
      "name": "popoverPopup",
      "deps": [],
      "type": "directive"
    }, {
      "name": "popover",
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.progressbar",
    "deps": [],
    "components": [{
      "name": "progressConfig",
      "type": "constant"
    }, {
      "name": "ProgressController",
      "type": "controller"
    }, {
      "name": "progress",
      "deps": [],
      "type": "directive"
    }, {
      "name": "bar",
      "deps": [],
      "type": "directive"
    }, {
      "name": "progressbar",
      "deps": [],
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.rating",
    "deps": [],
    "components": [{
      "name": "ratingConfig",
      "type": "constant"
    }, {
      "name": "RatingController",
      "type": "controller"
    }, {
      "name": "rating",
      "deps": [],
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.tabs",
    "deps": [],
    "components": [{
      "name": "TabsetController",
      "type": "controller"
    }, {
      "name": "tabset",
      "deps": [],
      "type": "directive"
    }, {
      "name": "tab",
      "type": "directive"
    }, {
      "name": "tabHeadingTransclude",
      "type": "directive"
    }, {
      "name": "tabContentTransclude",
      "deps": [],
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.timepicker",
    "deps": [],
    "components": [{
      "name": "timepickerConfig",
      "type": "constant"
    }, {
      "name": "TimepickerController",
      "type": "controller"
    }, {
      "name": "timepicker",
      "deps": [],
      "type": "directive"
    }]
  }, {
    "name": "ui.bootstrap.typeahead",
    "deps": ["ui.bootstrap.position", "ui.bootstrap.bindHtml"],
    "components": [{
      "name": "typeaheadParser",
      "type": "service"
    }, {
      "name": "typeahead",
      "type": "directive"
    }, {
      "name": "typeaheadPopup",
      "deps": [],
      "type": "directive"
    }, {
      "name": "typeaheadMatch",
      "type": "directive"
    }, {
      "name": "typeaheadHighlight",
      "deps": [],
      "type": "filter"
    }]
  }]
};
