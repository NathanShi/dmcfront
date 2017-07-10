<!doctype html>
<html class="no-js" lang="">
<head>
  <meta charset="utf-8">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Company Onboarding</title>
<!--  <base href="/">-->

</head>
<body ng-app="dmc.company.onboarding">

<!--[if lt IE 10]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->

<!-- Top Header -->
<div dmc-top-header active-page="'company-onboarding'"></div>
<div ui-view></div>
<dmc-footer></dmc-footer>

<?php include 'build-vendor-rh.php' ?>

<!-- build:js scripts/company-onboarding/index.js -->
<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB1B_bspUI3Mpd5W1SVELtp-_OY--UPV-Q"></script> -->
<script src="scripts/company-onboarding/controller/autocomplete.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyB1B_bspUI3Mpd5W1SVELtp-_OY--UPV-Q"></script>
<script src="scripts/socket/socket.io.js"></script>
<script src="scripts/configs/ngMaterial-config.js"></script>
<script src="scripts/common/header/header.js"></script>
<script src="scripts/common/factory/notifications.factory.js"></script>
<script src="scripts/common/footer/footer.js"></script>
<script src="scripts/common/factory/location.factory.js"></script>
<script src="scripts/components/ui-widgets/documents.directive.js"></script>
<script src="scripts/components/ui-widgets/stars.directive.js"></script>
<script src="scripts/components/ui-widgets/review.directive.js"></script>
<script src="scripts/components/ui-widgets/rich-text.directive.js"></script>
<script src="scripts/components/dropzone/dropzone.directive.js"></script>
<script src="scripts/common/factory/socket.factory.js"></script>
<script src="scripts/common/factory/ajax.factory.js"></script>
<script src="scripts/common/factory/data.factory.js"></script>
<script src="scripts/common/models/file-upload.js"></script>
<script src="scripts/common/models/profile-model.js"></script>
<script src="scripts/common/models/user-model.js"></script>
<script src="scripts/common/models/toast-model.js"></script>
<script src="scripts/common/models/phone-model.js"></script>
<script src="scripts/common/models/question-toast-model.js"></script>
<script src="scripts/common/models/previous-page.js"></script>

<script src="scripts/components/ui-widgets/company-onboarding-tabs.directive.js"></script>
<script src="scripts/company-onboarding/company-onboarding.js"></script>
<script src="scripts/company-onboarding/controller/home.js"></script>

<!-- <script data-require="angular.js@1.0.x" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.js" data-semver="1.0.7"></script>
<script src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places"></script>
<script src="http://jvandemo.github.io/angularjs-google-maps/dist/angularjs-google-maps.js"></script> -->
<!-- <script src="scripts/onboarding/onboarding.js"></script>
<script src="scripts/onboarding/controllers/onboarding.js"></script>
<script src="scripts/onboarding/controllers/home.js"></script>
<script src="scripts/onboarding/controllers/profile.js"></script>
<script src="scripts/onboarding/controllers/account.js"></script>
<script src="scripts/onboarding/controllers/company.js"></script>
<script src="scripts/onboarding/controllers/storefront.js"></script>
<script src="scripts/onboarding/controllers/basic-informations.js"></script>
<script src="scripts/onboarding/controllers/terms-conditions.js"></script> -->
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
</body>
</html>
