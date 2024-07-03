export const regex = new RegExp('^[+-]?\\d+(\\.\\d+)?$');

export function isIntegerOrFractionalNumber(str: string): boolean {
    return regex.test(str);
  }