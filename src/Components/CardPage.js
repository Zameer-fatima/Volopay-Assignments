import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: ${(props) => (props.isActive ? '#000' : '#555')};
  color: #fff;
  cursor: pointer;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  width: 300px;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => (props.cardType === 'burner' ? '#FFEAEA' : '#EAF1FF')};
  position: relative;
`;

const CardType = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #6c757d;
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
`;

const CardName = styled.h3`
  margin-bottom: 10px;
`;

const CardDetail = styled.p`
  margin-bottom: 5px;
`;

const SearchContainer = styled.div`
  display: flex-end;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  margin-right: 10px;
  padding: 8px 12px;
`;

const FilterDropdownContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FilterDropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 200px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const FilterHeading = styled.h3`
  margin-bottom: 10px;
`;

const FilterSubHeading = styled.h4`
  margin-bottom: 10px;
`;

const FilterCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const FilterCheckboxLabel = styled.label`
  margin-left: 5px;
`;

const FilterDropdownSelect = styled.select`
  margin-bottom: 10px;
`;

const FilterButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FilterButton = styled.button`
  margin-left: 10px;
`;

const App = () => {
  const [activeTab, setActiveTab] = useState('your');
  const [curDisplay, SetcurDisplay] = useState(0)
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cardTypeFilter, setCardTypeFilter] = useState('all');
  const [cardNameFilter, setCardNameFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Simulating API call
    const mockApiResponse = {
      data: [
        {
          name: 'Mixmax',
          budget_name: 'Software subscription',
          owner_id: 1,
          spent: {
            value: 100,
            currency: 'SGD',
          },
          available_to_spend: {
            value: 1000,
            currency: 'SGD',
          },
          card_type: 'burner',
          expiry: '9 Feb',
          limit: 100,
          status: 'active',
        },
        {
          name: 'Quickbooks',
          budget_name: 'Software subscription',
          owner_id: 2,
          spent: {
            value: 50,
            currency: 'SGD',
          },
          available_to_spend: {
            value: 250,
            currency: 'SGD',
          },
          card_type: 'subscription',
          limit: 10,
          status: 'active',
        },
      ],
    };

    setCards(mockApiResponse.data);
  };

  const handleTabClick = (tab, val) => {
    SetcurDisplay(val)
    setActiveTab(tab);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCardTypeFilter = (event) => {
    setCardTypeFilter(event.target.value);
  };

  const handleCardNameFilter = (event) => {
    setCardNameFilter(event.target.value);
  };

  const filteredCards = cards.filter((card) => {
    const isCardTypeMatch = cardTypeFilter === 'all' || card.card_type === cardTypeFilter;
    const isCardNameMatch = cardNameFilter === 'all' || card.name === cardNameFilter;
    const isSearchQueryMatch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
    return isCardTypeMatch && isCardNameMatch && isSearchQueryMatch && activeTab !== 'blocked';
  });

  const filteringCardsByButton = () => {
    const cards = filteredCards.map((card, index) => {
      if (curDisplay == 0) {
        return (
          <Card key={index} cardType={card.card_type}>
            <CardType>{card.card_type}</CardType>
            <CardName>{card.name}</CardName>
            <CardDetail>Budget Name: {card.budget_name}</CardDetail>
            {card.card_type === 'burner' && (
              <CardDetail>Expiry: {card.expiry}</CardDetail>
            )}
            {card.card_type === 'subscription' && (
              <CardDetail>Limit: {card.limit}</CardDetail>
            )}
            <CardDetail>Spent: {card.spent.value} {card.spent.currency}</CardDetail>
            <CardDetail>Available to Spend: {card.available_to_spend.value} {card.available_to_spend.currency}</CardDetail>
            <CardDetail>Status: {card.status}</CardDetail>
          </Card>
        )
      } else if (curDisplay == 1) {
        if (card.owner_id == 1) {
          return (
            <Card key={index} cardType={card.card_type}>
              <CardType>{card.card_type}</CardType>
              <CardName>{card.name}</CardName>
              <CardDetail>Budget Name: {card.budget_name}</CardDetail>
              {card.card_type === 'burner' && (
                <CardDetail>Expiry: {card.expiry}</CardDetail>
              )}
              {card.card_type === 'subscription' && (
                <CardDetail>Limit: {card.limit}</CardDetail>
              )}
              <CardDetail>Spent: {card.spent.value} {card.spent.currency}</CardDetail>
              <CardDetail>Available to Spend: {card.available_to_spend.value} {card.available_to_spend.currency}</CardDetail>
              <CardDetail>Status: {card.status}</CardDetail>
            </Card>
          )
        }
      } 
    })
    return cards
  }
  return (
    <PageContainer>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: '100vw' }}>
        <TabsContainer style={{ marginTop: "1%", marginLeft: "auto", marginRight: "-20%" }}>

          <Tab isActive={activeTab === 'your'} onClick={() => handleTabClick('your',1)}>
            Your
          </Tab>
          <Tab isActive={activeTab === 'all'} onClick={() => handleTabClick('all',0)}>
            All
          </Tab>
          <Tab isActive={activeTab === 'blocked'} onClick={() => handleTabClick('blocked',2)}>
            Blocked
          </Tab>
        </TabsContainer>
        <SearchContainer style={{ marginTop: "1%", marginLeft: "auto" }}>
          <SearchInput
            type="text"
            placeholder="Search by card name"
            value={searchQuery}
            onChange={handleSearch}
          />
        </SearchContainer>
        <FilterDropdownContainer>
          <FilterDropdownButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <img src="{filter}" alt="Filter" />
          </FilterDropdownButton>

          {isFilterOpen && (
            <FilterDropdown>
              <FilterHeading>Filter</FilterHeading>

              <FilterSubHeading>Type</FilterSubHeading>
              <FilterCheckboxContainer>
                <input
                  type="checkbox"
                  id="subscription"
                  value="subscription"
                  checked={cardTypeFilter === 'subscription'}
                  onChange={handleCardTypeFilter}
                />
                <FilterCheckboxLabel htmlFor="subscription">Subscription</FilterCheckboxLabel>
              </FilterCheckboxContainer>
              <FilterCheckboxContainer>
                <input
                  type="checkbox"
                  id="burner"
                  value="burner"
                  checked={cardTypeFilter === 'burner'}
                  onChange={handleCardTypeFilter}
                />
                <FilterCheckboxLabel htmlFor="burner">Burner</FilterCheckboxLabel>
              </FilterCheckboxContainer>

              <FilterSubHeading>Select by Cardholder</FilterSubHeading>
              <FilterDropdownSelect value={cardNameFilter} onChange={handleCardNameFilter}>
                <option value="all">All</option>
                <option value="Mixmax">Mixmax</option>
                <option value="Quickbooks">Quickbooks</option>
              </FilterDropdownSelect>

              <FilterButtonContainer>
                <FilterButton onClick={() => setIsFilterOpen(false)}>Apply</FilterButton>
                <FilterButton onClick={() => setCardTypeFilter('all')}>
                  Clear
                </FilterButton>
              </FilterButtonContainer>
            </FilterDropdown>
          )}
        </FilterDropdownContainer>
      </div>

      <CardContainer>
        {filteringCardsByButton()}
      </CardContainer>
    </PageContainer>
  );
};

export default App;