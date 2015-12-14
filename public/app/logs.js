app.controller('LogsCtrl', function($scope, Log, ngProgress, toaster, $http) {

$scope.log = new Log();

var refresh = function() {

  $scope.logs = Log.query(function (result) {
  });
  $scope.holdLogs = $scope.logs;
  $scope.log ="";
  
}
refresh();

Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

$scope.getFoodNames = function(q) {
	var url = 'https://test.holmusk.com/food/search?q=' + q;
	  return $http.get(url).then(
	  function(response){
		  var res = response.data.map(function(item){
			return item.name;
		  });
		  return res.unique().slice(0, 10);
		},
		function(err)
		{
			toaster.error(err);
		});
};

$scope.onSelect = function ($item, $model, $label) {
  //do some processing if you think later
};

$scope.search = function(){
	$scope.logs = $scope.holdLogs;
	temp=[];
	 if ($scope.searchCriteria.name != undefined && $scope.searchCriteria.name.trim() != '' && $scope.logs.length > 0)
	 {
		for (var i = 0; i < $scope.logs.length; i++) 
		{
			if ($scope.logs[i].name.toUpperCase().search($scope.searchCriteria.name.toUpperCase()) >= 0)
			{
				temp.push($scope.logs[i]);
			}
		}
		$scope.logs = temp;
	 }
	 else
		 refresh();
}

$scope.add = function(log) {
	log.loggedDate = Date.now();
	Log.save(log,function(log){
			refresh();
		});
};

});
