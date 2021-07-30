import "./styles.css";

import React, { useState } from "react";
const dayGap = (date1, date2) => {
  date1 = new Date(date1);
  date2 = new Date(date2);
  const timediff = Math.abs(date1 - date2);
  const daydiff = timediff / (1000 * 24 * 60 * 60);
  return daydiff;
};
const nextDate = (birthdate, format) => {
  let date = new Date(birthdate);
  let nextdate = new Date(date);
  nextdate.setDate(new Date(nextdate).getDate() + 1);
  let datestring = nextdate.toISOString().slice(0, 10);
  return datestring;
};
const prevDate = (birthdate, format) => {
  let date = new Date(birthdate);
  let prevdate = new Date(date);
  prevdate.setDate(new Date(prevdate).getDate() - 1);
  let datestring = prevdate.toISOString().slice(0, 10);
  return datestring;
};
const palindromecheck = (birthdate) => {
  let start = 0;
  let end = birthdate.length - 1;
  while (start < end) {
    if (birthdate[start++] !== birthdate[end--]) {
      return false;
    }
  }
  return true;
};
const nextPalindromeDate = (birthdate) => {
  let currentdate = birthdate;
  while (true) {
    currentdate = nextDate(currentdate);
    const [year, month, date] = currentdate.split("-");
    const ddmmyyyy = date + month + year;
    const mmddyyyy = month + date + year;
    const mmddyy = month + date + year.slice(-2);
    const ddmmyy = date + month + year.slice(-2);
    if (
      palindromecheck(ddmmyyyy) ||
      palindromecheck(mmddyyyy) ||
      palindromecheck(mmddyy) ||
      palindromecheck(ddmmyy)
    ) {
      return currentdate;
    }
  }
};
const prevPalindromeDate = (birthdate) => {
  let currentdate = birthdate;
  while (true) {
    currentdate = prevDate(currentdate);
    const [year, month, date] = currentdate.split("-");
    const ddmmyyyy = date + month + year;
    const mmddyyyy = month + date + year;
    const mmddyy = month + date + year.slice(-2);
    const ddmmyy = date + month + year.slice(-2);
    if (
      palindromecheck(ddmmyyyy) ||
      palindromecheck(mmddyyyy) ||
      palindromecheck(mmddyy) ||
      palindromecheck(ddmmyy)
    ) {
      return currentdate;
    }
  }
};
function App() {
  const nearestPalindromeDate = (birthdate) => {
    const nextpalindrome = nextPalindromeDate(birthdate);
    const prevpalindrome = prevPalindromeDate(birthdate);

    return dayGap(birthdate, nextpalindrome) < dayGap(birthdate, prevpalindrome)
      ? [nextpalindrome, dayGap(birthdate, nextpalindrome)]
      : [prevpalindrome, dayGap(birthdate, prevpalindrome)];
  };
  const checkPalindrome = () => {
    console.log(birthdate, typeof birthdate);

    const [year, month, date] = birthdate.split("-");
    const ddmmyyyy = date + month + year;
    const mmddyyyy = month + date + year;
    const mmddyy = month + date + year.slice(-2);
    const ddmmyy = date + month + year.slice(-2);
    if (palindromecheck(ddmmyyyy)) {
      setResult(
        "Woohoo!! your birthday in the format ddmmyyyy is a palindrome!"
      );
    } else if (palindromecheck(mmddyyyy)) {
      setResult(
        "Woohoo!! your birthday in the format mmddyyyy is a palindrome!"
      );
    } else if (palindromecheck(mmddyy)) {
      setResult("Woohoo!! your birthday in the format mmddyy is a palindrome!");
    } else if (palindromecheck(ddmmyy)) {
      setResult("Woohoo!! your birthday in the format ddmmyy is a palindrome!");
    } else {
      const [nearestdate, diff] = nearestPalindromeDate(birthdate);
      let nearestdateobj = new Date(nearestdate);
      setResult(
        `Nearest palindromic date is ${nearestdateobj.toLocaleDateString()}, you missed by ${diff} day${
          diff > 1 ? "s" : ""
        } :(`
      );
    }
  };
  const [darkTheme, setDarkTheme] = useState(false);
  const [result, setResult] = useState("");
  const [calculating, setCalculating] = useState(false);
  const [birthdate, setBirthdate] = useState("");
  return (
    <div className="App">
      <div className={darkTheme ? "toppage darktheme" : "toppage"}>
        <div className="box">
          <div className={darkTheme ? "nav darktheme" : "nav"}>
            <div className="start">
              <div
                className={
                  darkTheme ? "button button1 darktheme" : "button button1"
                }
              ></div>
              <div
                className={
                  darkTheme ? "button button2 darktheme" : "button button2"
                }
              ></div>
              <div
                className={
                  darkTheme ? "button button3 darktheme" : "button button3"
                }
              ></div>
            </div>
            <div className="end">
              <div className="text">
                Switch to {darkTheme ? "Light" : "Dark"} mode!
              </div>
              <div
                className={
                  darkTheme ? "themechanger darktheme" : "themechanger"
                }
              >
                <div
                  className="slider"
                  onClick={() => setDarkTheme(!darkTheme)}
                >
                  <div
                    className={
                      darkTheme ? "sliderinner darktheme" : "sliderinner"
                    }
                  ></div>
                  <div
                    className="block"
                    style={{
                      transform: darkTheme ? `translateX(${30}px)` : "none"
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className={darkTheme ? "content darktheme" : "content"}>
            <h1>Check if your birthdate is a palindrome!</h1>
            <a href="#bottompage">
              <button className={darkTheme ? "checkbtn darktheme" : "checkbtn"}>
                Click me
              </button>
            </a>
          </div>
        </div>
      </div>

      <div
        id="bottompage"
        className={darkTheme ? "bottompage darktheme" : "bottompage"}
      >
        <div className="box">
          <div className={darkTheme ? "nav darktheme" : "nav"}>
            <div className="themechanger"></div>
          </div>
          <div className={darkTheme ? "content darktheme" : "content"}>
            <h1>Enter your birthdate</h1>
            <h3 className="formatdetails">
              This app checks your birthdate in 4 formats: DD-MM-YYYY,
              MM-DD,YYYY, MM-DD-YY, DD-MM-YY
            </h3>
            <input
              type="date"
              className="birthdateinput"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
            <button
              className={darkTheme ? "checkbtn darktheme" : "checkbtn"}
              onClick={() => {
                if (!birthdate) {
                  alert("Input birthdate");
                  return;
                }
                setResult("");
                setCalculating(true);
                setTimeout(() => {
                  checkPalindrome();
                  setCalculating(false);
                }, 5000);
              }}
            >
              Check
            </button>
            {calculating && (
              <div className="calculating">
                <img
                  src="https://media1.tenor.com/images/2919502a3586a01146dbda514074014c/tenor.gif"
                  alt=""
                />
              </div>
            )}
            {result && <h3>{result}</h3>}
          </div>
          <div className={darkTheme ? "footer darktheme" : "footer"}>
            <div className="link">
              <a
                href="https://www.github.com/aryanchopra"
                className="footerlink"
              >
                {" "}
                Github
              </a>
            </div>
            <div className="link">
              <a href="https://aryanchopra.netlify.app" className="footerlink">
                Portfolio
              </a>
            </div>
            <div className="link">
              <a
                href="https://www.twitter.com/_aryanchopra_"
                className="footerlink"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
