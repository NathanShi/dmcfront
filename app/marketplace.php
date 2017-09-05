<!doctype html>
<html class="no-js" lang="">
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Marketplace</title>
    <!--  <base href="/">-->

</head>
<body ng-app="dmc.marketplace" ng-controller="marketplaceController">

<!--[if lt IE 10]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->

<!-- Top Header -->
<div dmc-top-header></div>
<div ui-view></div>
<dmc-footer></dmc-footer>

<?php include 'build-vendor-rh.php' ?>

    <!-- build:js scripts/marketplace/index.js -->
    <script src="scripts/configs/ngMaterial-config.js"></script>
    <script src="scripts/common/header/header.js"></script>
    <script src="scripts/common/factory/notifications.factory.js"></script>
    <script src="scripts/common/footer/footer.js"></script>
    <script src="scripts/common/factory/location.factory.js"></script>
    <script src="scripts/common/factory/socket.factory.js"></script>
    <script src="scripts/common/factory/ajax.factory.js"></script>
    <script src="scripts/common/factory/data.factory.js"></script>
    <script src="scripts/common/models/user-model.js"></script>
    <script src="scripts/common/models/toast-model.js"></script>
    <script src="scripts/marketplace/marketplace.js"></script>
    <script src="scripts/marketplace/marketplace.controller.js"></script>
    <script src="scripts/utilities/scroll.service.js"></script>
    <script src="scripts/components/ui-widgets/content-card.directive.js"></script>
    <script  src="scripts/components/run-default-button/run-default-button.js"></script>
    <script src="bower_components/ng-youtube-embed/build/ng-youtube-embed.min.js"></script>

    <script src="scripts/components/ui-widgets/favbutton.directive.js"></script><!-- endbuild -->
    <script type="text/javascript">
        <?php
            if (isset($_SERVER['AJP_givenName'])) {
                echo('window.givenName = "'.$_SERVER['AJP_givenName'].'";');
            } else {
                echo('window.givenName = "";');}
            ?>

        window.apiUrl = '';
    </script>
  </body>
</html>
