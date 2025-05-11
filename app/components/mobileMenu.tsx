'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MobileMenu() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`phone ${isActive ? 'active' : ''} `}>
      <div>
        <svg className="x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 400" height="400" width="220">
          <g className="top-bars" strokeWidth="4">
            <path className="bar bar1" d="M 178,20 H 202" />
            <path className="bar bar2" d="M 178,29 H 202" />
          </g>
        </svg>
      </div>
      
      <div className="menu-click-area" onClick={() => setIsActive(!isActive)}></div>
      
      <div className="menu">
        <Link onClick={() => setIsActive(!isActive)} href="/">Home</Link>
        <Link  onClick={() => setIsActive(!isActive)} href="/contact">Contact us</Link>
        <Link onClick={() => setIsActive(!isActive)} href="/about">About us</Link>
        <Link href="https://form.jotform.com/250930986221155">
          <button>Sign up</button>
        </Link>
      </div>
    </div>
  );
}