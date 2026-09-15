"use client";
import React from "react";

type Contact = {
  name: string;
  role: string;
  about: string;
  link: string;
  img: string;
};

type contactsProps = { contacts: Contact[] };

const RenderContacts: React.FC<contactsProps> = ({ contacts }) => {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 min-[511px]:grid-cols-2 lg:grid-cols-3 m-2 min-[511px]:m-6 md:m-10">
      {contacts.map((contact, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4 min-[511px]:p-5 md:p-6 hover:shadow-lg transition border border-gray-100"
        >
          <div className="w-full max-w-[200px] min-[511px]:max-w-[240px] aspect-[4/3] relative">
            <img
              src={contact.img}
              alt={contact.name}
              className="w-full h-full object-cover border-2 md:border-4 border-blue-400 rounded-2xl shadow-sm"
            />
          </div>

          <div className="mt-4 md:mt-6 w-full text-center flex flex-col flex-grow">
            <h1 className="text-lg min-[511px]:text-xl md:text-2xl font-bold text-blue-600 leading-tight">
              {contact.name}
            </h1>
            <h3 className="text-sm min-[511px]:text-base md:text-lg text-blue-400 font-medium mt-1">
              {contact.role}
            </h3>
            <p className="mt-3 text-gray-600 text-[13px] md:text-sm leading-relaxed px-1 line-clamp-3 md:line-clamp-4">
              {contact.about}
            </p>
          </div>
          <a
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full md:w-auto text-center px-4 py-2 text-[13px] md:text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-all active:scale-95 shadow-md shadow-blue-200"
          >
            Contact {contact.name.split(' ')[0]}
          </a>
        </div>
      ))}
    </div>
  );
};

export default RenderContacts;