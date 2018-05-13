export const INSTRUCTIONS =
    ":) Aby znaleźć przejazd wpisz 'przejazd (z) _Miasto-startowe_ " +
    "(do) _Miasto-końcowe_, bez odmieniania przez przypadki. \n" +
    "Na przykład: przejazd Warszawa Katowice\n" +
    ":) Szukasz adresu naszej strony? Wpisz _link_\n";

export const UNKNOWN_COMMAND = (cmd: string): string => {
    if (cmd.length < 20) {
        return `Wybacz, ale dopiero się uczę i nie rozumiem co znaczy "${cmd}" :(` +
            "Wpisz \"pomoc\", aby zobaczyć na co znam odpowiedź!";
    } else {
        return "Wybacz, ale dopiero się uczę i nie rozumiem.:(." +
            "Wpisz \"pomoc\", aby zobaczyć na co znam odpowiedź!"
    }
}