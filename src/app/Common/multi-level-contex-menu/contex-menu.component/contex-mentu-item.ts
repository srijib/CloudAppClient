import { IContexMentuItem } from "./icontex-mentu-item";

export class ContexMentuItem implements IContexMentuItem{
    styleClasses: string[];
    onOverIn: () => void;
    onOverOut: () => void;
    name: string;   
    onClick: () => void;
    needToshow: () => boolean;
    showAllways: boolean;
    subs: IContexMentuItem[];
}