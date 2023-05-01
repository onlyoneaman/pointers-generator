import React, { useState } from 'react';
import axios from 'axios';
import darkLogo from '../../assets/dark_mode.png';
import lightLogo from '../../assets/light_mode.png';
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

let initialSummary = ''

function GptSummaryGenerator() {
  const [dark, setDark] = useState(false)
  const [inputValue, setInputValue] = useState('');
  const [summary, setSummary] = useState(initialSummary);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(loading) return;
    setLoading(true);
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        "model": "gpt-3.5-turbo",
        "messages": [
          {"role": "system", "content": "You are an AI assistant. Your client is a busy professional who needs a summary of the script. Provide a summary of the script in points."},
          {"role": "user", "content": inputValue},
        ],
        "temperature": 0.7
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      });
      setSummary(response.data.choices[0].message.content);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div
      className={`${dark?"dark":""} h-[95vh] w-screen`}
    >
      <div
        className="flex flex-wrap min-w-full h-full"
      >
        <div
          className={"bg-primary text-secondary dark:bg-secondary dark:text-primary p-2 cursor-pointer flex justify-between min-w-full"}
        >
          <div
            className={""}
            onClick={() => setDark(!dark)}
          >
            <span className="material-symbols-outlined">
              {dark ? "light_mode" : "dark_mode"}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap w-screen h-full">
          <div className="flex-1 h-full p-6 bg-primary text-secondary dark:bg-secondary dark:text-primary">
            <form
              onSubmit={handleSubmit}
              className={"h-full flex flex-col justify-between"}
            >
              <textarea
                className="w-full h-full border border-secondary dark:border-primary bg-transparent p-2 pb-0 mb-0 font-mono text-lg border resize-none"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter your script or data here..."
                autoFocus
                required
                rows={20}
              />
              <button
                className="px-4 mt-0 py-2 uppercase w-full text-lg font-bold text-white bg-black dark:bg-primary dark:text-secondary"
                type="submit"
                style={{
                  marginTop: "-8px"
                }}
              >
                {
                  loading ? "Loading..." : "Make Pointers"
                }
              </button>
            </form>
          </div>
          <div className="flex-1 h-full p-6 bg-primary text-secondary dark:bg-secondary dark:text-primary">
            <div
              className="h-full overflow-y-auto flex flex-col justify-between"
            >
              <p
                className="w-full p-2 pt-1 font-mono text-lg border border-black dark:border-primary h-full"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {summary?.trim()}
              </p>
              <div
                className="px-4 mt-0 py-2 uppercase w-full text-lg font-bold text-white bg-black cursor-pointer text-center dark:bg-primary dark:text-secondary"
                onClick={() => navigator.clipboard.writeText(summary)}
              >
                Copy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GptSummaryGenerator;
