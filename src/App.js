import Big from "./Big";
import Small from "./Small";
import Med from "./Med";
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

function App() {
  return (
    <ThemeProvider theme={original}>
      <div className="">
        <div className="text-center py-1 text-[10px] bg-[#000080] text-white">CA: ExtfTdY6ed2hHRTozxSKR3bsPALPdtKJCHrNdcc2pump</div>
        {/* Display Big component on md and up, and Small component on small screens */}
        <div className="hidden lg:block">
          <Big />
        </div>
        <div className="hidden md:block lg:hidden">
          <Med />
        </div>
        <div className="block md:hidden">
          <Small />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;