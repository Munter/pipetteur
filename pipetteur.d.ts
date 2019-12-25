// Type definitions for pipetteur 2.0.3
// Project: pipetteur
// Definitions by: Azliya <zhangmin093@gmail.com>

export = pipetteur;

declare function pipetteur(str: string): Pipetteur.PipetteurType[];
declare namespace Pipetteur {
    export type PipetteurType = {
        index: number;
        line: number;
        column: number;
        match: string;
        color: OneColor;
    };

    export type OneColor = {
        _red: number;
        _green: number;
        _blue: number;
        _alpha: number; 
    };
}
