import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(4);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "0123456789";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, setPassword]);

  const copyToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,passwordGenerator])

  const passwordRef = useRef(null)

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700  text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            className="outline-none w-full py-1 px-3"
            type="text"
            value={password}
            readOnly
            placeholder="password"
            ref={passwordRef}
          />
          <button 
          onClick={copyToClipBoard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex flex-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            className="cursor-pointer" 
            type="range" 
            min={4}
            max={50}
            value={length}
            onChange={(e) => setLength(e.target.value)}/>
            <label>Length ({length})</label>
            </div>
            <div className="flex items-center gap-x-1">
            </div>
            
        </div>
      </div>
    </>
  );
}

export default App;
