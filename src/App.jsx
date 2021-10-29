import React, { useState, useEffect } from "react";
import Avatar from "./components/Avatar";
import ContactBox from "./components/ContactBox";
import MessageBox from "./components/MessageBox";
import CheckInput from "./components/CheckInput";
import Search from "./components/Search";
import { mainUser, contactsMessages, Message } from "./generateFakeData";
import "./App.css";

function App() {
  const [data, setData] = useState(contactsMessages);
  const [contactSelected, setContactSelected] = useState({});
  const [currentMessages, setCurrentMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilterContacts] = useState([]);

  useEffect(() => {
    const currContact = data.find((data) => data.id === contactSelected.id);
    setCurrentMessages((currContact && currContact.messages) || []);
    filterContacts(data, search);
  }, [contactSelected, data, search]);

  function pushMessage() {
    const index = data.findIndex((d) => d.contact.id === contactSelected.id);
    const newData = Object.assign([], data, {
      [index]: {
        contact: contactSelected,
        messages: [
          ...data[index].messages,
          new Message(true, message, new Date()),
        ],
      },
    });

    setData(newData);
    setMessage("");
  }

  const handleSearch = (input) => {
    setSearch(input);
    filterContacts(data, input);
  };

  const filterContacts = (data, search) => {
    const result = data.filter(({ contact }) => {
      return (
        !search || contact.name.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilterContacts(result);
  };
  return (
    <div className="app">
      <aside>
        <header>
          <Avatar user={mainUser} />
        </header>
        <Search search={search} handleSearch={handleSearch} />
        <div className="contact-boxes">
          {data.map(({ contact, messages }) => (
            <ContactBox
              contact={contact}
              key={contact.id}
              setContactSelected={setContactSelected}
              messages={messages}
            />
          ))}
        </div>
      </aside>
      <main>
        <header>
          <Avatar user={contactSelected} showName={true} />
        </header>
        <MessageBox messages={currentMessages} />
        <CheckInput
          message={message}
          setMessage={setMessage}
          pushMessage={pushMessage}
        />
      </main>
    </div>
  );
}

export default App;
