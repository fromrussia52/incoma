import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class FavoriteService {

    private _favKey = 'favorites';

    constructor() { }

    private _get(key: string) {
        let value = [];
        if (localStorage.getItem(key)) {
            value = JSON.parse(localStorage.getItem(key));
        }
        return value;
    }

    private _set(key, value) {
        const str = JSON.stringify(value);
        localStorage.setItem(key, str);
        return str;
    }

    public get fav() {
        return this._get(this._favKey);
    }

    public set fav(value) {
        this._set(this._favKey, value);
    }
}