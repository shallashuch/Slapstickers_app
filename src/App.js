import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Readme from "./pages/Readme";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/readme" exact component={Readme} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

//Tried to implement share features on social media. I found ShareSocial as
// a UI component but the generated URL is not sharable and I think I should have saved
// the photo in the backend. When I clicked on a social button, the sharing didn't work

// const styleSocial = {
//   root: {
//     background: "white",
//     borderRadius: 3,
//     border: 0,
//     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//     color: "white",
//   },
//   copyContainer: {
//     border: "1px solid blue",
//     background: "rgb(0,0,0,0.7)",
//     display: "none",
//   },
//   title: {
//     color: "aquamarine",
//     fontStyle: "italic",
//   },
// };

//I was trying to integrate the app with Zoom, but it would have taken me
// much more time. I was looking at the documentation on Zoom Developer
//to see how to do it.

// loads WebAssembly assets
// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();

// function startMeeting(
//   signature,
//   meetingNumber,
//   userName,
//   passWord,
//   leaveUrl
// ) {
//   ZoomMtg.init({
//     leaveUrl: leaveUrl,
//     isSupportAV: true,
//     success: (success) => {
//       console.log(success);

//       ZoomMtg.join({
//         signature: signature,
//         meetingNumber: meetingNumber,
//         userName: userName,
//         apiKey: "mjnQIH53RbGZQFV3I06EQg",
//         userEmail: "elettra96@gmail.com",
//         passWord: passWord,
//         success: (success) => {
//           console.log(success);
//         },
//         error: (error) => {
//           console.log(error);
//         },
//       });
//     },
//     error: (error) => {
//       console.log(error);
//     },
//   });
// }
