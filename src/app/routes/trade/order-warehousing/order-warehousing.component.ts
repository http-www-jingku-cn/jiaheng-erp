import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as moment from "moment";
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 's-order-warehousing',
    templateUrl: './order-warehousing.component.html',
    styleUrls: ['./order-warehousing.component.less']
})
export class OrderWarehousingComponent implements OnInit {
    editCache = [];
    inputValue;
    userScanner: boolean = true;
    _dataSet = [];
    _loading = false;

    constructor(
        private http: _HttpClient,
        private _message: NzMessageService
    ) { }

    ngOnInit() {
        for (let i = 0; i < 5; i++) {
            this._dataSet.push({ key: i });
        }
        this.updateEditCache();
    }
    addTr(index) {
        this._dataSet.splice(index + 1, 0, {})
    }
    removeTr(index) {
        if (this._dataSet.length > 1) {
            this._dataSet.splice(index, 1);
        } else {
            this._message.warning('至少保留一条分录！');
        }
    }
    startEdit(key: string): void {
        this.editCache[key].edit = true;
    }
    finishEdit(key: string): void {
        this.editCache[key].edit = false;
        this._dataSet.find(item => item.key === key).key = this.editCache[key].key;
    }
    updateEditCache(): void {
        this._dataSet.forEach(item => {
            if (!this.editCache[item.key]) {
                this.editCache[item.key] = {
                    edit: false,
                    key: item.key
                };
            }
        });
    }
}
