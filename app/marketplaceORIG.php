<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Marketplace</title>


  </head>
  <body ng-app="dmc.marketplace">
    <!--[if lt IE 10]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <!-- Top Header -->
    <div dmc-top-header active-page="'marketplace&market'"></div>

    <div ui-view></div>

    <!-- Footer -->
    <dmc-footer></dmc-footer>

    <?php include 'build-vendor.php' ?>

    <!-- build:js scripts/marketplace/index.js -->
    <script src="scripts/configs/ngMaterial-config.js"></script>
    <script src="scripts/common/factory/data.factory.js"></script>
    <script src="scripts/common/factory/ajax.factory.js"></script>
    <script src="scripts/common/factory/socket.factory.js"></script>
    <script src="scripts/common/header/header.js"></script>
    <script src="scripts/common/factory/notifications.factory.js"></script>
    <script src="scripts/common/footer/footer.js"></script>
    <script src="scripts/common/models/user-model.js"></script>
    <script src="scripts/components/tree-menu/tree-menu.js"></script>
    <script src="scripts/components/tree-menu/products-filter.js"></script>
    <script src="scripts/components/product-card/product-card.js"></script>
    <script src="scripts/components/products-card/products-card.js"></script>

    <script src="scripts/components/featuredApp-card/featuredApp-card.js"></script>

    <script src="scripts/components/ui-widgets/documents.directive.js"></script>
    <script src="scripts/components/dropzone/dropzone.directive.js"></script>
    <script src="scripts/components/members-card/members-card.js"></script>
    <script src="scripts/components/ui-widgets/stars.directive.js"></script>
    <script src="scripts/common/models/question-toast-model.js"></script>
    <script src="scripts/common/models/previous-page.js"></script>
    <script src="scripts/components/carousel/carousel.js"></script>
    <script src="scripts/components/compare/compare.js"></script>
    <script src="scripts/common/models/toast-model.js"></script>
    <script src="scripts/components/ui-widgets/tasks.directive.js"></script>
    <script src="scripts/common/models/task-model.js"></script>
    <script src="scripts/components/ui-widgets/tabs.directive.js"></script>
    <script src="scripts/marketplace/marketplace.js"></script>
    <script src="scripts/marketplace/marketplace.controller.js"></script>

    <script src="scripts/components/product-card-buttons/product-card-buttons.js"></script>
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
