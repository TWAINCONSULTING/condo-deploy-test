import React, { useState } from 'react';
import { ExternalLink, Info, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { Link } from 'react-router-dom';

const newsItems = [
  {
    title: 'Knivstikking på Vulkan',
    content: 'To personer ble knivstukket i en butikk på kjøpesenteret Vulkan i Maridalsveien. Politiet etterforsker hendelsen.',
    date: '20.12.2024',
    url: 'https://www.politiet.no/nyheter-og-presse/oslo?utm_source=chatgpt.com'
  },
  {
    title: 'To kinesiske statsborgere pågrepet for ulovlig droneflyging',
    content: 'To personer ble pågrepet etter å ha fløyet drone i forbudssonen R102 i Oslo sentrum. Dronene ble beslaglagt, og etterforskning er igangsatt.',
    date: '18.12.2024',
    url: 'https://www.politiet.no/nyheter-og-presse/oslo?utm_source=chatgpt.com'
  },
  {
    title: 'Vålerenga ilagt bot etter supporterbråk',
    content: 'Norges Ishockeyforbund har ilagt Vålerenga en bot på 100.000 kroner etter bråk under bortekampen mot Storhamar 23. november.',
    date: '10.12.2024',
    url: 'https://nyheter.oslo.no/?utm_source=chatgpt.com'
  }
];

export function NewsFeed() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleNews = isExpanded ? newsItems : newsItems.slice(0, 3);

  return (
    <div className="bg-white sm:rounded-xl sm:border-t sm:border-b sm:border sm:shadow-md">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold">Nyheter fra nærområdet</h2>
          <Tooltip content={
            <div className="whitespace-pre-line">
              Condo henter hendelser i nærområdet fra aviser og politiloggen.
            </div>
          }>
            <Info className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors cursor-help" />
          </Tooltip>
        </div>
      </div>
      <div>
        <div className="divide-y divide-gray-100">
          {visibleNews.map((item, index) => (
            <article key={index} className="p-3 hover:bg-gray-50 transition-colors">
              <a 
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <h3 className="text-sm sm:text-lg font-medium mb-1 group-hover:text-condo-dark flex items-center gap-1">
                  {item.title}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm sm:text-base text-gray-600 line-clamp-2 mb-1">
                  {item.content}
                </p>
                <time className="text-xs text-gray-500">
                  {item.date}
                </time>
              </a>
            </article>
          ))}
        </div>
        <div className="flex justify-end mt-4">

          {/* se mer app */}
          <Link 
            to="/" 
            className="flex items-center gap-1 text-xs text-condo-dark hover:text-condo-med transition-colors sm:hidden"
          >
            <span>Les fler nyheter</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }}
          className="w-full p-3 text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1 border-t hidden sm:inline"
        >

          {/* se mer sm */}
          
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              <span>Vis mindre</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              <span>Vis mer</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}