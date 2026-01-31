import ChatWidget from './components/ChatWidget';  // ← Check this line
import './index.css';

function App() {
  console.log('🎨 App component rendering');

  return (
    <>
 
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Greeto Digital</h1>
          <p className="text-gray-600 mb-4">
            This is a sample page to test the chat widget.
          </p>
          <p className="text-gray-600">
            Scroll down and click the blue button in the bottom-right corner!
          </p>
          <div className="h-[1000px]"></div>
        </div>

        {/* ✅ Chat Widget */}
        <ChatWidget />
      </div>
    </>
  );
}

export default App;
