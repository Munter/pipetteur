// Type definitions for pipetteur 2.0.3
// Project: pipetteur
// Definitions by: Azliya <zhangmin093@gmail.com>

export = pipetteur;

declare function pipetteur(str: string): pipetteur.PipetteurReturnType[];
declare namespace pipetteur {
    export type PipetteurReturnType = {
        index: number;
        line: number;
        column: number;
        match: string;
        color: OneColorType;
    };

    export type OneColorType = {
        _red: number;
        _green: number;
        _blue: number;
        _alpha: number;
    };
}
