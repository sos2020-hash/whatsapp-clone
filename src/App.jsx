import React, { useState, useEffect } from "react";
import Avatar from "./components/Avatar";
import ContactBox from "./components/ContactBox";
import MessageBox from "./components/MessageBox";
import CheckInput from "./components/CheckInput";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [contactSelected, setContactSelected] = useState({});
  const [currentMessages, setCurrentMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState([]);
  const [filteredContacts, setFilterContacts] = useState([]);

  console.log(filteredContacts);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://anduscheung.github.io/datalouder_live_code_test/data.json"
        );
        if (res.ok) {
          let result = await res.json();
          setData(result.conversations);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const currContact = data.find((data) => data.id === contactSelected.id);
    setCurrentMessages((currContact && currContact.messages) || []);
    filterContacts(data, search);
  }, [contactSelected, data, search]);

  const handleSearch = (input) => {
    setSearch(input);
    filterContacts(data, input);
  };

  const filterContacts = (data, search) => {
    const result = data.filter(({ contact, messages }) => {
      return (
        !search ||
        contact.name.toLowerCase().includes(search) ||
        messages[messages.length - 1].content.toLowerCase().includes(search)
      );
    });
    setFilterContacts(result);
  };
  return (
    <div className="app">
      <aside>
        <header>
          <Avatar user={data} />
        </header>
        <Search search={search} handleSearch={handleSearch} />
        <div className="contact-boxes">
          {filteredContacts
            .sort(function (a, b) {
              return (
                new Date(
                  b.messages[b.messages.length - 1].created_at
                ).getTime() -
                new Date(a.messages[a.messages.length - 1].created_at).getTime()
              );
            })
            .map(({ contact, messages }) => (
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
        <CheckInput message={message} setMessage={setMessage} />
      </main>
    </div>
  );
}

export default App;
