import "@/styles/componentstyles/prices.css";

const PRICES = {
  Standard: {
    Adult: "$12.84",
    Child: "$9.63",
    Senior: "$9.37",
    Military: "$9.37",
  },
  Matinee: {
    Adult: "$9.37",
    Child: "$9.37",
    Senior: "$9.37",
    Military: "$9.37",
  },
};

function Prices() {
  return (
    <div className="prices">
      {Object.entries(PRICES).map(([showType, tiers]) => (
        <div className="showtype" key={showType}>
          <p className="showtype-name">{showType}</p>
          <div className="price-items">
            {Object.entries(tiers).map(([tier, price]) => (
              <div key={tier} className="price-item">
                <p className="price-tier">{tier}</p>
                <p className="price-value">{price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Prices;
