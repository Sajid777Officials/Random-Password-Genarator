import React, { useState, useCallback, useEffect, useRef } from 'react';

const App = () => {
  const [length, setLength] = useState(12);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeCharacter, setIncludeCharacter] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNumber) str += "0123456789";
    if (includeCharacter) str += "!@#$%^&*()_-+=[]{}|:;\"'<>,.?/";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, includeNumber, includeCharacter, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 99999);
      document.execCommand('copy');

      console.log('Password copied to clipboard!');

      passwordRef.current.style.boxShadow = "0 0 0 3px #10B981";
      setTimeout(() => {
        if (passwordRef.current) {
          passwordRef.current.style.boxShadow = "none";
        }
      }, 300);
    }
  }, []);

  useEffect(() => {
    generatePassword();
  }, []);


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-lg mx-auto shadow-2xl rounded-xl p-8 bg-gray-800 border border-gray-700">

        <h1 className='text-white text-3xl font-bold text-center mb-6'>
          🔐 Secure Password Generator
        </h1>

        <div className='flex shadow-lg rounded-xl overflow-hidden mb-6'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-3 px-4 text-lg text-gray-900 bg-white placeholder-gray-500 transition duration-150'
            placeholder='Generated Password'
            readOnly
            s ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 shrink-0 transition duration-200 active:scale-95'
          >
            Copy
          </button>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center justify-between text-orange-400 gap-4 mb-6'>

          <div className='flex items-center gap-x-2'>
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className='cursor-pointer h-2 bg-gray-700 rounded-lg appearance-none transition duration-150 ease-in-out'
              style={{ accentColor: '#fb923c' }}
            />
            <label className="text-white text-lg font-medium whitespace-nowrap">
              Length: <span className="text-emerald-400">{length}</span>
            </label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              id="numberInput"
              checked={includeNumber}
              _ onChange={() => setIncludeNumber(prev => !prev)}
              className="w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
              style={{ accentColor: '#34d399' }}
            />
            <label htmlFor="numberInput" className="text-white">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              id="characterInput"
              checked={includeCharacter}
              onChange={() => setIncludeCharacter(prev => !prev)}
              className="w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
              style={{ accentColor: '#34d399' }}
            />
            <label htmlFor="characterInput" className="text-white">Characters</label>
          </div>

        </div>

        <button
          onClick={generatePassword}
          className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 active:scale-95'
        >
          ⚡ Generate New Password
        </button>

      </div>
    </div>
  )
}

export default App;