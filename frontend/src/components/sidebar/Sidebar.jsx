import { Link } from "react-router-dom";
import { Nav } from '@fluentui/react/lib/Nav';
import { initializeIcons } from '@fluentui/react/lib/Icons';

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
  return (
    <div className="bg-neutral-100 px-1 min-h-screen flex flex-col mr-5">
      <div className="mb-10">
        <h1 className="text-xl text-center mt-5 font-semibold text-neutral-900">/xtfs</h1>
      </div>
      <Nav
        groups={links}
        selectedKey="key1"
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
    </div>
  );
};

export default Sidebar;
