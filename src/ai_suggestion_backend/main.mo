import Text "mo:base/Text";
import Time "mo:base/Time";
import Array "mo:base/Array";

actor SuggestionBox {
  type Suggestion = {
    content : Text;
    summary : Text;
    timestamp : Time.Time;
  };

  stable var suggestions : [Suggestion] = [];

  public func submitSuggestion(content : Text, summary : Text) : async () {
    let newEntry : Suggestion = {
      content = content;
      summary = summary;
      timestamp = Time.now();
    };
    suggestions := Array.append(suggestions, [newEntry]);
  };

  public query func getAllSuggestions() : async [Suggestion] {
    suggestions;
  };
};
