import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IPathBreak } from "./ipath-break";
import { PathBreak } from "./path-break";

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavagationBar {

    backButtonDisabled: boolean;
    private _pathBreaks: IPathBreak[];
    private _visiblePathBreaks: IPathBreak[];

    @Input()
    set pathBreaks(value :IPathBreak[]) {
        this._pathBreaks = value;
        this.updateVisiblePathBreaks();
        this.checkIfNeedToDisableBackButton();

    } 
    @Output() PathBreakClick: EventEmitter<string> = new EventEmitter<string>();

    onPathBreakClick(pathBreakIndex: number) {
        if(pathBreakIndex === null || pathBreakIndex === undefined){
            if(this._visiblePathBreaks.length === 1) return;
            pathBreakIndex = this._visiblePathBreaks.length-2;
        }
        let fullPath = this._visiblePathBreaks[pathBreakIndex].path === '' || this._visiblePathBreaks[pathBreakIndex].path === undefined ?
        this._visiblePathBreaks[pathBreakIndex].pathBreak :
        `${this._visiblePathBreaks[pathBreakIndex].path}/${this._visiblePathBreaks[pathBreakIndex].pathBreak}`       
        this.PathBreakClick.emit(fullPath);
    }

    checkIfNeedToDisableBackButton(){
        if(this._pathBreaks === null || 
            this._pathBreaks === undefined ||
            this._pathBreaks.length < 2) {
            this.backButtonDisabled = true;
            return;
        }

        this.backButtonDisabled = false;
    }

    updateVisiblePathBreaks(){
        this._visiblePathBreaks = [];
        if(this._pathBreaks.length > 6){
            let last5 = this._pathBreaks.reverse().slice(0,5).reverse();
            let first = this._pathBreaks.reverse()[0];
            this._visiblePathBreaks.push(first);
            this._visiblePathBreaks.push(new PathBreak("...", "..."));
            last5.forEach(element => this._visiblePathBreaks.push(element));
            return;
        }
        this._visiblePathBreaks = this._pathBreaks;
    }

    cutString(str: string): string{
        if(str.length > 10){
            return str.slice(0, 7) + "...";
        }

        return str;  
    }

}