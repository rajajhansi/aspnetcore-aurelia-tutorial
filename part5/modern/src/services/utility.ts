export function areEqual(obj1: any, obj2: any) {
	"use strict";
	return Object.keys(obj1).every((key: any) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
};