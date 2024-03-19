import React, { useState, useEffect } from 'react';
import { Field, ProgressBar, ProgressBarProps } from '@fluentui/react-components';
import { PiHardDrives } from "react-icons/pi";
export default function Home() {
  // Initialize state variables to hold the fetched data
  const [total, setTotal] = useState('0');
  const [used, setUsed] = useState('0');
  const [free, setFree] = useState('0');

  // useEffect hook to fetch data from the backend
  useEffect(() => {
    fetch("/files")
      .then((response) => response.json())
      .then((data) => {
        setTotal((data.total / 1024 ** 3).toFixed(2)); // Convert to GB
        setUsed((data.used / 1024 ** 3).toFixed(2)); // Convert to GB
        setFree((data.free / 1024 ** 3).toFixed(2)); // Convert to GB
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="m-5 min-w-full">
      <div className='border border-gray-300 p-5 w-full'>
        <h1 className="text-sm font-semibold"><PiHardDrives className='text-5xl' /> Hard Drive:</h1>
        <p className="text-sm">/dev/sda</p> {/* Assuming this is static */}
        <h1 className="text-sm font-semibold">File System:</h1>
        <p className="text-sm">ext4</p> {/* Assuming this is static */}
        <h1 className="text-sm font-semibold">Total:</h1>
        <p className="text-sm">{total}GB</p>
        <h1 className="text-sm font-semibold">Used:</h1>
        <p className="text-sm">{used}GB</p>
        <h1 className="text-sm font-semibold">Free:</h1>
        <p className="text-sm">{free}GB</p>

        <ProgressBar value={used} max={total} />
        </div>

    </div>
  );
}
