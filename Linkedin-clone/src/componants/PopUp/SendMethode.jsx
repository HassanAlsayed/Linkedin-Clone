/* eslint-disable react/prop-types */

export default function SendMethode({
  isVisible,
  setSelectedMethod,
  setIsVisible,
  selectedMethod,
}) {
  const handleRadioChange = (event) => {
    setSelectedMethod(event.target.value);
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="popup-card">
        <div>
          <input
            type="radio"
            name="methode"
            id="press"
            value="press"
            onChange={handleRadioChange}
            checked={selectedMethod === "press"}
          />
          <label htmlFor="press">Press Enter to send</label>
        </div>
        <div>
          <input
            type="radio"
            name="methode"
            id="click"
            value="click"
            onChange={handleRadioChange}
            checked={selectedMethod === "click"}
          />
          <label htmlFor="click">Click to Send</label>
        </div>
      </div>
    )
  );
}
