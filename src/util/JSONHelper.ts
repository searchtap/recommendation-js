export class JSONHelper {
  static isValidJson(jsonStr) {
    if (typeof jsonStr !== "string") {
      return false;
    }
    try {
      JSON.parse(jsonStr);
      return true;
    }
    catch (error) {
      return false;
    }
  }
}