import {useState} from "react";

const divStyle = {
  margin: '-8px',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const buttonStyle = {
  marginLeft: '5px',
};

const API_BASE_URL = 'http://localhost:8080/greet';

const App = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const greet = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/?name=${name}`);
      const greeting = await response.text();

      alert(greeting);
    } catch (e) {
      alert('Error while requesting API.')
    } finally {
      setLoading(false);
      setName('');
    }
  };

  return (
    <div style={divStyle}>
      <input
        type="text"
        placeholder="Type your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button style={buttonStyle} onClick={greet}>
        {loading ? 'Loading...' : 'Greet'}
      </button>
    </div>
  );
}

export default App;
