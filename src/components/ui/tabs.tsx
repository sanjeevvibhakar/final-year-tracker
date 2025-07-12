import * as React from 'react';
import { cn } from './utils';

const Tabs = ({ children, defaultValue }) => {
  const [value, setValue] = React.useState(defaultValue);
  return <div>{React.Children.map(children, child => React.cloneElement(child, { value, setValue }))}</div>;
};

const TabsList = ({ children }) => <div style={{ display: 'flex', gap: '1rem' }}>{children}</div>;

const TabsTrigger = ({ value: val, value, setValue, children }) => (
  <button onClick={() => setValue(val)}>{children}</button>
);

const TabsContent = ({ value: val, value, children }) => (val === value ? <div>{children}</div> : null);

export { Tabs, TabsList, TabsTrigger, TabsContent };