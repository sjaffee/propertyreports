REIApp.service('GridService', function () {

	this.getPropertyColumns = function () {
        var columns = [
            { field: "reportTitle", title: "Report Name", width: "27%" },
            { field: "propertyAddress.street", title: "Street", width: "27%" },
            { field: "propertyAddress.city", title: "City", width: "18%" },
            { field: "propertyAddress.state", title: "State", width: "9%" },
            { command: { template: "<div class='actions'><a ng-click='editPropertyAnalysis($event)' data-role='button' class='k-primary k-button' role='button' aria-disabled='false' tabindex='0'>Edit</a><a ng-click='deletePropertyAnalysis($event)' class='k-button' data-role='button' role='button' aria-disabled='false' tabindex='0'>Delete</a></div>" } },
        ];
        return columns;
    }

    this.createGridOptions = function (dataSource, columnData) {
        var options = {
            dataSource: {
                data: dataSource,
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10,
            },
            selectable: "multiple",
            scrollable: false,
            groupable: false,
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 10
            },
            columns: columnData
        };
        return options;
    }
    
    this.getSelectedRowObject = function (event, grid) {
    	// Get the element which was clicked
         var sender = event.currentTarget;

         // Get the Kendo grid row which contains the clicked element
         var row = angular.element(sender).closest("tr");

         // Get the data bound item for that row
         return grid.dataItem(row);
     }
});