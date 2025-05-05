document.getElementById('business-form').addEventListener('submit', async function(e) {
    e.preventDefault();
  
    const location = document.getElementById('location').value;
    const capital = document.getElementById('capital').value;
    const interest = document.getElementById('interest').value;
  
    const response = await fetch('http://localhost:3000/api/gemini-recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ location, capital, interest })
    });
  
    const data = await response.json();
  
    document.getElementById('business-type').innerText = data.businessType;
    document.getElementById('promising-business').innerText = data.promisingBusiness;
    document.getElementById('strategic-location').innerText = data.strategicLocation;
    document.getElementById('supplier-recommendation').innerText = data.supplierRecommendation;
    document.getElementById('expected-profit').innerText = data.expectedProfit;
    document.getElementById('potential-risk').innerText = data.potentialRisk;
  
    document.getElementById('recommendations').style.display = 'block';
  });
  