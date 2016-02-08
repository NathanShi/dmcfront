angular.module('dmc.profile')
    .controller('profileController', 
    	['profileData', 'profileModel', '$stateParams', '$scope', '$location', '$anchorScroll', 
    	function (profileData, profileModel, $stateParams, $scope, $location, $anchorScroll) {
		
        $scope.profile = profileData;  //profile
        $scope.LeaveFlag = false;  //flag for visibility form Leave A Review
        $scope.submit_rating = 0;  //
        $scope.limit_reviews = true;  //limit reviews
        $scope.UserLogin = "DMC Member";  //Login user for reviews
        $scope.sortListModel = 0;  //model for drop down menu "sorting"

        $scope.showflag = false;
        $scope.followFlag = false;
        $scope.inviteToProject = false;
        $scope.invate = false;
        $scope.toProject = "";
        $scope.selectSortingStar = 0;
        console.info($stateParams);

        $scope.sortList = [
            {
                id: 0,
                val: "date",
                name: "Most recent"
            },
            {
                id: 1,
                val: "helpful",
                name: "Most Helpful"
            },
            {
                id: 2,
                val: "highest",
                name: "Highest to Lowest Rating"
            },
            {
                id: 3,
                val: "lowest",
                name: "Lowest to Highest Rating"
            },
            {
                id: 4,
                val: "verified",
                name: "Verified Users"
            }
        ];
        console.info($scope);

//review
        //Show Leave A Review form
        $scope.LeaveAReview = function () {
            $scope.LeaveFlag = !$scope.LeaveFlag;
        };

        //cancel Review form
        $scope.Cancel = function () {
            $scope.LeaveFlag = false;
        };

        //Submit Leave A Review form
        $scope.Submit = function (NewReview) {
			profileModel.add_profile_reviews($stateParams.profileId,
				{
					name: "DMC Member",
                    rating: $scope.submit_rating,
                    comment: NewReview.Comment
				},
				function(data){
	            	console.info(data);
	            	$scope.profile.number_of_comments++;
		            $scope.profile.rating.push($scope.submit_rating);
		            $scope.submit_rating = 0;
		            $scope.LeaveFlag = !$scope.LeaveFlag;
		            //calculate_rating();

                    $scope.SortingReviews('date');
	            	if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
	            }
	        );
        };

        //selected dorp down menu "sorting"
        $scope.selectItemDropDown = function (value) {
            if (value != 0) {
                var item = $scope.sortList[value];
                $scope.sortList.splice(value, 1);
                $scope.sortList = $scope.sortList.sort(function (a, b) {
                    return a.id - b.id
                });
                if ($scope.sortList.unshift(item)) this.sortListModel = 0;
            }
            $scope.SortingReviews($scope.sortList[0].val);
        };

        //sorting Reviews
        $scope.SortingReviews = function (val) {
            var sort;
            var order;
            var params = {};
            if ($scope.limit_reviews) {
                params['_limit'] = 2;
            }


            $scope.selectSortingStar = 0;
            switch (val) {
                case "date":
                	params['_order'] = "DESC";
                	params['_sort'] = "date";
                    break
                case "helpful":
                	params['_order'] = "DESC";
                	params['_sort'] = "like";
                    break
                case "lowest":
                	params['_order'] = "ASC";
                	params['_sort'] = "rating";
                    break
                case "highest":
                	params['_order'] = "DESC";
                	params['_sort'] = "rating";
                    break
                case "verified":
                	params['_order'] = "DESC";
                	params['_sort'] = "date";
                	params['status'] = true;
                    break
                case "1star":
                	params['_order'] = "DESC";
                	params['_sort'] = "date";
                	params['rating'] = 1;
                    $scope.selectSortingStar = 1;
                    break
                case "2star":
                	params['_order'] = "DESC";
                	params['_sort'] = "date";
                	params['rating'] = 2;
                    $scope.selectSortingStar = 2;
                    break
                case "3star":
                	params['_order'] = "DESC";
                	params['_sort'] = "date";
                	params['rating'] = 3;
                    $scope.selectSortingStar = 3;
                    break
                case "4star":
                	params['_order'] = "DESC";
                	params['_sort'] = "date";
                	params['rating'] = 4;
                    $scope.selectSortingStar = 4;
                    break
                case "5star":
                	params['_order'] = "DESC";
                	params['_sort'] = "date";
                	params['rating'] = 5;
                    $scope.selectSortingStar = 5;
                    break
            }

            profileModel.get_profile_reviews($stateParams.profileId, params, function(data){
            	console.info(data);
            	$scope.profile.reviews = data;
            	if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') $scope.$apply();
            });
        };

        //Selected rating
        $scope.stars = function (val) {
            $scope.submit_rating = val;
        };

        //View All Review
        $scope.ViewAllReview = function () {
            $scope.limit_reviews = !$scope.limit_reviews;
            $scope.SortingReviews($scope.sortList[0].val);
        };

///
        $scope.goToReview = function () {
            $location.hash('review');
            $anchorScroll();
        }

        $scope.showMore = function () {
            $scope.showflag = false;
        }

        $scope.follow = function () {
            $scope.followFlag = !$scope.followFlag;
        }


        $scope.searchText = "";
        $scope.btnInviteToProject = function () {
            $scope.inviteToProject = true;
        }

        $scope.btnAddToProject = function (title) {
            console.info("add", title)
            $scope.toProject = title;
            $scope.invate = true;
            $scope.inviteToProject = false;
        }

        $scope.btnCanselToProject = function () {
            $scope.inviteToProject = false;
        }

        $scope.btnRemoveOfProject = function () {
            $scope.toProject = "";
            $scope.invate = false;
            $scope.inviteToProject = false;
        }

        $scope.SortingReviews($scope.sortList[0].val);
    }]);

