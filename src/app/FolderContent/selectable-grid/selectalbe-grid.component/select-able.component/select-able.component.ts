import { Component, Input, AfterViewInit, EventEmitter, Output } from "@angular/core";
import { folderContentType } from "../../../Model/folderContentType";
import { EnterFolderArgs } from "./enterFolderArgs";
import { ISelecableProperties } from "../../../Model/ISelecableProperties";
import { SelecableProperties } from "../../../Model/selecableProperties";
import { IContexMenuCoordinates } from "../../../../Common/multi-level-contex-menu/contex-menu.component/icontex-menu-coordinates";



@Component({
    templateUrl: "./select-able.component.html",
    selector: "select-able",
    styleUrls: ["./select-able.component.css"]
})

export class SelectableComponent implements AfterViewInit {
    private _text: string;
    textToShow: string;
    @Input() type: folderContentType;
    @Input() path: string;
    @Input() modificationTime: string;
    @Input() creationTime: string;
    @Input() size: string;
    @Output() RegisterInParent: EventEmitter<SelectableComponent> = new EventEmitter<SelectableComponent>();
    @Output() UnSelectAll: EventEmitter<void> = new EventEmitter<void>();
    @Output() ApplyIgnoreDisableSelection: EventEmitter<void> = new EventEmitter<void>();
    @Output() ApplyParentIgnoreOnRightClick: EventEmitter<void> = new EventEmitter<void>();
    @Output() ShowContexMenu: EventEmitter<IContexMenuCoordinates> = new EventEmitter<IContexMenuCoordinates>();
    @Output() EnterFolderByDbClick: EventEmitter<EnterFolderArgs> = new EventEmitter<EnterFolderArgs>();
    @Output() SelectionChanged: EventEmitter<ISelecableProperties> = new EventEmitter<ISelecableProperties>();
    color: string = "LightGrey";
    notSelected: boolean = true;

    getImgSrc(): string {
        return this.type === folderContentType.file ? "http://www.haipic.com/icon/38089/38089.png" :
            "https://dumielauxepices.net/sites/default/files/folder-icons-transparent-613037-9176493.png"
    }

    

    @Input()
    set text(value: string) {
        this._text = value;
        this.textToShow = value;
        if(value.length > 10){
            this.textToShow = value.substring(0, 10) + "...";
        }
    }

    get text(): string {
        return this._text;
    }

    onClick(): void {
        if (this.notSelected) {
            this.select();
        }
        else {
            this.unSelect();
        }
    }

    onDbClick() {
        if (this.type === folderContentType.file) return;
        let args = new EnterFolderArgs();
        args.Name = this.text;
        args.Path = this.path;
        this.EnterFolderByDbClick.emit(args);
    }

    private select(applyIgnoreDisableSelection: boolean = true) {
        this.UnSelectAll.emit();
        this.color = "#80d4ff";
        this.notSelected = false;
        this.SelectionChanged.emit(new SelecableProperties(
            this._text, 
            this.creationTime,
            this.modificationTime,
            this.path,
            this.size))
        if (!applyIgnoreDisableSelection) return;
        this.ApplyIgnoreDisableSelection.emit();
    }

    isSeletcted(): boolean {
        return !this.notSelected;
    }

    unSelect(): void {
        this.color = "LightGrey";
        this.notSelected = true;

        if(this.text.length > 10){
            this.textToShow = this.text.substring(0, 10) + "...";
        }
    }

    ngAfterViewInit(): void {
        this.RegisterInParent.emit(this);
    }

    onrightClick(event: IContexMenuCoordinates): void {
        this.select(false);
        this.ApplyParentIgnoreOnRightClick.emit();
        this.ShowContexMenu.emit(event);
    }
}