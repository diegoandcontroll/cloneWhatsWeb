import { ClassEvent } from "../util/ClassEvent";

export class Model extends ClassEvent{
  constructor(){
    super();
    this._data = {};
  }

  fromJson(json){
    this._data = Object.assign(this._data, json);

    this.triggers('datachange', this.toJson());
  }

  toJson(json){
    return this._data;
  }
}