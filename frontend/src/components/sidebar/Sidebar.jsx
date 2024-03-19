
import { useLocation } from 'react-router';
import { Nav } from '@fluentui/react/lib/Nav';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { useTheme } from "../ThemeContext";

// Initialize Fluent UI icons
initializeIcons();



const links = [
  {
    links: [
      { name: 'Home', url: '/', key: 'key1', icon: 'Home' },
      { name: 'Upload Files', url: '/upload', key: 'key2', icon: 'Upload' },
      { name: 'View Files', url: '/files', key: 'key3', icon: 'Document' },
    ],
  },
];

const Sidebar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation(); // Get the current location

  const selectedKey = links
  .flatMap(group => group.links) // Flatten the links array
  .find(link => link.url === location.pathname)?.key; // Find the link with a URL matching the current path


  return (
    <div className={`bg-neutral-100 px-1 min-h-screen flex flex-col mr-5 ${isDark ? 'dark' : ''}`}>
            <div className="mb-10">
        <a href='/' className="text-xl text-center mt-5 font-semibold text-neutral-900">/xtfs</a>
      </div>
      <Nav
        groups={links}
        selectedKey={selectedKey}
        styles={{
          root: {
            width: 150,
            boxSizing: 'border-box',
            border: 'none', // Adjust the border color to match your theme
            overflowY: 'auto',
          },
          link: {
            background: 'none',
            color: 'black',
            selectors: {
              ':hover': {
                backgroundColor: '#555', // Adjust hover background color
              },
            },
          },
          linkText: {
            fontSize: 16, // Adjust font size
          },
        }}
      />
      <button
        onClick={toggleTheme}
        className="bg-neutral-900 text-neutral-100 px-4 py-2 rounded-md mt-5"
      >
        Toggle Dark Mode
      </button>

    </div>

  );

};


export default Sidebar;
