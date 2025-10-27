// Direct RapidAPI test function
export const testRapidAPIDirectly = async () => {
  const apiKey = '51af5b7aedmsh1a6ffd4855e6c54p1b605djsn803b6c18a6a4';
  const baseUrl = 'https://realty-in-us.p.rapidapi.com';
  
  console.log('🧪 Testing RapidAPI directly...');
  console.log('API Key:', apiKey.substring(0, 10) + '...');
  console.log('Base URL:', baseUrl);
  
  try {
    const requestBody = {
      limit: 5,
      offset: 0,
      postal_code: '90004',
      status: ["for_sale", "ready_to_build"],
      sort: {
        direction: "desc",
        field: "list_date"
      }
    };
    
    console.log('Request Body:', requestBody);
    
    const response = await fetch(`${baseUrl}/properties/v3/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
        'x-rapidapi-key': apiKey
      },
      body: JSON.stringify(requestBody)
    });
    
    console.log('Response Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ API Success!');
    console.log('Response Data Keys:', Object.keys(data));
    console.log('Properties Found:', data.data?.home_search?.total || 0);
    
    return {
      success: true,
      data: data,
      propertiesCount: data.data?.home_search?.total || 0
    };
    
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};