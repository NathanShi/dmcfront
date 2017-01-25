<!doctype html>
<html class="no-js" lang="">
<head>
  <meta charset="utf-8">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About DMDII Portal</title>
<!--  <base href="/">-->

</head>
<body ng-app="dmc.about">

<!--[if lt IE 10]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->

<!-- Top Header -->
<div dmc-top-header></div>
<div ui-view></div>
<dmc-footer></dmc-footer>

<link rel="apple-touch-icon" href="apple-touch-icon.png">
<!-- Place favicon.ico in the root directory -->

<!-- build:css styles/vendor.css -->
<!-- bower:css -->

<link rel="stylesheet" href="/bower_components/angular-material/angular-material.css" />
<link rel="stylesheet" href="/bower_components/angular-material-data-table/dist/md-data-table.min.css" />
<link rel="stylesheet" href="/bower_components/dropzone/dist/min/dropzone.min.css" />
<link rel="stylesheet" href="/bower_components/md-data-table/dist/md-data-table-style.css" />
<link rel="stylesheet" href="/bower_components/angular-ui-select/dist/select.min.css" />
<!-- endbower -->
<!-- endbuild -->

<!-- build:css styles/main.css -->
<link rel="stylesheet" href="styles/main.css">
<!-- endbuild -->



<!-- build:js scripts/vendor.js -->
<!-- bower:js -->
<script src="/bower_components/jquery/dist/jquery.js"></script>
<script src="/bower_components/angular/angular.js"></script>
<script src="/bower_components/hammerjs/hammer.js"></script>

<script src="/bower_components/datamaps/dist/datamaps.all.min.js"></script>
<script src="/bower_components/angular-datamaps/dist/angular-datamaps.min.js"></script>
<script src="/bower_components/angular-cookies/angular-cookies.js"></script>
<script src="/bower_components/moment/moment.js"></script>


<script src="/bower_components/angular-ui-select/dist/select.min.js"></script>
<script src="/bower_components/angular-animate/angular-animate.js"></script>
<script src="/bower_components/angular-aria/angular-aria.js"></script>
<script src="/bower_components/angular-material/angular-material.js"></script>
<script src="/bower_components/angular-messages/angular-messages.js"></script>
<script src="/bower_components/ngMask/dist/ngMask.js"></script>
<script src="/bower_components/angular-material-data-table/dist/md-data-table.min.js"></script>
<script src="/bower_components/angular-material-icons/angular-material-icons.min.js"></script>
<script src="/bower_components/angular-recursion/angular-recursion.js"></script>
<script src="/bower_components/angular-touch/angular-touch.js"></script>
<script src="/bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<script src="/bower_components/angularUtils-pagination/dirPagination.js"></script>
<script src="/bower_components/dropzone/dist/min/dropzone.min.js"></script>
<script src="/bower_components/jquery-ui/jquery-ui.js"></script>
<script src="/bower_components/lodash/lodash.js"></script>
<script src="/bower_components/angular-sanitize/angular-sanitize.js"></script>
<!-- <script src="/bower_components/angular-uuid4/angular-uuid4.js"></script> -->
<script src="/bower_components/md-data-table/dist/md-data-table.js"></script>
<script src="/bower_components/md-data-table/dist/md-data-table-templates.js"></script>
<script src="/bower_components/ng-autofocus/dist/ng-autofocus.js"></script>
<script src="/bower_components/angular-route/angular-route.min.js"></script>
<script src="/bower_components/showdown/dist/showdown.min.js"></script>
<script src="/bower_components/ng-showdown/dist/ng-showdown.min.js"></script>

<script src="/bower_components/angulartics/dist/angulartics.min.js"></script>
<script src="/bower_components/angulartics-google-analytics/dist/angulartics-ga.min.js"></script>
<script src="/bower_components/angulartics-google-analytics/dist/angulartics-ga.min.js"></script>
<script src="/scripts/common/analytics/analytics.js"></script><!-- endbower -->
<!-- endbuild -->


<!-- build:js scripts/about/index.js -->
<script src="scripts/configs/ngMaterial-config.js"></script>
<script src="scripts/common/header/header.js"></script>
<script src="scripts/common/factory/notifications.factory.js"></script>
<script src="scripts/common/factory/location.factory.js"></script>
<script src="scripts/common/factory/socket.factory.js"></script>
<script src="scripts/common/factory/ajax.factory.js"></script>
<script src="scripts/common/factory/data.factory.js"></script>
<script src="scripts/common/models/user-model.js"></script>
<script src="scripts/common/models/toast-model.js"></script>

<script src="scripts/about/about.js"></script>
<script src="scripts/about/controllers/about-controller.js"></script>
<!-- endbuild -->

    <script type="text/javascript">
        <?php
        if (isset($_SERVER['AJP_givenName'])) {
            echo('window.givenName = "'.$_SERVER['AJP_givenName'].'";');
        } else {
            echo('window.givenName = "";');
        }
        ?>

        window.apiUrl = '';
    </script>
        <?php include 'footerZ.php' ?>
</body>
</html>
