import moment from 'moment';
export const INSTRUCTIONS =
    "🔹 Aby znaleźć przejazd wpisz *przejazd (z) _Miasto-startowe_ _data_" +
    "(do) _Miasto-końcowe_*, bez odmieniania przez przypadki. \n" +
    `Na przykład: przejazd Warszawa Katowice ${moment().format("DD-MM-YYYY")}\n` +
    "Jeśli pominiesz datę, poszukam najbliżysz przejazdów.\n" +
    "🔹 Szukasz adresu naszej strony? Wpisz *link* \n" +
    "🔹 Jeśli chcesz, żebym Cię powiadomił o nowym przejeździe, " +
    "napisz: *powiadom (obserwuj) _Miasto-startowe_ _Miast-końcowe_ _data_* \n" +
    "Podobnie jak przy szukaniu, data jest opcjonalna :) \n" +
    "Jeśli nie chcesz już otrzymać powiadomienia, dopisz *anuluj* przed powiadomieniem o które prosiłeś. \n" +
    "Na przykład: *anuluj powiadomienie wraszawa katowice*";

export const UNKNOWN_COMMAND = (cmd: string): string => {
    if (cmd.length < 20) {
        return `Wybacz, ale dopiero się uczę i nie rozumiem co znaczy "${cmd}" :( ` +
            "Wpisz \"*pomoc*\", aby zobaczyć na co znam odpowiedź!";
    } else {
        return "Wybacz, ale dopiero się uczę i nie rozumiem :( " +
            "Wpisz \"*pomoc*\", aby zobaczyć na co znam odpowiedź!"
    }
}

export const PARSE_ERROR = "Nie udało mi się rozpoznać szczegółów, wpisz *pomoc* i sprawdź czy napisałeś zgodnie z szablonem.";