import React from 'react';
import { cn } from '../../lib/utils';

interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

const TabsContext = React.createContext<{
  value: string;
  setValue: (value: string) => void;
}>({
  value: '',
  setValue: () => {},
});

export const Tabs: React.FC<TabsProps> = ({ 
  defaultValue, 
  className, 
  children 
}) => {
  const [value, setValue] = React.useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn('flex flex-col', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ 
  className, 
  children 
}) => {
  return (
    <div className={cn('flex space-x-1 p-1', className)}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ 
  value, 
  icon,
  className, 
  children 
}) => {
  const { value: selectedValue, setValue } = React.useContext(TabsContext);
  const isActive = selectedValue === value;
  
  return (
    <button
      className={cn(
        'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
        isActive 
          ? 'text-accent-600 bg-background border-b-2 border-accent-600' 
          : 'text-muted-foreground hover:text-foreground',
        className
      )}
      onClick={() => setValue(value)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ 
  value, 
  className, 
  children 
}) => {
  const { value: selectedValue } = React.useContext(TabsContext);
  
  if (selectedValue !== value) {
    return null;
  }
  
  return (
    <div className={cn('animate-fadeIn', className)}>
      {children}
    </div>
  );
};