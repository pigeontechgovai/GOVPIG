import Big from "./Big";
import Small from "./Small";
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

function App() {
  return (
    <ThemeProvider theme={original}>
      <div className="">
        {/* Display Big component on md and up, and Small component on small screens */}
        <div className="hidden lg:block">
          <Big />
        </div>
        <div className="block lg:hidden">
          <Small />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;