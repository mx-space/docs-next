import { useState } from 'react';
import copy from 'copy-to-clipboard';

export function EnvVariableConfig({ variableNames }) {
  const [values, setValues] = useState(Array(variableNames.length).fill(''));

  const handleCopy = () => {
    const envContent = variableNames.map((name, index) => `${name.key}=${values[index]}`).join('\n');
    copy(envContent);
  };

  const handleChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  return (
    <div className="p-4 mt-2">
      {variableNames.map((name, index) => (
        <div key={`${name.key}`} className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            className="border rounded px-2 py-2 w-1/2 bg-transparent focus:outline-none focus:border-black hover:border-white-400 transition duration-300 font-[400] font-sans text-sm cursor-not-allowed"
            value={name.name || name.key}
            data-tip={name.key}
            onMouseOver={(e: any) => {
              e.target.style.color = 'transparent';
              setTimeout(() => {
                e.target.style.color = 'inherit';
                e.target.value = e.target.dataset.tip;
              }, 300);
            }}
            onMouseLeave={(e: any) => {
              e.target.style.color = 'transparent';
              setTimeout(() => {
                e.target.style.color = 'inherit';
                e.target.value = name.name || name.key;
              }, 300);
            }}
            disabled
          />
          <input
            type="text"
            // :focus-visible outline none
            className="border rounded px-2 py-2 w-1/2 focus:outline-none focus:border-black hover:border-gray-400 transition duration-300 font-[400] font-sans text-sm" style={{ outline: "none", boxShadow: "none" }}
            placeholder={`Enter value...`}
            value={values[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}
      <div className="flex items-center justify-between mb-4">
        <h2 className="sr-only">环境变量配置</h2>
        <button
          type="button"
          className="border bg-black w-full text-white px-4 py-2 rounded-lg text-sm transform transition-all duration-300 focus:outline-none hover:bg-gray-700"
          onClick={handleCopy}
        >
          复制
        </button>
      </div>
    </div>
  );
}