import React, { useState, useEffect } from "react";
import ContactBox from "./components/ContactBox";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [contactSelected, setContactSelected] = useState({});
  const [search, setSearch] = useState([]);
  const [filteredContacts, setFilterContacts] = useState([]);

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
                messages={messages}
                setContactSelected={setContactSelected}
                contactSelected={contactSelected}
              />
            ))}
        </div>
      </aside>
    </div>
  );
}

export default App;
