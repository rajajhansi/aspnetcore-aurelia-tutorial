import {IEnumMapKeyValuePair} from "./enumMapKeyValuePair";
export class EnumConverter {
    public static enumToMap(enumType: Object) : IEnumMapKeyValuePair[] {
        var names = Object.keys(enumType);
        var ids = names.splice(0, names.length/2);
        console.log(ids);
        console.log(names);
        var enumMap = new Array<IEnumMapKeyValuePair>();
        for(var index=0; index < names.length; index++) {
            enumMap.push({key: index, value: names[index]});
        }
        console.log(enumMap);
        return enumMap;
    }
}