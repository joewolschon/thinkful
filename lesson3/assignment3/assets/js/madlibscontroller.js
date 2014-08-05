angular.module('app', []).controller('MadLibsCtrl', function ($scope)
{
    $scope.gender = "male";
    $scope.words = {
        "male": createWordMap("he", "him", "his"),
        "female": createWordMap("she", "her", "her")
    };

    function createWordMap(pronoun, noun, possessive)
    {
        return {
            pronoun: pronoun,
            noun: noun,
            possessive: possessive
        }
    }
});