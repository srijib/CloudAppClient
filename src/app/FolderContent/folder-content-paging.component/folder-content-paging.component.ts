import { Component, EventEmitter, Output } from "@angular/core";
import { FolderContnentService } from "../services/folder-content-service/folder-content-service";


@Component({
    selector: 'folder-content-paging-nav',
    templateUrl: './folder-content-paging.component.html',
    styleUrls: ['./folder-content-paging.component.css']
})
export class FolderContentPagingNav{

    constructor(private folderContentService: FolderContnentService){
        folderContentService.subscriberToPageChangedToAction(this, this.onNumOfPagesChanged.bind(this));
    }

    numOfPages: number = 1;
    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

    onNumOfPagesChanged(numOfPages: number){
        this.numOfPages = numOfPages;
    }

    onPageChanged(pageNum: number){
        this.pageChange.emit(pageNum);
    }
}