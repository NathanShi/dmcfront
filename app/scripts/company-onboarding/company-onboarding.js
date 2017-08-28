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
    'ngCookies'
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
              company.selectedAnnualRevenue = null;
              company.selectedEmployeeSize = null;
              company.type = null;
              company.orgTYPEs = null;
              company.website = jsonType.website;
              company.startUp = jsonType.startUp;
              company.duns = jsonType.dunsCode;
              company.docuSigned = jsonType.docuSigned;
              company.templateID = jsonType.templateID;
              company.formURL = jsonType.formURL;
              company.token = jsonType.token;

              return company;
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
                var employeeSize = [
                  {
                    name: 'Self-employed',
                    value: 'Self-employed'
                  },
                  {
                    name: '1-10 employees',
                    value: '1-10 employees'
                  },
                  {
                    name: '11-50 employees',
                    value: '11-50 employees'
                  },
                  {
                    name: '51-200 employees',
                    value: '51-200 employees'
                  },
                  {
                    name: '501-1000 employees',
                    value: '501-1000 employees'
                  },
                  {
                    name: '1001-5000 employees',
                    value: '1001-5000 employees'
                  },
                  {
                    name: '5001-10,000 employees',
                    value: '5001-10,000 employees'
                  },
                  {
                    name: '10,000+ employees',
                    value: '10,000+ employees'
                  }
                ];

                return employeeSize;
            }

            //Initialize AnnualRevenue
            this.initialAnnualRevenue = function(){
                var AnnualRevenue = [
                  {
                    name: '0-25M',
                    value: '0-25M'
                  },
                  {
                    name: '26M-50M',
                    value: '26M-50M'
                  },
                  {
                    name: '51M-100M',
                    value: '51M-100M'
                  },
                  {
                    name: '101M-250M',
                    value: '101M-250M'
                  },
                  {
                    name: '251M-500M',
                    value: '251M-500M'
                  },
                  {
                    name: '501M-1B',
                    value: '501M-1B'
                  },
                  {
                    name: '2B-10B',
                    value: '2B-10B'
                  },
                  {
                    name: '11B+',
                    value: '11B+'
                  }
                ];

                return AnnualRevenue;
            }

            //Initialize OrgTYPEs
            this.initialOrgTYPEs = function(){
                var OrgTYPEs = [
                  {
                    name: 'Manufacturer',
                    value: 'Manufacturer'
                  },
                  {
                    name: 'Technology Provider',
                    value: 'Technology Provider'
                  },
                  {
                    name: 'Consultant',
                    value: 'Consultant'
                  }
                ];

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
                populateCompany.mainAddress = data.main.mailAddress;
                populateCompany.mainCSZ = data.main.mailAddress;
                populateCompany.mainPhone = data.main.phone;
                populateCompany.mainEmail = data.main.email;
                populateCompany.mainFax = "-";

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
                    populateCompany.techAddress = data.tech.mailAddress;
                    populateCompany.techCSZ = data.tech.mailAddress;
                    populateCompany.techPhone = data.tech.phone;
                    populateCompany.techEmail = data.tech.email;
                    populateCompany.techFax = "-";
                }else {
                    populateCompany.techName = "-";
                    populateCompany.techAddress = "-";
                    populateCompany.techCSZ = "-";
                    populateCompany.techPhone = "-";
                    populateCompany.techEmail = "-";
                    populateCompany.techFax = "-";
                }

                if (data.legal != null){
                    populateCompany.legalName = data.legal.fname + " " + data.legal.lname;
                    populateCompany.legalAddress = data.legal.mail;
                    populateCompany.legalCSZ = data.legal.mail;
                    populateCompany.legalPhone = data.legal.phone;
                    populateCompany.legalEmail = data.legal.email;
                    populateCompany.legalFax = "-";
                }else {
                    populateCompany.legalName = "-";
                    populateCompany.legalAddress = "-";
                    populateCompany.legalCSZ = "-";
                    populateCompany.legalPhone = "-";
                    populateCompany.legalEmail = "-";
                    populateCompany.legalFax = "-";
                }

                if (data.finance != null){
                    populateCompany.financeName = data.finance.fname + " " + data.finance.lname;
                    populateCompany.financeAddress = data.finance.mailAddress;
                    populateCompany.financeCSZ = data.finance.mailAddress;
                    populateCompany.financePhone = data.finance.phone;
                    populateCompany.financeEmail = data.finance.email;
                    populateCompany.financeFax = "-";
                }else {
                    populateCompany.financeName = "-";
                    populateCompany.financeAddress = "-";
                    populateCompany.financeCSZ = "-";
                    populateCompany.financePhone = "-";
                    populateCompany.financeEmail = "-";
                    populateCompany.financeFax = "-";
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
                  formURL: data.formURL,
                  Token: data.token,
                  verifiedSignatures: data.verifiedSignatures
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
