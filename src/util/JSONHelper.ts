export class JSONHelper {
  static isValidJson(json) {
    try {
      return json.constructor === Object;
    }
    catch (error) {
      return false;
    }
  }
}