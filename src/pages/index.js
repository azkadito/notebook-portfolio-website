import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Data Science Portfolio | Your Name</title>
        <meta name="description" content="Portfolio site with notebook-style interface" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6">
            <span className="text-terminal-green">Hello, </span>
            <span className="text-gray-300">World.</span>
          </h1>
          
          <div className="terminal-window mb-8">
            <div className="terminal-header">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="ml-4 text-xs text-gray-400">terminal – portfolio</div>
            </div>
            <div className="terminal-body scan-lines">
              <p className="mb-2"><span className="text-terminal-green">$</span> <span className="text-terminal-blue">whoami</span></p>
              <div className="pl-4 mb-4">
                <p>Your Name</p>
                <p>Statistics & Data Science Master's Student</p>
              </div>
              
              <p className="mb-2"><span className="text-terminal-green">$</span> <span className="text-terminal-blue">cat</span> about.txt</p>
              <div className="pl-4 mb-4">
                <p>Welcome to my portfolio site with a unique notebook interface.</p>
                <p>I'm passionate about data science, statistics, and creating interactive experiences.</p>
              </div>
              
              <p><span className="text-terminal-green">$</span> <span className="text-terminal-blue">ls</span> -la projects/</p>
              <div className="pl-4 mb-4">
                <p>-rw-r--r-- data_exploration_interface</p>
                <p>-rw-r--r-- more_coming_soon</p>
              </div>
              
              <p className="mb-2"><span className="text-terminal-green">$</span> <span className="text-terminal-blue">echo</span> "Check out my interactive data explorer!"</p>
              <div className="pl-4">
                <p>Check out my interactive data explorer!</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/exploration" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-terminal-green border border-terminal-green rounded-md transition-colors shadow-glow-green text-center">
              <span className="text-terminal-green mr-2">$</span>
              <span>explore_data()</span>
            </Link>
          </div>
          
          <div className="mt-16 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Your Name • Statistics & Data Science</p>
          </div>
        </div>
      </main>
    </>
  );
}