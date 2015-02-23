angular.module('Eggly', ['firebase', 'ui.router'

]).constant('FIREBASE_URI','luminous-torch-9705.firebaseio.com')

.config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise("/partials/categories")
       $stateProvider
        .state('1', {
            url: "/partials/categories",
            templateUrl: "partials/categories.html"
        
           
        })
       //  .state(' {{category.name}}', {
         //   url: "/partials/add",
           // templateUrl: "partials/add.html"
        //})
     })




.controller('MainCtrl', function ($scope,ItemFactory) {
    
     $scope.categories = ItemFactory.getCategories();
           $scope.categories = [
          {"id": 0, "name": "Development"},
          {"id": 1, "name": "Design"},
          {"id": 2, "name": "Exercise"},
          {"id": 3, "name": "Humor"}
      ];
     $scope.bookmarks = ItemFactory.getBookmarks();

        $scope.isCreating = false;
        $scope.isEditing = false;
        $scope.currentCategory = null;
        $scope.editedBookmark = null;

        function isCurrentCategory(category) {
            return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
        }

        function setCurrentCategory(category) {
            $scope.currentCategory = category;

            cancelCreating();
            cancelEditing();
        }

        $scope.isCurrentCategory = isCurrentCategory;
        $scope.setCurrentCategory = setCurrentCategory;

        function setEditedBookmark(bookmark) {
            $scope.editedBookmark = angular.copy(bookmark);
        }

        function isSelectedBookmark(bookmarkId) {
            return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
        }

        $scope.setEditedBookmark = setEditedBookmark;
        $scope.isSelectedBookmark = isSelectedBookmark;

        function resetCreateForm() {
            $scope.newBookmark = {
                title: '',
                url: '',
                category: $scope.currentCategory
            };
        }

        //-------------------------------------------------------------------------------------------------
        // CRUD TUTUTUTUTUTUTUTUTUTUTUTUTUTUTUTUTUTUTUTUTUTUTU
        //-------------------------------------------------------------------------------------------------
        function createBookmark(bookmark) {
		    bookmark.id = $scope.bookmarks.length;
			ItemFactory.addBookmark(bookmark);
            resetCreateForm();
        }
        function updateBookmark(bookmark) {
			$scope.bookmarks[bookmark.id] = bookmark;
			ItemFactory.updateBookmark(bookmark);
            $scope.editedBookmark = null;
            $scope.isEditing = false;
        }
        function removeBookmark(bookmark){
			ItemFactory.removeBookmark(bookmark);
         }
        
        $scope.removeBookmark = removeBookmark; 
        $scope.createBookmark = createBookmark;
        $scope.updateBookmark = updateBookmark;



        //-------------------------------------------------------------------------------------------------
        // CREATING AND EDITING STATES
        //-------------------------------------------------------------------------------------------------
        function shouldShowCreating() {
            return $scope.currentCategory && !$scope.isEditing;
        }

        function startCreating() {
            $scope.isCreating = true;
            $scope.isEditing = false;
            resetCreateForm();
        }

        function cancelCreating() {
            $scope.isCreating = false;
        }

        $scope.shouldShowCreating = shouldShowCreating;
        $scope.startCreating = startCreating;
        $scope.cancelCreating = cancelCreating;

        function shouldShowEditing() {
            return $scope.isEditing && !$scope.isCreating;
        }

        function startEditing() {
            $scope.isCreating = false;
            $scope.isEditing = true;
        }

        function cancelEditing() {
            $scope.isEditing = false;
            $scope.editedBookmark = null;
        }

        



       
       
        $scope.startEditing = startEditing;
        $scope.cancelEditing = cancelEditing;
        $scope.shouldShowEditing = shouldShowEditing;
    })
.factory('ItemFactory',function($firebase,FIREBASE_URI){
    var ref = new Firebase(FIREBASE_URI);
    ref = ref.child('items');
	var refCategories = ref.child('categories');
	var refBookmarks = ref.child('bookmarks');
    
    var syncCategories = $firebase(refCategories);
    var categories = syncCategories.$asArray();
	
	var syncBookmakrs = $firebase(refBookmarks);
    var bookmarks = syncBookmakrs.$asArray();
    
    var getCategories = function () {
        return categories;
    }
	
	var getBookmarks = function () {
        return bookmarks;
    }
    
    var addBookmark = function(bookmark){
        bookmarks.$add(bookmark);
    }
    
    var removeBookmark = function(bookmark){
        bookmarks.$remove(bookmark);
    }
    
    var updateBookmark = function(bookmark){
        var b = bookmarks.$getRecord(bookmark.$id);
        b = bookmark;
        bookmarks.$save(b);
    }
    
    return{
        getCategories: getCategories,
		getBookmarks: getBookmarks,
        addBookmark: addBookmark,
        removeBookmark: removeBookmark,
        updateBookmark: updateBookmark
    }
    
});