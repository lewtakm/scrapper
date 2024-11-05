"use client";

import { useState } from "react";

export const WebScraper = () => {
  const [url, setUrl] = useState("");
  const [scrapedData, setScrapedData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleScrape = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setScrapedData(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error scraping data:", error);
      setScrapedData(
        "Error scraping data. Please check the URL and try again."
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to scrape"
          className="flex-grow px-3 py-2 border border-neutral-200 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-neutral-800"
        />
        <button
          onClick={handleScrape}
          disabled={isLoading}
          className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Scraping..." : "Scrape"}
        </button>
      </div>
      {scrapedData && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Scraped Data:</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60">
            {scrapedData}
          </pre>
        </div>
      )}
    </div>
  );
};
