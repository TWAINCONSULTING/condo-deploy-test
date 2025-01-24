import React from 'react';
import { Mail, Phone, Clock, MapPin, AlertTriangle, Lightbulb } from 'lucide-react';
import { Card } from '../ui/Card';
import { Link } from 'react-router-dom';

export function ContactInfo() {
  const contactItems = [
    {
      icon: Mail,
      title: 'E-post',
      items: [
        { value: 'post@digitalgarden.no', showLabel: false, fullWidth: true }
      ]
    },
    {
      icon: Phone,
      title: 'Telefon',
      items: [
        { label: 'Styreleder', value: '123 45 678', showLabel: true },
        { label: 'Vaktmester', value: '987 65 432', showLabel: true }
      ]
    },
    {
      icon: MapPin,
      title: 'Adresse',
      items: [
        { value: 'Digitalgården 1', showLabel: false, fullWidth: true },
        { value: '0123 Oslo', showLabel: false, fullWidth: true }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Kontaktinformasjon</h2>
          
          <div className="space-y-6">
            {contactItems.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{section.title}</h3>
                    <div className="space-y-1 mt-1">
                      {section.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.showLabel ? (
                            <div className="flex items-center justify-between">
                              <span className="text-gray-800">{item.label}:</span>
                              <span className="text-gray-800">{item.value}</span>
                            </div>
                          ) : (
                            <div className={`text-gray-800 ${item.fullWidth ? 'text-left' : 'text-right'}`}>
                              {item.value}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="space-y-4 px-1 ml-2" id="userContactCondo">
        <h3 className="mt-auto text-lg mb-4 font-semibold">Tilbakemelding på Condo</h3>
        <Link
          to="/rapporter"
          className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors"
        >
          <AlertTriangle className="h-5 w-5" />
          <span>Rapporter et problem med nettsiden</span>
        </Link>

        <Link
          to="/produktutvikling"
          className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <Lightbulb className="h-5 w-5" />
          <span>Hjelp oss å bli bedre</span>
        </Link>
      </div>
    </div>
  );
}