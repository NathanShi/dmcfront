'use strict';

angular.module('dmc.company.onboarding', [
    'dmc.configs.ngmaterial',
    'ngMdIcons',
    'ui.router',
    'dmc.widgets.companyonboardingTabs',
    'dmc.ajax',
    'dmc.data',
    'dmc.socket',
    'dmc.model.question-toast-model',
    'dmc.common.header',
    'dmc.common.footer',
    'dmc.location',
    'dmc.model.toast-model',
    'dmc.model.profile',
    'dmc.model.user',
    'ngMaterial',
    'ngMessages',
    'ngCookies',
    'ui.mask'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('co-onboarding',{
                url: '',
                abstract: true,
                template: '<ui-view></ui-view>',
                controller: 'co-onboardingController',
                resolve: {
                    userData: ['DMCUserModel',
                        function(DMCUserModel) {
                            return DMCUserModel.getUserData();
                        }]
                }
            })
            .state('co-onboarding.companyinfo', {
                url: '/companyinfo',
                templateUrl: 'templates/company-onboarding/companyinfo.html',
                controller: 'co-companyinfoController'
            })
            .state('co-onboarding.createuser', {
                url: '/createuser',
                templateUrl: 'templates/company-onboarding/createuser.html',
                controller: 'co-homeController'
            })
            .state('co-onboarding.pay', {
                url: '/pay',
                templateUrl: 'templates/company-onboarding/pay.html',
                controller: 'co-payController'
            })
            .state('co-onboarding.landing', {
                url: '/landing',
                templateUrl: 'templates/company-onboarding/landing.html',
                controller: 'co-landingController'
            });
        $urlRouterProvider.otherwise('/createuser');
    })
    .service('companyOnboardingModel', ['$cacheFactory',
         function ($cacheFactory) {

            //Stream data retrieved from database
            this.transResponse = function(data){
              var company = {};
              company.name = data.name;
              company.id = data.id;
              company.naicsCode = data.naicsCode;
              company.firstAddress = {};
              company.firstAddress.line1 = data.address.streetAddress1;
              company.firstAddress.line2 = data.address.streetAddress2;
              company.firstAddress.city = data.address.city;
              company.firstAddress.state = data.address.state;
              company.firstAddress.zipcode = data.address.zip;

              var jsonType = angular.fromJson(data.dmdiiMembershipInfo);
              // console.log(jsonType);
              company.main = jsonType.mainPointContact;
              company.finance = jsonType.financePointContact;
              company.tech = jsonType.techPointContact;
              company.legal = jsonType.legalPointContact;
              if (company.tech != null)
                company.techContact = true;
              if (company.finance != null)
                company.financialContact = true;
              if (company.legal != null)
                company.legalContact = true;
              company.secondAddress = jsonType.secondAddress;
              if (company.secondAddress != null)
                company.subCompany = true;
              company.selectedAnnualRevenue = jsonType.annualRevenue;
              company.selectedEmployeeSize = jsonType.employeeSize;
              company.type = null;
              company.orgTYPEs = jsonType.orgTYPEs;
              company.website = jsonType.website;
              company.startUp = jsonType.startUp;
              company.duns = jsonType.dunsCode;
              company.docuSigned = jsonType.docuSigned;
              company.templateID = jsonType.templateID;
              company.formURL = jsonType.formURL;

              return company;
            }

            this.getStates = function(){
                var statesUSA = [ "AK","AL","AR","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN",
                                  "KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH",
                                  "NJ","NM","NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA",
                                  "VT","WA","WI","WV","WY"
                                ];
                return statesUSA;
            }

            //Initialize orgType
            this.initialOrgType = function(){
                var orgType = [
                  { selection : 'Parent Consortium', selected : false },
                  { selection : 'Subsidiary', selected : false },
                  { selection : 'Minority Owned Business', selected : false },
                  { selection : 'Non Profit', selected : false },
                  { selection : 'US Owned', selected : false },
                  { selection : 'Under an SSA', selected : false },
                  { selection : 'Academic Institution', selected : false },
                  { selection : 'Foreign Firm', selected : false },
                  { selection : 'Division', selected : false },
                  { selection : 'Woman Owned Business', selected : false }
                ];

                return orgType;
            }

            //Initialize EmployeeSize
            this.initialEmployeeSize = function(){
                var employeeSize = ["1-10 employees", "11-50 employees", "51-200 employees", "501-1000 employees",
                                    "1001-5000 employees", "5001-10,000 employees", "10,000+ employees"];
                return employeeSize;
            }

            //Initialize AnnualRevenue
            this.initialAnnualRevenue = function(){
                var AnnualRevenue = ["0-25M", "26M-50M", "51M-100M", "101M-250M", "251M-500M", "501M-1B", "2B-10B", "11B+"];
                return AnnualRevenue;
            }

            //Initialize OrgTYPEs
            this.initialOrgTYPEs = function(){
                var OrgTYPEs = ["Manufacturer", "Technology Provider", "Consultant"];
                return OrgTYPEs;
            }

            //Initialize IndustryType
            this.initialIndustryType = function(){
                var industryType = [
                  { inType : '3D Printing', select : false },
                  { inType : 'Aerospace', select : false },
                  { inType : 'Agricultural', select : false },
                  { inType : 'Automation', select : false },
                  { inType : 'Die Casting', select : false },
                  { inType : 'Electrical', select : false },
                  { inType : 'Electronics', select : false },
                  { inType : 'Furniture', select : false },
                  { inType : 'Grinding Machines', select : false },
                  { inType : 'Machine', select : false },
                  { inType : 'Materials', select : false },
                  { inType : 'Marine engines', select : false },
                  { inType : 'Measurement', select : false },
                  { inType : 'Metal', select : false },
                  { inType : 'Medical', select : false },
                  { inType : 'Nuclear Power', select : false },
                  { inType : 'Science', select : false },
                ];

                return industryType;
            }

            //Stream data for '/esignDoc' to populate Membership Agreement fields
            this.populateField = function(data){
                var populateCompany = {};

                populateCompany.companyName = data.name;
                populateCompany.dunsNo = data.duns;
                populateCompany.companyAddress1 = data.firstAddress.line1 + (data.firstAddress.line2 ? ("," + data.firstAddress.line2) : "");
                populateCompany.companyCSZ = data.firstAddress.city + "," + data.firstAddress.state + "," + data.firstAddress.zipcode;

                populateCompany.mainName = data.main.fname + " " + data.main.lname;
                if (data.main.mailAddress.includes(",")){
                    populateCompany.mainAddress = data.main.mailAddress.substring(0, data.main.mailAddress.indexOf(","));
                    populateCompany.mainCSZ = data.main.mailAddress.substring(data.main.mailAddress.indexOf(",")+1);
                }else{
                    populateCompany.mainAddress = data.main.mailAddress;
                    populateCompany.mainCSZ = data.main.mailAddress;
                }
                populateCompany.mainPhone = data.main.phone;
                populateCompany.mainEmail = data.main.email;

                var popType = {};

                data.type.forEach(function(element) {
                    var temp = element.replace(/\s/g, '');
                    popType[temp] = "ON";
                });

                for(var key in popType) {
                   if (popType.hasOwnProperty(key)) {
                      populateCompany[key] = popType[key];
                   }
                }

                if (data.tech != null){
                    populateCompany.techName = data.tech.fname + " " + data.tech.lname;
                    if (data.tech.mailAddress.includes(",")){
                        populateCompany.techAddress = data.tech.mailAddress.substring(0, data.tech.mailAddress.indexOf(","));
                        populateCompany.techCSZ = data.tech.mailAddress.substring(data.tech.mailAddress.indexOf(",")+1);
                    }else{
                        populateCompany.techAddress = data.tech.mailAddress;
                        populateCompany.techCSZ = data.tech.mailAddress;
                    }
                    populateCompany.techPhone = data.tech.phone;
                    populateCompany.techEmail = data.tech.email;
                }

                if (data.legal != null){
                    populateCompany.legalName = data.legal.fname + " " + data.legal.lname;
                    if (data.legal.mail.includes(",")){
                        populateCompany.legalAddress = data.legal.mail.substring(0, data.legal.mail.indexOf(","));
                        populateCompany.legalCSZ = data.legal.mail.substring(data.legal.mail.indexOf(",")+1);
                    }else{
                        populateCompany.legalAddress = data.legal.mail;
                        populateCompany.legalCSZ = data.legal.mail;
                    }
                    populateCompany.legalPhone = data.legal.phone;
                    populateCompany.legalEmail = data.legal.email;
                }

                if (data.finance != null){
                    populateCompany.financeName = data.finance.fname + " " + data.finance.lname;
                    if (data.finance.mailAddress.includes(",")){
                        populateCompany.financeAddress = data.finance.mailAddress.substring(0, data.finance.mailAddress.indexOf(","));
                        populateCompany.financeCSZ = data.finance.mailAddress.substring(data.finance.mailAddress.indexOf(",")+1);
                    }else{
                        populateCompany.financeAddress = data.finance.mailAddress;
                        populateCompany.financeCSZ = data.finance.mailAddress;
                    }
                    populateCompany.financePhone = data.finance.phone;
                    populateCompany.financeEmail = data.finance.email;
                }

                return populateCompany;
            }

            //Stream data for '/payment'
            this.matchOrgType = function(data, tokenID){

                var dmdiiMembershipInfoObj = {
                  mainPointContact: data.main,
                  financePointContact: data.finance,
                  legalPointContact: data.legal,
                  techPointContact: data.tech,
                  secondAddress: data.secondAddress,
                  annualRevenue: data.selectedAnnualRevenue,
                  employeeSize: data.selectedEmployeeSize,
                  startUp: data.startUp,
                  dunsCode: data.duns,
                  applicantType: data.type,
                  orgTYPEs: data.orgTYPEs,
                  docuSigned: data.docuSigned,
                  templateID: data.templateID,
                  formURL: data.formURL
                };

                var MembershipInfoString = JSON.stringify(dmdiiMembershipInfoObj);

                var orgPayEsign = {
                  stripeToken: tokenID,
                  organizationModel:{
                    name:data.name,
                    id: data.id ? data.id : null,
                    location:null,
                    description:null,
                    division:null,
                    industry:null,
                    naicsCode:data.naicsCode,
                    email:null,
                    phone:null,
                    website:data.website,
                    socialMediaLinkedin:null,
                    socialMediaTwitter:null,
                    socialMediaInthenews:null,
                    perferedCommMethod:null,
                    productionCapabilities:null,
                    address:{
                      streetAddress1:data.firstAddress.line1,
                      streetAddress2:(data.firstAddress.line2?data.firstAddress.line2:null),
                      city:data.firstAddress.city,
                      state:data.firstAddress.state,
                      country:"US",
                      zip:data.firstAddress.zipcode,
                    },
                    reasonJoining:null,
                    featureImage:null,
                    dmdiiMembershipInfo:MembershipInfoString,
                    awards:null,
                    contacts:null,
                    areasOfExpertise:null,
                    desiredAreasOfExpertise:null,
                    postCollaboration:null,
                    upcomingProjectInterests:null,
                    pastProjects:null
                  }
                };
                return orgPayEsign;
            }
    }])
    .factory('storageService', ['$rootScope', function($rootScope) {
        return {
            //localStorage set, get, remove
            get: function(key) {
                return localStorage.getItem(key);
            },
            set: function(key, data) {
                localStorage.setItem(key, data);
            },
            remove: function(key){
                localStorage.removeItem(key);
            }
        };
    }])
    .controller('TermsConditionsController',
    	['$scope', '$mdDialog','$window', "toastModel", 'ajax', 'dataFactory',
    	function ($scope, $mdDialog, $window, toastModel, ajax, dataFactory) {
      	$scope.enter = function(){
          ajax.create(dataFactory.getUserAcceptTermsAndConditionsUrl(), {},
            function() {
              $mdDialog.hide();
            },
            function() {
              toastModel.showToast("error", "Error updating information.");
            }
          )
        };
    }]);
