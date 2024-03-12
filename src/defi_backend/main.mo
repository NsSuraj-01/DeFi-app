import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor Defi {
  stable var value : Float = 300;
  value := 300;
  Debug.print(debug_show(value));

  stable var currTime = Time.now();
  currTime := Time.now();
  Debug.print(debug_show(currTime));

  public func getTime(): async Int {
    let curr = currTime / (1_000_000_000 * 60);
    return curr;
  }; 

  public func compound() {
    let curr = Time.now();
    var timeElapsed = (curr - currTime) / 1_000_000_000;

    value := value * (1.0005 ** Float.fromInt(timeElapsed));
    currTime := curr;
  };

  public func topUp(amt : Float) {
    value += amt;
    Debug.print(debug_show(value));
  };

  public func withDraw(amt : Float) {
    let diff : Float = (value - amt);
    if(diff < 0) {
      Debug.print("Are you for real..?")
    } else {
      value -= amt ;
      Debug.print(debug_show(value));
    }
  };

  public query func checkBalance() : async Float {
    return value;
  };

};