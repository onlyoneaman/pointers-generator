import React, { useState } from 'react';
import axios from 'axios';

import { toast } from 'sonner'

import darkLogo from '../commons/logo-dark.png';
import lightLogo from '../commons/logo-light.png';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

let initialSummary = ``

const SystemMessage = `
You are an AI assistant. Your client is a busy professional who needs a summary of the script. Provide a summary of the script in at least 10 points.
`

function GptSummaryGenerator() {
  const [dark, setDark] = useState(false)
  const [inputValue, setInputValue] = useState('');
  const [summary, setSummary] = useState(initialSummary);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if(loading) return;
    setLoading(true);
    try {
      const response = await axios.post( 'https://api.openai.com/v1/chat/completions', {
        "model": "gpt-3.5-turbo",
        "messages": [
          {"role": "system", "content": SystemMessage},
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

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const copyText = () => {
    if(!summary) return;
    navigator.clipboard.writeText(summary?.trim());
    try {
      toast('Copied to clipboard')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`${dark?"dark":""} h-[90vh] w-full`}
    >
      <div
        className="flex flex-wrap min-w-full h-full"
      >
        <div
          className={"bg-primary align-middle text-secondary dark:bg-secondary dark:text-primary py-6 px-4 border-b-2 border-secondary dark:border-primary cursor-pointer flex justify-between items-center min-w-full"}
        >
          <img
            src={dark? lightLogo : darkLogo}
            alt="logo"
            className="h-10"
          />
          <div
            className={"flex items-center"}
          >
            <div
              className={"bg-secondary uppercase font-bold text-primary px-4 py-2 mr-4 rounded cursor-pointer dark:bg-primary dark:text-secondary"}
              onClick={() => window.open("https://www.buymeacoffee.com/restlessmonks", "_blank")}
            >
              Buy me a coffee
            </div>
            <div
              className={"h-8"}
              onClick={() => setDark(!dark)}
            >
            <span className="material-symbols-outlined">
              {dark ? "light_mode" : "dark_mode"}
            </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap w-screen h-full">
          <div className="flex-1 h-full p-4 sm:p-6 bg-primary text-secondary dark:bg-secondary dark:text-primary">
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
                rows={10}
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
          <div className="flex-1 h-full p-4 sm:p-6 bg-primary text-secondary dark:bg-secondary dark:text-primary">
            <div
              className="h-full flex flex-col justify-between"
            >
              <p
                className="w-full overflow-y-auto p-2 pb-4 pt-1 font-mono text-lg border border-black dark:border-primary h-full"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {summary?.trim()}
              </p>
              <div
                className={`px-4 mt-0 py-2 uppercase w-full text-lg font-bold text-white bg-black cursor-pointer text-center dark:bg-primary dark:text-secondary ${summary?.trim().length>0 ? "" : "!text-[#86856B] !dark:text-[#999]"}`}
                onClick={() => copyText()}
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
