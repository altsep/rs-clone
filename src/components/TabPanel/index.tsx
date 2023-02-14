import { Box } from '@mui/material';

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  isEmpty?: boolean;
}

export default function TabPanel({ children, index, value, isEmpty }: ITabPanelProps) {
  if (isEmpty) {
    return (
      <div
        role="tabpanel"
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{
          minHeight: '80vh',
          display: value !== index ? 'none' : 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        minHeight: '80vh',
      }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.defaultProps = {
  children: {},
  isEmpty: false,
};
