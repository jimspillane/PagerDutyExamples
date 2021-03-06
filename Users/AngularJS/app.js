var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    
    // set options for Angular UI Grid(http://ui-grid.info/)
    $scope.gridOptions = {
        columnDefs: [
            { field: 'id' },            
            { field: 'name' },
            { field: 'email' },
            { field: 'time_zone' },
            { field: 'color' },
            { field: 'role' },
            { field: 'avatar_url' },
            { field: 'billed' , visible: false},
            { field: 'user_url' },
            { field: 'invitation_sent', visible: false },
            { field: 'marketing_opt_out', visible: false },
            { field: 'job_title' }
        ],
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'Users.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "Users", style: 'headerStyle' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
            return docDefinition;
        },
        exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    // get users
    $scope.getUsers = function () {  
        // call Pagerduty api and set the grid to the response 
        $http({
            method: 'GET',
            url: 'https://' + $scope.subDomain + '.pagerduty.com/api/v1/users',
            headers: {
                "Authorization": "Token token=" + $scope.apiKey,
                "Accept": "application/vnd.pagerduty+json;version=1.1"
                }
        }).then(function successCallback(response) {
            $scope.gridOptions.data = response.data.users;
        }, function errorCallback(response) {

        });
    }

}]);
