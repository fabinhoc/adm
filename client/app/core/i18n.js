(function () {

    angular.module('app.i18n', ['pascalprecht.translate'])
        .config(['$translateProvider', i18nConfig])
        .controller('LangCtrl', ['$scope', '$translate', LangCtrl]);

    // English, Español, 日本語, 中文, Deutsch, français, Italiano, Portugal, Русский язык, 한국어
    // Note: Used on Header, Sidebar, Footer, Dashboard
    // English:            EN-US
    // Spanish:            Español ES-ES
    // Chinese:            简体中文 ZH-CN
    // Chinese:            繁体中文 ZH-TW
    // French:             français FR-FR
    // Portugal:           Portugal PT-BR

    // Not used:
    // Russian:            Русский язык RU-RU
    // German:             Deutsch DE-DE
    // Japanese:           日本語 JA-JP
    // Italian:            Italiano IT-IT
    // Korean:             한국어 KO-KR


    function i18nConfig($translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: 'assets/i18n/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('ptBR');
        $translateProvider.useSanitizeValueStrategy(null);
    }

    function LangCtrl($scope, $translate) {
        $scope.activeLang = 'brazilian';
        $scope.setLang = setLang;

        $scope.langs = [
            'english',
            'spanish',
            'brazilian'
        ]

        function setLang (lang) {
            switch (lang) {
                case 'english':
                    $translate.use('en');
                    break;
                case 'spanish':
                    $translate.use('es');
                    break;
                case 'brazilian':
                    $translate.use('ptBR');
                    break;
            }
            return $scope.activeLang = lang;
        };
    }

})(); 
