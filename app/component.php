<!doctype html>
<html class="no-js" lang="">
<head>
  <meta charset="utf-8">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Service</title>
<!--  <base href="/">-->

</head>
<body ng-app="dmc.product">

<!--[if lt IE 10]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->

<!-- Top Header -->
<div dmc-top-header active-page="'marketplace&market'"></div>
<div ui-view></div>
<dmc-footer></dmc-footer>

<?php include 'build-vendor.php' ?>

<!-- build:js scripts/product/index.js -->
<script src="scripts/socket/socket.io.js"></script>
<script src="scripts/configs/ngMaterial-config.js"></script>
<script src="scripts/common/header/header.js"></script>
<script src="scripts/common/factory/notifications.factory.js"></script>
<script src="scripts/common/footer/footer.js"></script>
<script src="scripts/components/ui-widgets/stars.directive.js"></script>
<script src="scripts/components/ui-widgets/documents.directive.js"></script>
<script src="scripts/components/ui-widgets/rich-text.directive.js"></script>
<script src="scripts/components/ui-widgets/review.directive.js"></script>
<script src="scripts/components/ui-widgets/tabs.directive.js"></script>
<script src="scripts/components/dropzone/dropzone.directive.js"></script>
<script src="scripts/common/factory/socket.factory.js"></script>
<script src="scripts/common/factory/ajax.factory.js"></script>
<script src="scripts/common/factory/data.factory.js"></script>
<script src="scripts/components/carousel/carousel.js"></script>
<script src="scripts/components/compare/compare.js"></script>
<script src="scripts/components/product-card-buttons/product-card-buttons.js"></script>
<script src="scripts/components/tree-menu/tree-menu.js"></script>
<script src="scripts/components/product-card/product-card.js"></script>
<script src="scripts/components/products-card/products-card.js"></script>
<script src="scripts/components/members-card/members-card.js"></script>
<script src="scripts/components/token-modal/token-modal.controller.js"></script>
<script src="scripts/common/models/toast-model.js"></script>
<script src="scripts/common/models/user-model.js"></script>
<script src="scripts/common/models/question-toast-model.js"></script>
<script src="scripts/common/models/services.model.js"></script>
<script src="scripts/common/models/previous-page.js"></script>

<script src="scripts/product/product.js"></script>
<script src="scripts/product/controllers/component.js"></script>
<script src="scripts/product/controllers/edit.js"></script>
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
