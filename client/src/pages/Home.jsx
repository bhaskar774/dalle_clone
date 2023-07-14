import React, { useState, useEffect } from "react";

import { Loader, Card, FormField } from "../components";

// function to render the cards
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  } else {
    return (
      <h2 className="text-[#676797] text-xl mt-5 font-bold uppercase">
        {title}
      </h2>
    );
  }
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeOut, setSearchTimeOut] = useState(null);

  const fetchPosts = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);

    // not upload for every single stroke
    setSearchTimeOut(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#071952] text-[32px]">
          The Community showCase
        </h1>
        <p className="font-[16px] text-[#666e75] mt-2 max-w[500px]">
          Browse Through a Imaginary and visually Stunning Collections Generated
          by DALL-E AI
        </p>
      </div>

      {/* formField section */}
      <div className="mt-16">
        <FormField
          labelName="SearchPosts"
          type="text"
          name="text"
          placeholder="Search Posts by name or prompt"
          value={searchText}
          handleChange={handleSearch}
        />
      </div>

      {/* photos grid section */}
      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium mb-3 text-[#666375] text-xl">
                Showing Results for:
                <span className="text-[#0b0404]">{searchText}</span>
              </h2>
            )}
            {/* grid collections */}

            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <>
                  <RenderCards
                    data={searchedResults}
                    title="No search Results found"
                  />
                </>
              ) : (
                <>
                  <RenderCards data={allPosts} title="No Posts Found" />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
